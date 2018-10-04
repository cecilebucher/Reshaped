var Publications_on = false;
var Drafts_on = false;
var Bibliography_on = false;
var Library_on = false;
var Multiwindow_on = false;
var Templates_on = false;
var Bookmarks_on = false;
var printpdf_on = false
//var Codes_on = false;
var rpoints_on = false;
var rviz_on = false;
var showAllDrafts_on = false;
var Article_on = false;
var Publication_on = false;
var Draft_on = false;

var anim_time_show = 750;
var anim_time_hide = 500;

var font_color = "#000000";
var background_color = "#FFFFFF";

var allowColorChange = false;
var allowBackgroundColorChange = false;

function showPublications(publications) {
    console.log("--> show publications");

    Publications_on = true;
    var $publications_div = $(".Publications");
    $publications_div.append("<button class='all'>All</button>");
    $publications_div.append("<button class='tables'>Tables</button>");

    $publications_div.find(".item").remove();
    for(var i=publications.length-1; i>= 0; i--){
        $publications_div.append("<div class='item' id='" + publications[i].id + "' filename='" + publications[i].filename +"'></div>");
        $item_div = $publications_div.find("#"+publications[i].id);
        $item_div.append("<div class='background'><img src='" + publications[i].image + "'><div class='layer'></div></div>");
        $item_div.append("<button class='open'>Open</button>");
        //(current_profile == "designer")
          //  $item_div.append("<button class='delete' name='publish'>Publish</button>");
        $item_div.append("<h1>" + publications[i].filename + "</h1>");
        $item_div.append("<img src='" + publications[i].portrait + "' class='portrait'>");
        $item_div.append("<p>Author: <strong>" + publications[i].author + "</strong><br>Date:<strong> " + publications[i].date + "</strong><br>Version:<strong> " + publications[i].version + "</strong><br>email: <u>"+ publications[i].email +"</u></p>");
    }

    // manage open and share with editor/designer buttons!!
    $publications_div.find(".item .open").on("click",function(){
        //console.log("publication id",$(this).parent().attr("id"));
        socket.emit("openpublication", $(this).parent().attr('id'));
        previous_active_menu = "";
        hidePanel("Publications");
    });

    // SHARE
    $publications_div.find(".item .delete").on("click",function(){ //.delete a bit weird I know..
        //console.log("publication id",$(this).parent().attr("id"));
        console.log("--> change rights to publish publication",$(this).parent().attr("id"),$(this).attr('name'),current_profile);
        //var message = {"id": $(this).parent().attr('id'), "rights": $(this).attr('name')};
        var filename = $(this).parent().attr('filename');
        var message = {"id": $(this).parent().attr('id'), "rights": "publish", "filename": filename};
        socket.emit("sharedraft", message);
    });
   
    if(publication_delay > 0){
        setTimeout(function() {
            $publications_div.show("slide", { direction: "left" }, anim_time_show);
          }, 700);
          publication_delay = 0;
    }else{
        $publications_div.show("slide", { direction: "left" }, anim_time_show);
    }
    
}


function showDrafts(drafts, withAnimation) {
    console.log("--> show drafts",current_profile, withAnimation);

    Drafts_on = true;
    var $drafts_div = $(".showAllDrafts");
   
    $drafts_div.find(".item").remove();
    for(var i=drafts.length-1; i>=0; i--){
        console.log("generate draft item with id",drafts[i].id);
        $drafts_div.append("<div class='item' id='"+drafts[i].id+"' filename='" + drafts[i].filename + "'></div>");
        $item_div = $drafts_div.find("#"+drafts[i].id);
        
        // $item_div.append("<img src='" + drafts[i].image + "' class='background'>");
        $item_div.append("<div class='background'><div class='layer'></div></div>");
        console.log("rights:",drafts[i].rights);
        $item_div.append("<button class='open'>Open</button>");
        if(current_profile == "author")
            if(drafts[i].rights.includes("publisher")){
                $item_div.append("<button class='shared' name='publisher'>Shared with Editor</button>");
            } else {
                $item_div.append("<button class='share' name='publisher'>Share with Editor</button>");
            }
        else if(current_profile == "publisher")
            if(drafts[i].rights.includes("designer")){
                $item_div.append("<button class='shared' name='designer'>Shared with Designer</button>");
            } else {
                $item_div.append("<button class='share' name='designer'>Share with Designer</button>");
            }
        else if(current_profile == "designer")
            $item_div.append("<button class='share' name='publish'>Publish</button>");
        $item_div.append("<button class='delete'>Delete</button>");
        $item_div.append("<h1>" + drafts[i].filename + "</h1>");
        $item_div.append("<img src='" + drafts[i].portrait + "' class='portrait'>");
        $item_div.append("<p>Author: <strong>" + drafts[i].author + "</strong><br>Date: <strong>" + drafts[i].date  + "</strong><br>Version: <strong>" + drafts[i].version  + "</strong></p>");

    }

    // manage open and share with editor/designer buttons!!
    // OPEN
    $drafts_div.find(".item .open").on("click",function(){
        console.log("draft id",$(this).parent().attr("id"));
        socket.emit("opendraft", $(this).parent().attr('id'));
        previous_active_menu = "";
    });
    // SHARE
    $drafts_div.find(".item .share").on("click",function(){
        console.log("draft id",$(this).parent().attr("id"));
        console.log("draft profile",$(this).attr('name'));
        //var content = $(".articlecontent").html();  // NO!!!! because another article could be opened!!
        var filename = $(this).parent().attr('filename');
        $(this).text("shared with "+$(this).attr('name'));
        //$(this).attr('force','forcehover') // TODO: doesn't work....
        var message = {"id": $(this).parent().attr('id'), "rights": $(this).attr('name'), "filename":filename};
        socket.emit("sharedraft", message);
        hidePanel("showAllDrafts", true);
        previous_active_menu = "";
    });
    // DELETE
    $drafts_div.find(".item .delete").on("click",function(){
        console.log("draft id",$(this).parent().attr("id"));
        console.log("draft profile",$(this).attr('name'));
        // TODO: BUG.... send the article as well in case of author not saved before... ???
        var message = {"id": $(this).parent().attr('id'), "rights": $(this).attr('name')};
        socket.emit("deletedraft", message);
        
    });

    if(withAnimation) {
        $drafts_div.show("slide", { direction: "left" }, anim_time_show);
        previous_active_menu = "showAllDrafts";
        $("#profile-menu").find("a[name='"+ "Drafts" +"']").attr('class','forceselection');
    }
    else if(drafts.length == 0) {
        hidePanel("showAllDrafts", true);
        previous_active_menu = "";
        if(Draft_on){
            showArticleButtons(current_profile);
        }else if(Publication_on){
            showArticleButtonsForPublication(current_profile);
        }
    }else{
        previous_active_menu = "showAllDrafts";
        $("#profile-menu").find("a[name='"+ "showAllDrafts" +"']").attr('class','forceselection');
        console.log("++++");
        $("#profile-menu").find("a[name='"+ "Drafts" +"']").attr('class','forceselection');
    }

}

function showLibrary(library) {
    console.log("--> show library");
    Library_on = true;
    var $library_div = $(".Library");
    // in cae it hasn't been selected from the menu but triggered by the image element
    // TODO ... force menu to be active -- done previously, but check..
    previous_active_menu_right = "Library";
    $library_div.show("slide", { direction: "right" }, anim_time_show);
}

// trigger event on add
$(".Library button.add").on("click",function(){
    //console.log("this",$(this));
    var imgId = $(this).attr('id'); 
    console.log("image libraray id",imgId);
    // a work around to be quicker
    if(imgId == "openImage0"){
        var path = "imgs/fakeLibrary/img0.jpg";
    }else if(imgId == "openImage1"){
        var path = "imgs/fakeLibrary/img1.png";
    }else if(imgId == "openImage2"){
        var path = "imgs/fakeLibrary/img2.jpeg";
    }
    console.log("--> insert image",path,current_img_selected);
    if(current_img_selected.length > 0){
        //console.log("div", $(".articlecontent").find("img[id=" + current_img_selected + "]"));
        $(".articlecontent").find("img[id=" + current_img_selected + "]").attr("src",path);
        // close panel
        hideRightPanel("Library");
    }
    current_img_selected = "";
});

// could actually be joined with the mehtod showPublications.. leave it like this for now...
function showBookmarks(bookmarks, withAnimation) {
    console.log("--> show bookamrks");
    Bookmarks_on = true;
    var $bookmark_div = $(".Bookmarks");

    $bookmark_div.find(".item").remove();
    //console.log("length bookmark",bookmarks.length);
    for(var i=bookmarks.length-1; i>= 0; i--){
        $bookmark_div.append("<div class='item' id='"+bookmarks[i].id+"'></div>");
        $item_div = $bookmark_div.find("#"+bookmarks[i].id);
        $item_div.append("<div class='background'><img src='" + bookmarks[i].image + "'><div class='layer'></div></div>");
        $item_div.append("<button class='open'>Open</button>");
        $item_div.append("<button class='delete' name='delete'>Delete</button>");
        $item_div.append("<h1>" + bookmarks[i].filename + "</h1>");
        $item_div.append("<img src='" + bookmarks[i].portrait + "' class='portrait'>");
        $item_div.append("<p>Author: <strong>" + bookmarks[i].author + "</strong><br>Date:<br>Version:</strong><br>email: <u>"+ bookmarks[i].email +"</u></p>");

    }

    // manage open and share with editor/designer buttons!!
    // OPEN
    $bookmark_div.find(".item .open").on("click",function(){
        console.log("--> open publication from the bookmarks",$(this).parent().attr("id"), $(this).parent().attr("name"));
        socket.emit("openpublication", $(this).parent().attr('id'));
        previous_active_menu = "";
        hidePanel("Bookmarks");
    });
    // DELETE
    $bookmark_div.find(".item .delete").on("click",function(){
        console.log("publication id",$(this).parent().attr("id"));
        console.log("--> delete bookmark",$(this).parent().attr("id"),$(this).attr('name'),current_profile);
        var message = {"id": $(this).parent().attr('id'), "rights": $(this).attr('name')};
        socket.emit("deleteBookmark", message);
    });
  
    if(withAnimation) {
        $bookmark_div.show("slide", { direction: "left" }, anim_time_show);
    }
    else if(bookmarks.length == 0) {
        previous_active_menu = "";
        hidePanel("Bookmarks", true);
        if(Draft_on){
            showArticleButtons(current_profile);
        }else if(Publication_on){
            showArticleButtonsForPublication(current_profile);
        }

    }

}

function showTemplates(templates) {
    console.log("--> show templates");
    Templates_on = true;
    var $templates_div = $(".Templates");


    $templates_div.find(".item").remove();
    for(var i=templates.length-1; i>= 0; i--){
        $templates_div.append("<div class='item' id='"+templates[i].id+"'></div>");
        $item_div = $templates_div.find("#"+templates[i].id);
        $item_div.append("<div class='background'><img src='" + templates[i].image + "'><div class='layer'></div></div>");
        $item_div.append("<img src='" + templates[i].stars + "' class='stars'>");
        $item_div.append("<button class='open'>Apply</button>");
        $item_div.append("<h1>" + templates[i].title + "</h1>");
        $item_div.append("<img src='" + templates[i].portrait + "' class='portrait'>");
        $item_div.append("<p>Author: <strong>" + templates[i].author + "</strong><br>Date: <strong>" + templates[i].date +"</strong><br>Version: <strong>" + templates[i].version +"</strong><br>Website: <strong>"+ templates[i].website +"</strong></p>");

    }
    
    // TODO: apply template to all articles !!!!
    $templates_div.find(".item .open").on("click",function(){
        //console.log("template id",$(this).parent().attr("id"));
        socket.emit("applyTemplate", $(this).parent().attr('id'));
        previous_active_menu = "";
        hidePanel("Templates");
    });

    $templates_div.show("slide", { direction: "left" }, anim_time_show);
}

function showBibliography(bibliogrpahy) {
    console.log("--> show bibliography");
    Bibliography_on = true;
    var $bibliography_div = $(".Bibliography");
    $bibliography_div.show("slide", { direction: "right" }, anim_time_show);
}

function showRpoints() {
    console.log("--> show Rpoints");
    rpoints_on = true;
    loadBackground();
    if(current_profile == "designer"){
        loadRpoints();
    } else {
        loadRviz();
    }
    
    //var $Rpoints_div = $(".rdatas");
    //$Rpoints_div.show("slide", { direction: "left" }, anim_time_show);
    $(".rdatas").show();
    var $RpointsContainer = $(".rdatasContainer");
    $RpointsContainer.show("slide", { direction: "left" }, anim_time_show);
}

function showRviz() {
    console.log("--> show Rviz");
    rviz_on = true;
    loadBackground();
    loadRviz();
    $(".rdatas").show();
    var $RpointsContainer = $(".rdatasContainer");
    $RpointsContainer.show("slide", { direction: "left" }, anim_time_show);
}

function showMultiwindow() {
    console.log("---> show multiwindow mode", current_article_id);
    Multiwindow_on = true;
    var $multiwindow_div = $(".Multiwindow");
    $multiwindow_div.show("slide", { direction: "right"}, anim_time_show);
    // allow color changes on the text
    allowColorChange = true;
    allowBackgroundColorChange = true;
    var $codes_div = $(".Codes");
    if(Article_on || Draft_on){
        /*
        console.log("in here article or draft is open");

        console.log("**********");
        console.log("???",$(".articles").html(),"???");
        console.log("###",$(".articlecontent").attr('id'));
        console.log("###",$(".articlecontent").html());
        console.log("**********");
        */

        //var html_content = $("#"+current_article_id).html();
        //console.log("html_content",html_content);
        var html_content = $(".articlecontent").html();
        insertArticle(html_content);
    }
    $codes_div.show("slide", { direction: "left"}, anim_time_show);
}

function openNewDraft() {
    closeArticle();
    Article_on = true;
    Publication_on = false;
    Draft_on = true;
    console.log("--> open new draft");
    $(".articlecontent").empty();
    $(".articlecontent").attr("name","");
    $(".articlecontent").attr("version","");
    //$(".articlecontent").attr("id",draft.id);
    //$(".articlecontent").attr("backcolor",draft.background_color);
    //$(".articlecontent").attr("color",draft.color);
    $(".articlecontent").html("<p>Enter your text here...</p>");
}

function hideMultiwindow() {
    console.log("--> hide multiwindow mode");
    allowColorChange = false;
    allowBackgroundColorChange = false;
    Multiwindow_on = false;
    var $multiwindow_div = $(".Multiwindow");
    $multiwindow_div.hide("slide", { direction: "right" }, anim_time_show);
    var $Codes_div = $(".Codes");
    $Codes_div.hide("slide", { direction: "left" }, anim_time_show);
}

function hideRightPanel(type_name) {
    if(type_name == "Multi-window mode") {
        hideMultiwindow();
        return;
    }
    //console.log("BUG",type_name);
    var $panel = $("."+type_name);
    $panel.hide("slide", { direction: "right" }, anim_time_show);
    var panel_boolean = eval(type_name + "_on");
    $("#profile-menu").find("a[name='"+ type_name +"']").attr('class','unforceselection2');
    panel_boolean = false;
    if(type_name == "Library"){
        current_img_selected = "";
    }
}

function hideBottomPanel(type_name) {
    var $panel = $("."+type_name);
    var panel_boolean = eval(type_name + "_on");
    panel_boolean = false;
}

function hidePanel(type_name,use_animation) {
    console.log("--> hiding panel ","."+type_name);
    if(type_name == "rpoints" || type_name == "rviz"){
        $(".rdatas").hide();
        var $panel = $(".rdatasContainer");
        if(use_animation){
            $panel.hide("slide", {direction: "left"}, anim_time_hide); 
        }else{
            $panel.hide();
        }
    }else{
        var $panel = $("."+type_name);
        $panel.hide("slide", {direction: "left"}, anim_time_hide); 
    }
    
    if(type_name == "showAllDrafts"){
        $("#profile-menu").find("a[name='"+ type_name +"']").attr('class','unforceselection');
        $("#profile-menu").find("a[name='"+ "Drafts" +"']").attr('class','unforceselection2');
    }else {
        $("#profile-menu").find("a[name='"+ type_name +"']").attr('class','unforceselection2');
    }
    var panel_boolean = eval(type_name + "_on");
    panel_boolean = false;
}


function showDraft(draft){
    closeArticle();
    Article_on = true;
    Draft_on = true;

    current_article_id = draft.id;

    console.log("--> show draft",draft.id, draft.filename,current_profile);
    // we hide first the drafts panel
    Drafts_on = false;
    var $drafts_div = $(".showAllDrafts");
    $drafts_div.hide("slide", {direction: "left"}, anim_time_hide);
    $("#profile-menu").find("a[name='showAllDrafts']").attr('class','unforceselection');
    $("#profile-menu").find("a[name='"+ "Drafts" +"']").attr('class','unforceselection2');

    console.log("NEW CONTENT",draft);

    // we open the draft
    $(".articlecontent").attr("name",draft.filename);
    $(".articlecontent").attr("version",draft.version);
    $(".articlecontent").attr("id",draft.id);
    $(".articlecontent").attr("backcolor",draft.background_color);
    $(".articlecontent").attr("color",draft.color);
    $(".articlecontent").html(draft.content);

    //console.log("first test:",draft.content);
    //console.log("second test",$(".articlecontent").html());
    /*console.log("**********");
    console.log("###",$(".articlecontent").attr('id'));
    console.log("###",$(".articlecontent").html(draft.content));
    console.log("**********");
    */

    applyBackgroundColorToArticle(draft.background_color);
    applyFontColorToArticle(draft.color);

    if(current_profile == "designer") {
        removeDiscussions();
        removeComments();
    }

    // we update the multi-window editor in case it has been already opened
    console.log("---------> updating html content");
    var html_content = $(".articles #"+current_article_id).html();
    insertArticle(html_content);

    showArticleButtons(current_profile,false);

    // hide previous suggestion popup
    $(".suggestions .suggestion-popup").hide();

    // hide all tools popups
    $(".discussions .discussion-popup").hide();

    // update code editor in case it is open


    // TODO: weird..... use clone(true,true) instead...
    $("span.commentspan").on("click", function(){
        console.log("span content",$(this).html());
        var id = $(this).attr("id");
        var text = $(this).attr("value");
        console.log("should open comment box",id,text);
        if(!toolbar_on){
            showToolbar();
        }
        showPopupCommWithValue("comment","on",text);
    });

    // TODO: weird..... use clone(true,true) instead...
    $("img.discussion").on("click", function(){
        console.log("img content",$(this).html());
        var id = $(this).attr("id");
        //var text = $(this).attr("value");
        // first hide all other popup discussion
        hideAllPopupDiscussion();
        console.log("should open discussion box",id);
        showPopupDiscussion(id);
        restoreIconToOn("discussion");
        //showPopupCommWithValue("comment","on",text);
    });

}

function openPublicationWhenloggedOut(){
    console.log("--> openPublicationWhenloggedOut");
    socket.emit("openpublicationWhenLoggedOut", "article0");
}

function showPublicationWhenLoggedOut(publication){
    console.log("--> showPublicationWhenLoggedOut");
    Article_on = true;
    Publication_on = true;
    current_article_id = publication.id;
    $(".articlecontent").attr("name",publication.filename);
    $(".articlecontent").attr("id",publication.id);
    $(".articlecontent").html(publication.content);
}


function showPublication(publication){

    closeArticle();
    Article_on = true;
    Publication_on = true;
    console.log("--> show publication",publication.id, publication.filename,current_profile);
    current_article_id = publication.id;
    
    // we hide first the drafts panel
    Publications_on = false;
    var $publication_div = $(".publications");
    $publication_div.hide("slide", {direction: "left"}, anim_time_hide);

    //console.log("NEW CONTENT PUBLICATION",publication.content);

    // we open the publication
    $(".articlecontent").attr("name",publication.filename);
    $(".articlecontent").attr("id",publication.id);
    $(".articlecontent").html(publication.content);

    //??
    $(".articlecontent").attr("backcolor",publication.background_color);
    $(".articlecontent").attr("color",publication.color);
    $(".articlecontent").attr("version",publication.version);

    applyBackgroundColorToArticle(publication.background_color);
    applyFontColorToArticle(publication.color);

    // should already be not there...
    removeDiscussions();
    removeComments();
    

    // we update the multi-window editor in case it has been already opened
    console.log("---------> updating html content");
    var html_content = $(".articles #"+current_article_id).html();
    insertArticle(html_content);

    showArticleButtonsForPublication(current_profile);

    // hide previous suggestion popup
    $(".suggestions .suggestion-popup").hide();

    // hide all tools popups
    $(".discussions .discussion-popup").hide();

    //console.log("Test!!!",$(".articles").html());
    
}

function closeArticle() {
    Article_on = false;
    Draft_on = false;
    Publication_on = false;
    console.log("--> close article");
    $(".articlecontent").empty();
    $(".articlecontent").attr("name","");
    $(".articlecontent").attr("id","");
    $(".articlecontent").attr("backcolor","none");
    $(".articlecontent").attr("color","none");
    applyBackgroundColorToArticle("#FFFFFF");
    applyFontColorToArticle("#000000");
    // $(".articlecontent").attr("contenteditable","true"); // see for later
    console.log($(".articles").html());

    // hide previous suggestion popup
    $(".suggestions .suggestion-popup").hide();

    // hide all tools popups
    $(".discussions .discussion-popup").hide();

    // hide the save popu-up in case it was open
    $("#popup-save").fadeOut(500);
}

// function called when a draft is saved
function save(content, filename, version, back_color, color) {
    if(current_user == undefined || current_user.length <=0) return;
    var draft ={
        "id": 0, // will be generated on server side.. this value will be ignored
        "filename": filename,
        "author": current_user.name,
        "content": content,
        "image": "imgs/cells_3.jpg",  // TODO: retrieve it automatically from the article.. or use default background
        "version": version,
        "portrait": current_user.img,
        "rights": [current_user.rights],
        "email": current_user.email,
        "date": "05.10.2018",
        "background_color": back_color,
        "color": color,
    };
    //console.log("---> saving ",content);
    console.log("cc",back_color);
    socket.emit("savedraft",draft);
}

function publish() {

}

function initMenuContent() {
    $(".publications").hide();
}

function applyBackgroundColorToArticle(color){
    console.log("--> apply background color to article",color);
    if(color == "none") return;
    $(".articles").css("background-color",color);
    $(".articlecontent").css("background-color",color);
    $(".articlecontent").attr("backcolor",color);
    // ???
    //$("body").css("background-color",color);
}

function applyFontColorToArticle(color){
    console.log("--> apply font color to article",color);
    if(color == "none") return;
    // $(".articles:header").css("color",color.hexString + " !important");//doesn't seeem to work...
    // quick and dirty solution
    $(".articles p").css("color",color);
    $(".articles h1").css("color",color);
    $(".articles h2").css("color",color);
    $(".articles h3").css("color",color);
    $(".articles h4").css("color",color);
    $(".articles h5").css("color",color);
    $(".articles h6").css("color",color);
    $(".articles span").css("color",color);
    $(".articlecontent").attr("color",color);
}