


var users = [{"name" : "Sebastian Paulinet", "user": "spaulinet","img": "imgs/portraits/6.png","fakeimg" : "imgs/portraits/fake_1.png","email":"sebpaulinet@gmail.com","rights":"reader"},
            {"name" : "Paul Browdy", "user": "pbrowdy","img": "imgs/portraits/3.png","fakeimg" : "imgs/portraits/fake_2.png","email":"info@browdy.com","rights":"author"},
            {"name" : "Fiona Killouve", "user": "fkillouve","img": "imgs/portraits/2.png","fakeimg" : "imgs/portraits/fake_3.png","email":"mail@kilouve.com","rights":"publisher"},
            {"name" : "David Bihanic", "user": "dbihanic","img": "imgs/portraits/1.png","fakeimg" : "imgs/portraits/fake_4.png","email":"info@davidbihanic.com","rights":"designer"}];



// ok.. a bit weird to have two objects for that. First one is for the order, the other one for the logic
var menus = {   "reader": "Publications,Viewmodes,Library,Templates,Bookmarks",
                "author": "Publications,Viewmodes,Library,Bibliography,Drafts",
                "publisher": "Publications,Viewmodes,Library,Drafts",
                "designer": "Publications,Viewmodes,Library,Templates,Drafts"};


var publication_delay = 0;

// var active_menus_full = [  "Publications", "Templates", "Bookmarks", "showAllDrafts", "newDraft", "rpoints", "rviz" ];
var active_menus_full = [  "Publications", "Templates", "Bookmarks", "showAllDrafts", "newDraft", "rpoints", "rviz" ];

var active_menus_left = [ "Viewmodes","Bibliography", "Library", "Multiwindow","Multi-window mode","printpdf" ];

var previous_active_menu = "";
var previous_active_menu_right = "";

var current_user = undefined;
var login = false;
var current_profile = "";
var current_type = "";


// not used...
function loadUsers() {

    var userdatas = JSON.parse(users);
    var user_name = userdatas[0].name;
    var user_age = userdatas[0].age;
}


function getRights(username) {
    for(u of users){
        if (u.user == username){
            return u.rights;
        }
    }
    return "";
}

function getUserData(username) {
    for(u of users){
        if (u.user == username){
            return u;
        }
    }
    return undefined;
}


function manageNavbar() {

    $(".horizontal-navbar .logo").mouseover(function(){
        $(".horizontal-navbar .login").show();
    });

    $(".horizontal-navbar .login").mouseleave(function(){
        $(".horizontal-navbar .logo").show();
        $(".horizontal-navbar .login").hide();
    });

    // LOGIN
    $(".horizontal-navbar .btn-field").on("click",function(){
        login = true;
        console.log("name");
        var username = $(".login").find("input[name=username]").val();
        console.log("--> login", username);
        publication_delay = 500;

        // TODO: undcomment following line to remove fake entry
        //username = "dbihanic";

        var user = getUserData(username);
        if(user != undefined){
            console.log("--> sucessful login", user);
            $(".vertical-navbar").find("img[name=fakeimg]").attr("src",user.fakeimg)
            current_user = user;

            //TODO: fake the profile menu --> comment the following line
            updateProfileMenu(current_user.rights);

           // $(".logout p.identification").hide();
            $(".horizontal-navbar .logo").hide();
            $(".horizontal-navbar .login").slideUp(350,"swing",function() {
                $(".horizontal-navbar .logout").slideDown(350,"swing");
                $(".vertical-navbar").show("slide", { direction: "left" }, 500);
            });

            
        } else { // restore default values
            $(".login").find("input[name=username]").val("Enter login");
            $(".login").find("input[name=password]").val("Enter password");
        }

    });
}

function updateProfileMenu(rights) {
    // first hide everything...
    $(".logout .dropdown-contentTest a").hide();
    // show the default standard values..
    $(".logout .dropdown-contentTest #reader").show();
    $(".logout .dropdown-contentTest #logout").show();
    switch(rights){
        case "author":
            $(".logout .dropdown-contentTest #author").show();
        break;
        case "publisher":
            $(".logout .dropdown-contentTest #publisher").show();
        break;
        case "designer":
            $(".logout .dropdown-contentTest #designer").show();
        break;
    }

    $(".logout #"+ rights).click();

    $(".logout p.identification").show();
    var text_profile = current_profile.charAt(0).toUpperCase() + current_profile.substring(1,current_profile.length);
    if(text_profile == "Publisher"){
        $(".logout a.dropbtnTest").text("Editor");
    }else {
        $(".logout a.dropbtnTest").text(text_profile);
    }
}

function initNavbar() {

    $(".logout .nav-icon").parent().hide();

    // TODO: to be implemented - CLICK ON PRINT
    $(".logout #print").on("click",function() {
        console.log("---> print");

        right_menu_has_been_clicked = true;
        var type = "printpdf";
        var $profile_menu = $("#profile-menu");

        // if last panel was pdf and current panel pdf as well
        if(previous_active_menu_right == type){
            previous_active_menu_right = "";
            hideRightPanel(type);
            //if(Article_on)
              //  showArticleButtons(current_profile,true);
        }
        // if previous menu is a right panel 
        else if(active_menus_left.includes(previous_active_menu_right)){
            if(previous_active_menu_right == "Multi-window mode"){ 
                multi_window_on = false;
                $profile_menu.find("a[name='Viewmodes']").attr('class','unforceselection2');
                //$profile_menu.find("a[name='View modes']").hide();
                $profile_menu.find("a[name='Multi-window mode']").attr('class','unforceselection');
                hideMultiwindow();
            }else{
                hideRightPanel(previous_active_menu_right);
            }
            previous_active_menu_right = type;
            printpdf_on = true;
            var $printpdt_div = $(".printpdf");
            $printpdt_div.show("slide", { direction: "right" }, anim_time_show);
        // if previous menu is a full panel
        }else if(active_menus_full.includes(previous_active_menu)){
            var $previous_menu = $("#profile-menu").find("a[name='"+ previous_active_menu+"']");
            hidePanel(previous_active_menu,true);
            previous_active_menu_right = type;
            printpdf_on = true;
            var $printpdt_div = $(".printpdf");
            $printpdt_div.show("slide", { direction: "right" }, anim_time_show);
            showArticleButtons(current_profile,true);
        }else {
            previous_active_menu_right = type;
            printpdf_on = true;
            var $printpdt_div = $(".printpdf");
            $printpdt_div.show("slide", { direction: "right" }, anim_time_show);
        }

        /*
        if(previous_active_menu_right == type){
            previous_active_menu_right = "";
            hideRightPanel(type);
            if(Article_on)
                showArticleButtons(current_profile,true);
        }else{
            previous_active_menu_right = type;
        }

        showArticleButtons(current_profile);
        */
        /*
        
        printpdf_on = true;
        var $printpdt_div = $(".printpdf");
        $printpdt_div.show("slide", { direction: "right" }, anim_time_show);
        */


       // $(".printpdf").show();
    });

    // CLICK ON BOOKMARK
    $(".logout #bookmark").on("click",function() {
        console.log("---> bookmark");
        var message = {"id": $(".articlecontent").attr("id")};
        console.log("publication id",$(".articlecontent").attr("id"));
        console.log("--> socket addBookmark", message);
        socket.emit("addBookmark", message);
    });

    // CLICK ON SUGGESTION
    $(".logout #suggestion").on("click",function() {
        console.log("---> add suggestion");
        var articleId = $(".articlecontent").attr('id');
        showSuggestion(articleId);
    });

    // CLICK ON SAVE
    $(".logout #save").on("click",function() {

        var filename = $(".articlecontent").attr("name");
        var version = $(".articlecontent").attr("version");
        console.log("---> save popup",filename,version);
        if(filename == undefined || filename.length == 0) filename = "Enter name";
        if(version == undefined || version.length == 0) version = "Enter version";
    
        
        $("#popup-save .text-field").val(filename);
        $("#popup-save #version-field").val(version);
        $("#popup-save").fadeIn(500);
    });

    // CLICK ON POPUP-SAVE - when saving draft
    $("#popup-save .btn-field").on("click", function() {
        console.log("---> save article");
        var filename = $(this).parent().find(".text-field").val();
        var version = $(this).parent().find("#version-field").val();
        $(".articlecontent").attr("name",filename);
        $(".articlecontent").attr("version",version);

        console.log("filename",filename);
        var back_color = $(".articlecontent").attr("backcolor");
        console.log("background_color",back_color);
        var color = $(".articlecontent").attr("color");
        console.log("color",color);
        var id = $(".articlecontent").attr("id");
        console.log("filename",filename, "saving .. is ID already defined",id);
        $("#popup-save").fadeOut(500);
        save($(".articlecontent").html(),filename,version,back_color,color);
    });

    // CLICK ON SHARE WITH
    /*
    $(".logout #sharewith").on("click",function() {
        console.log("---> share with FROM TOP BUTTON");
        var id = $(".articlecontent").attr("id");
        var name = $(".articlecontent").attr("name");
        var content = $(".articlecontent").html();
        console.log("id",id);
        console.log("name",name);
        console.log("content",content);
        // TODO: BUG.... send the article as well in case of author not saved before...
        var message = {"id": id, "rights": name, "content": content};
        socket.emit("sharedraft", message);
    });*/

    // CLICK ON PUBLISH
    $(".logout #publish").on("click",function() {
        console.log("---> publish");
        var message = {"id": $(".articlecontent").attr('id'),"filename": $(".articlecontent").attr("name"), "rights": "publish", "content": $(".articlecontent").html()};
        socket.emit("sharedraft", message);
    });


    // TODO: simplify this code... look and feel
    $(".logout .nav-icon").on("mouseover", function(){
        if( $(this).attr('id') != "shared"){
            var path = "imgs/icons/" + $(this).attr('id') + "_hover.svg";
            $(this).find("img").attr("src",path);
        }
    });
    $(".logout .nav-icon").on("mouseout", function(){
        if( $(this).attr('id') != "shared"){
            var path = "imgs/icons/" + $(this).attr('id') + ".svg";
            $(this).find("img").attr("src",path);
        }
    });
    $(".logout .nav-icon").on("click", function(){
        var path = "imgs/icons/" + $(this).attr('id') + "_selected.svg";
        $(this).find("img").attr("src",path);
        /*
        if($(this).attr('id') == "sharewith"){
            var path = "imgs/icons/" + $(this).attr('id') + "_selected.svg";
            $(this).attr('id',"shared");


            $(this).find("img").attr("src",path);
        }else{
            var path = "imgs/icons/" + $(this).attr('id') + "_selected.svg";
            $(this).find("img").attr("src",path);
        }*/
        
    });
}

function setNavButtons(profile_id, publication_on) {
    $(".logout .nav-icon").parent().hide();
    $(".logout #print").parent().show();
    switch(profile_id){
        case "reader":
            $(".logout #print").parent().show();
            $(".logout #bookmark").parent().show();
            showSuggestionsIcon(profile_id);
            //$(".logout #suggestion").parent().show();
        break;
        case "author":
        case "publisher":
            $(".logout #print").parent().show();
            if(publication_on){
                showSuggestionsIcon();
            }else {
                $(".logout #save").parent().show();
            }
            //$(".logout #sharewith").parent().show();
        break;
        case "designer":
            $(".logout #save").parent().show();
            $(".logout #publish").parent().show();
            if(publication_on){
                showSuggestionsIcon();
            }
        break;
    }
  
}

function showSuggestionsIcon(profile){
    var articleId = $(".articlecontent").attr('id');
    //console.log("attr:",articleId,"t ",articleId.length);
    if(articleId.length > 0){ 
        var $div = $(".suggestions").find("div[eltID=" + articleId + "]");
        var nb_suggestions = $div.find(".message-area").length;
        //console.log("--> show suggestions: nb suggestions",nb_suggestions);
        if(nb_suggestions > 0){
            $(".logout #nbSuggestions").text(nb_suggestions);
            $(".logout #suggestion").parent().show();
        }else if(profile == "reader"){
            $(".logout #nbSuggestions").text("");
            $(".logout #suggestion").parent().show();
        }else{
            $(".logout #nbSuggestions").text("");
        }
    }
}

function hideNavButtons() {
    //console.log("-> hideNavbuttons");
    $(".logout .nav-icon").parent().hide();
}

function showArticleButtons(current_profile) {
    Article_on = true;
    setNavButtons(current_profile,false);
}

function showArticleButtonsForPublication(current_profile) {
    Article_on = true;
    setNavButtons(current_profile,true);
}

function toggleProfile(){
    $(".logout .dropbtnTest").toggle("show");
}

function manageProfileMenu() {

   
    $("#profile-menu-selection a").on("click",function(){
        
        var profile_id = $(this).attr('id');
        current_profile = profile_id;

             // close the submenu
        //$(".dropdown-contentTest").attr("display","none");
             //$(".logout .dropdown-contentTest a").hide();
    
    
    
    
        hideNavButtons();
        
        console.log("--> New profile has been selected", current_profile);
        if(profile_id == "logout" && login){
            console.log("--> logout");
            // reset the profile menu
            $(".logout p.identification").hide();
            $(".logout a.dropbtnTest").text("Profile");
            $(".login").find("input[name=username]").val("Enter login");
            $(".login").find("input[name=password]").val("Enter password");
            current_user = undefined;

            // close the current article
            closeArticle();

            var panel_open = false;
            // close all panels
            if(previous_active_menu.length > 0){
                hidePanel(previous_active_menu, true);
                panel_open = true;
            }
            if(previous_active_menu_right.length > 0){
                panel_open = true;
                if(previous_active_menu_right == "Multiwindow") {
                    hideMultiwindow();
                } else {
                    hideRightPanel(previous_active_menu_right);
                }
            }
            // close toolbar
            toolbar_on = false;
            hideToolbar();

            // animate the navigation bar
            login = false;
            $(".horizontal-navbar .logo").hide();
            if(panel_open) {
                $(".vertical-navbar").delay(500).hide("slide", { direction: "left"}, 500);
                $(".horizontal-navbar .logout").slideUp(350,"swing",function() {
                    $(".horizontal-navbar .login").slideDown(350,"swing");    
            });
            } else {
                $(".vertical-navbar").hide("slide", { direction: "left" }, 500);
                $(".horizontal-navbar .logout").slideUp(350,"swing",function() {
                    $(".horizontal-navbar .login").slideDown(350,"swing");    
                });
            }

            openPublicationWhenloggedOut();
            

        } else {
            var vals = menus[profile_id].split(",");
            //console.log(profile_id,vals);

            var $profile_menu = $("#profile-menu");
            //console.log("div profile",$profile_menu);
            //console.log("a",profile_id);

            if(profile_id.length > 0){
                //console.log("b",profile_id);
                $(".logout p.identification").show();
                var text_profile = profile_id.charAt(0).toUpperCase() + profile_id.substring(1,profile_id.length);
                if(text_profile == "Publisher"){
                    $(".logout a.dropbtnTest").text("Editor");
                }else {
                    $(".logout a.dropbtnTest").text(text_profile);
                }

            }
            

            $profile_menu.empty();
            $.each(vals, function(index, value) {
               // $profile_menu.append("<div class='active'><a href='#' id='"+profile_id + "' name='" + value + "'>" + value + "</a></div>");
                
               // ok... this is very ugly.... 
               if(value == "Drafts"){
                   var html_code = "<div class='dropdown-drafts'>";
                   html_code += "<a href='#' class='dropdown-drafts-btn'  id='"+profile_id+"' name='Drafts'>Drafts</a>";
                   html_code += "<div class='dropdown-drafts-content'>";
                   html_code += "<div class='dropdown-drafts-item'><a href='#' name='showAllDrafts' id='"+profile_id+"'>Show all drafts</a></div>";
                   if(profile_id == "author"){
                        html_code += "<div class='dropdown-drafts-item'><a href='#' name='NewDraft' id='"+profile_id+"'>New draft</a></div>";
                   }
                   html_code += "</div>";
                   $profile_menu.append(html_code);
                   // and this is even more uglier... didnt know thow to make it relative without expanding box on the left
                   if(profile_id == "author" || profile_id == "designer"){
                        $(".dropdown-drafts-content").css("top","312px");
                        $(".dropdown-drafts-content").css("z-index","200");
                   }else if(profile_id == "publisher"){
                        $(".dropdown-drafts-content").css("top","285px");
                        $(".dropdown-drafts-content").css("z-index","200");
                   }
               }else if(value == "Viewmodes"){
                    var html_code = "<div class='dropdown-modes'>";
                    html_code += "<a href='#' class='dropdown-modes-btn' id='"+profile_id+"' name='Viewmodes'>View modes</a>";
                    html_code += "<div class='dropdown-modes-content'>";
                    html_code += "<div class='dropdown-modes-item'><a href='#' name='Contextual mode' id='"+profile_id+"'>Contextual mode</a></div>";
                    if(profile_id == "reader" || profile_id == "publisher"){
                        html_code += "<div class='dropdown-modes-item'><a href='#' name='Multi-window mode' id='"+profile_id+"'>Multi-window mode</a></div>";
                        html_code += "<div class='dropdown-modes-item'><a href='#' class='notclickable' id='"+profile_id+"'>Control panel</a></div>";
                    } else if(profile_id == "designer"){
                        html_code += "<div class='dropdown-modes-item'><a href='#' name='Multi-window mode' id='"+profile_id+"'>Multi-window mode</a></div>";
                        html_code += "<div class='dropdown-modes-item'><a href='#' class='notclickable' id='"+profile_id+"'>Constructive/Swarm mode</a></div>";
                        html_code += "<div class='dropdown-modes-item'><a href='#' class='notclickable' id='"+profile_id+"'>Control panel</a></div>";
                    }
                    html_code += "</div>";
                    $profile_menu.append(html_code);
               }else {
                    $profile_menu.append("<div><a href='#' id='"+profile_id + "' name='" + value + "'>" + value + "</a></div>");
               }
            });
            
            // special case for designers...
            if(profile_id == "designer"){
                $profile_menu.append("<br>");
              //  $profile_menu.append("<a href='#' name='Codes' id='"+profile_id+"'></a>");
                $profile_menu.append("<a href='#' class='notclickable'>R/graphs</a>");
                $profile_menu.append("<a href='#' class='notclickable'>R/gen</a>");
            }

            // hard code for now... will work on it later...
            $profile_menu.append("<br>");
            $profile_menu.append("<a href='#' class='notclickable'>Networks</a>");
            if(profile_id == "designer") {
                $profile_menu.append("<a href='#' id='" + profile_id + "' name='rpoints' >R/points (73)</a>");
            } else {
                $profile_menu.append("<a href='#' id='" + profile_id + "' name='rpoints' >R/points</a>");
            }
            $profile_menu.append("<a href='#' id='" + profile_id + "' name='rviz' >R/viz</a>");

            var right_menu_has_been_clicked = false;
        

            // publications, library, drafts, templates...
            $profile_menu.find("a").on("click",function(){
                
                //Article_on = false;
                right_menu_has_been_clicked = true;
                var type = $(this).attr("name");
                /*
                if(previous_active_menu == "Publications" || previous_active_menu == "Drafts" || previous_active_menu == "Templates" || previous_active_menu == "rpoints" || previous_active_menu == "rviz") {
                    showArticleButtons(current_profile);
                }*/
/*
                if(type == "Bookmarks" || type == "Publications" || type == "Drafts" || type == "Templates" || type == "rpoints" || type == "rviz") {
                    hideNavButtons();
                }
  */              


  
                current_type = type;
                var profile = $(this).attr("id");
                //console.log("params",type,profile);
                if(type != "Viewmodes" && type != "Drafts"){ // we ignore.. it opens the submenu
                    if(type == "Contextual mode"){
                        toolbar_on = !toolbar_on;
                        if(toolbar_on){
                            multi_window_on = false;
                            $(this).attr('class','forceselection');
                            $profile_menu.find("a[name='Multi-window mode']").attr('class','unforceselection');
                            hideMultiwindow();
                            showToolbar();
                        }else {
                            $(this).attr('class','unforceselection');
                            toolbar_on = false;
                            hideToolbar();
                        }
                    }else if(type == "Multi-window mode"){
                        multi_window_on = !multi_window_on;
                        if(multi_window_on){
                            toolbar_on = false;
                            $(this).attr('class','forceselection');
                            $profile_menu.find("a[name='Contextual mode']").attr('class','unforceselection');

                            if(active_menus_left.includes(previous_active_menu_right)){
                                hideRightPanel(previous_active_menu_right);
                            }

                            hideToolbar();
                            showMultiwindow();
                            previous_active_menu_right = type;
                        }else{
                            $(this).attr('class','unforceselection');
                            hideMultiwindow();
                            previous_active_menu_right = "";
                        }
                    
                    }else{  

                        var use_animation = true;
                        // when we switch between the two visualisations, we don't do the animations
                        if( (type == "rpoints" && previous_active_menu == "rviz") 
                            || (type == "rviz" && previous_active_menu=="rpoints") ) use_animation = false;

                        // if previous menu is a right panel and currrent menu is also a right panel
                        if(active_menus_left.includes(previous_active_menu_right) && 
                                    active_menus_left.includes(type)){
                            if(previous_active_menu_right == "Multi-window mode"){ 
                                multi_window_on = false;
                                $profile_menu.find("a[name='Viewmodes']").attr('class','unforceselection2');
                                //$profile_menu.find("a[name='View modes']").hide();
                                $profile_menu.find("a[name='Multi-window mode']").attr('class','unforceselection');
                                hideMultiwindow();
                            }else{
                                hideRightPanel(previous_active_menu_right);
                            }
                        }else if(active_menus_full.includes(previous_active_menu)){
                            var $previous_menu = $("#profile-menu").find("a[name='"+ previous_active_menu+"']");
                            hidePanel(previous_active_menu,use_animation);
                        }
                        console.log("type??",type, previous_active_menu);
                        if(previous_active_menu == type){
                            previous_active_menu = "";
                            //TODO: distinguish if it is a draft or an article...
                            console.log("should come here....");
                            if(Article_on)
                                showArticleButtons(current_profile,true);
                        }else if(previous_active_menu_right == type){
                            previous_active_menu_right = "";
                            hideRightPanel(type);
                            if(Article_on)
                                showArticleButtons(current_profile,true);
                        }else if(type == "NewDraft"){
                            //console.log("--> create new draft");
                            Article_on = true;
                            openNewDraft();
                            showArticleButtons(current_profile,false)
                            $profile_menu.find("a[name='NewDraft']").attr('class','unforceselection');
                            if(active_menus_full.includes(type)){
                                previous_active_menu = "";
                                hidePanel(previous_active_menu);
                            }
                        }
                        else {
                            if(active_menus_full.includes(type)){
                                previous_active_menu = type;
                                hideNavButtons();
                                /*if(!Article_on){
                                    hideNavButtons();
                                }*/
                            }
                            if(active_menus_left.includes(type)){
                                previous_active_menu_right = type;
                                showArticleButtons(current_profile)
                            }
                            
                            $(this).attr('class','forceselection');
                            console.log("Client sends message to the server:",type,profile);
                            socket.emit(type, profile);
                        }
                
                    }

                    // optional... ?????
                    
                    if(toolbar_on || multi_window_on){
                        $profile_menu.find("a[name='Viewmodes']").attr('class','forceselection');
                    }else{
                        $profile_menu.find("a[name='Viewmodes']").attr('class','unforceselection2');
                    }
                

                }
            });

            
            if(!right_menu_has_been_clicked){
                // close current panel 
                if(previous_active_menu_right != ""){
                    if(current_type == "Contextual mode"){
                        toolbar_on = false;
                        $profile_menu.find("a[name='Contextual mode']").attr('class','unforceselection');
                        $profile_menu.find("a[name='Viewmodes']").attr('class','unforceselection2');
                        hideToolbar();
                    }else if(current_type == "Multi-window mode"){
                        multi_window_on = false;
                        $profile_menu.find("a[name='Multi-window mode']").attr('class','unforceselection');
                        $profile_menu.find("a[name='Viewmodes']").attr('class','unforceselection2');
                        hideMultiwindow();
                    }
                    hideRightPanel(previous_active_menu_right);
                }
                if(previous_active_menu != ""){
                    hidePanel(previous_active_menu,true);
                }

                // open publications panel
                previous_active_menu_right = "";
                previous_active_menu = "Publications";
                $profile_menu.find("a[name='Publications']").attr('class','forceselection');
                
                socket.emit("Publications", profile_id);

                // close current article
                closeArticle();
                
            }
    
            // update contextual toolbar
            setToolbar(profile_id);
            toolbar_on = false;
            hideToolbar();


            /*
            $.getJSON("public/profile-menu.json", function(data) {
                console.log("yup");
            });
            */
        }


       // console.log("menu",$profile_menu.html());

    });



    
}


var toolbar;


$( document ).ready(function() {


    console.log("--> Document has been loaded");
    //TODO: do it otherwise because we see it when loading
    //$(".suggestions .suggestion-popup").hide();
   
    manageNavbar();
    manageProfileMenu();
    initNavbar();
    initMenuContent();

    //loadRpoints();
    //loadRviz();
    initCanvas();
    loadBackground();
    loadRpoints();
    //loadRviz();
    //loadRdatas();

    //setToolbar("author");
    //showToolbar();

    //$(".login .btn-field").click();
   // $(".logout #designer").click();
    //$("#profile-menu").find("a[name='Multi-window mode']").click();


    setupEditor();

    openPublicationWhenloggedOut();
    //setupArticle(); // TODO: see if we want it bi-directional
    //update();

    //insertArticle("<div>un petit texte <p>un peu de paragraphe</p><h1>et un titre</h1></div>");

    //var $codes_div = $(".Codes");
    //$codes_div.show("slide", { direction: "left"}, anim_time_show);

   // hidePanel("Publications");
   //.ui-state-active .ui-icon, .ui-button:active .ui-icon

    $(".ui-state-hover .ui-icon").css("background-image","url(../imgs/assets/arrow-right2.png)");
    $(".ui-state-active .ui-icon, .ui-button:active .ui-icon").css("background-image","url(../imgs/assets/arrow-right2.png)");
    $(".ui-icon, .ui-widget-content .ui-icon").css("background-image","url(../imgs/assets/arrow-right2.png)");

});


/*
1 args:
bold
italic
underline
subscript
superscript

2 args:
createLink - unlink
insertImage
insertHTML --- for html, video, audio

$("#tool-div").find('img[name=bold]').on("click",function(){
        console.log("yela");
        //document.execCommand("insertImage",false,"https://img-3.journaldesfemmes.com/7T618ZZzWsxNfuZDpjzETlxxoyE=/910x607/smart/de394a78fca04f879cc1c5a90521af7e/ccmcms-jdf/10360989.jpg");
        //document.execCommand("insertHTML",false,"<br><h1>COUCOU</h1>");
        //document.execCommand("insertHTML",false,"<video width='320' height='240' controls><source src='https://youtu.be/be4cMyVB-4U' type='video/mp4'></video>");
        //<audio controls><source src="horse.mp3" type="audio/mpeg">Your browser does not support the audio element.</audio>
        //document.execCommand("foreColor",false,"#FF0000");
       // document.execCommand("fontName",false,"Times");
        document.execCommand("fontSize",false,"6");
        console.log($(".container").html());
    });
*/

