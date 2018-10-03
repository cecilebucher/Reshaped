
var toolbar_on = false;
var multi_window_on = false;
var link_active = false;
var font_type = "";
var img_id_name = "img"
var img_id_counter = 0;
var selected_img_id = "";
var current_img_selected = "";
var discussion_id_name = "discussion";
var discussion_id_counter = 1;
var current_discussion_id = "";
var comment_id_name = "comment";
var comment_id_counter = 0;
var current_comment_id = "";
var current_article_id = "";



var toolbars = {   "reader": "text,Aplus,color,line,night,dys", // removed number_size for now...
                   "author": "text,Aplus,color,bold,italic,underlined,x2,x2bis,img,play,sound,comment,discussion,link",
                   "publisher": "text,Aplus,color,bold,italic,underlined,img,play,sound,comment,discussion,link",
                   "designer": "text,Aplus,color,code",
                    "test": "italic,link"};

var toolbars_mapping = {
    "text": {"func": "showPopupText", "action": "fontName", "action_name": "changing font"},
    "Aplus": {"func": "showPopupAplus", "action": "fontSize", "action_name": "changing font size"},
    "color": {"func": "showPopupColor", "action": "foreColor", "action_name": "changing font color"},

    "line": {"func": "showPopupline", "action": "changelineheight", "action_name": "changing line spacing"},
    "night": {"func": "applyTool", "action": "changeCSS", "action_name": "changing contrast"},
    "dys": {"func": "applyTool", "action": "changeCSS", "action_name": "dyslexic"},

    "bold": {"func": "applyTool", "action": "bold","action_name": "change font to bold"},
    "italic": {"func": "applyTool", "action": "italic","action_name": "change font to italic"},
    "underlined": {"func": "applyTool", "action": "underline","action_name": "change font to underline"},
    "x2": {"func": "applyTool", "action": "superscript","action_name": "superscript"},
    "x2bis": {"func": "applyTool", "action": "subscript","action_name": "subscript"},

   // "img": {"func": "showPopup", "action": "insertImage", "action_name": "insert image"},
    "img": {"func": "applyTool", "action": "insertImage", "action_name": "insert image"},
   // "play": {"func": "showPopup", "action": "insertVideo", "action_name": "insert video"},
    "play": {"func": "applyTool", "action": "insertImage", "action_name": "insert video"},
    "sound": {"func": "applyTool", "action": "insertImage", "action_name": "insert sound"},
    "code": {"func": "showPopupCode", "action": "insertHTML", "action_name": "insert html"},
    "link": {"func": "showPopuplink", "action": "createLink","action_name": "adding link"},

   // "p": {"func": "applyTool", "action": "changeCSS","action_name": "adding link"},

    "comment": {"func": "showPopupComm", "action": "comment","action_name": "adding comment"},
    "discussion": {"func": "showNewPopupDiscussion", "action": "comment","action_name": "adding discussion"},
   // "pen": {"func": "showPopupPen", "action": "comment","action_name": "adding design comment"},

};

var donotkeepselected = ["bold","italic","underlined","x2","x2bis","img","play","sound"];

var colors = [  "#2e4d2e","#2e7345","#2e9975","#2db3b3","#2db3b3","#7ea1e5","#aaaaf2",
                "#2e4d45","#2e6d73","#2e6d99","#2d4eb3","#5c52cc","#a87ee5","#e0aaf2",
                "#2e3e4d","#2e3973","#3f2e99","#702db3","#b852cc","#e57ed5","#f2aace",
                "#352e4d","#562e73","#8f2e99","#b32d91","#cc5285","#e57e88","#f2bcaa"];

var fontsize = ["H1","H2","H3","H4","H5","H6"];

class Toolbar{
    constructor(){
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        var that = this;
    }
}

function applyTool(keyname,param){
    var vals = toolbars_mapping[keyname];
    var action = vals["action"];
    var action_name = vals["action_name"];
    console.log("applyTool:",action_name,param);
    if(keyname == "img"){
        var imgID = "img_id_name" + img_id_counter;
        var html_code = "<div class='addLibraryDiv'><a href='#'><img src='imgs/icons/bg_grand_img.png' id='" + imgID + "' class='addimglibrary'></a></div>";
        document.execCommand("insertHTML",false,html_code);

        // add opening library
        //console.log("img", $("#img_id_name" + img_id_counter));

        //$("#img_id_name" + img_id_counter).on("click", function() {
        $(".articles img.addimglibrary").on("click", function() {
            current_img_selected = $(this).attr("id");
            console.log("image click --> open library", current_img_selected);
            var type_name = "Library";
            $("#profile-menu").find("a[name='"+ type_name +"']").attr('class','forceselection');
            socket.emit(type_name, current_profile);     
        });
        img_id_counter++;
        
    }else if(keyname == "play"){

        var imgID = "img_id_name" + img_id_counter;
        var html_code = "<div class='addLibraryDiv'><a href='#'><img src='imgs/icons/bg_grand_video.png' id='" + imgID + "' class='addvideolibrary'></a></div>";
        document.execCommand("insertHTML",false,html_code);

        //$("#img_id_name" + img_id_counter).on("click", function() {
        $(".articles img.addvideolibrary").on("click", function() {
            current_img_selected = "";//$(this).attr("id"); // we do not want to insert images....
            console.log("image click --> open library", current_img_selected);
            var type_name = "Library";
            $("#profile-menu").find("a[name='"+ type_name +"']").attr('class','forceselection');
            socket.emit(type_name, current_profile);     
        });
        img_id_counter++;

    }else if(keyname == "sound"){

        var imgID = "img_id_name" + img_id_counter;

        var html_code = "<div class='addLibraryDivSound'><a href='#'><img src='imgs/icons/bg_petit_sound.png' class='addsoundlibrary'></a></div>";
        document.execCommand("insertHTML",false,html_code);

        // add opening library
        console.log("img", $("#img_id_name" + img_id_counter));
        $(".articles img.addsoundlibrary").on("click", function() {
        //$("#img_id_name" + img_id_counter).on("click", function() {
            current_img_selected = "";//"img_id_name" + img_id_counter;
            console.log("image click --> open library");
            var type_name = "Library";
            $("#profile-menu").find("a[name='"+ type_name +"']").attr('class','forceselection');
            socket.emit(type_name, current_profile);
        });
        img_id_counter++;

    }else{
        if(action == "changeCSS"){

        }else if(action == "comment"){

        }else if(action != undefined){
            if(param != undefined) {document.execCommand(action,false,param);}
            else {document.execCommand(action,false,false);}
            
            
        }
    }
    console.log("!!!------------> HTML",$(".articlecontent").html());
}

function insertHtag(){
    
    value = "10px";
    borto.wrapSelection("<p style='height: "+ value + ";'/>");

    
    console.log("TEST !!!------------> HTML",$(".articlecontent").html());
}

var selRange2;
function removeHtag(){
   
    //selectedElement = window.getSelection().focusNode.parentNode;
    //$(selectedElement).css("height", "20px");  
    value = "50px";
    borto.wrapSelection("<p style='height: "+ value + ";'/>");

    console.log("TEST 2 !!!------------> HTML",$(".articlecontent").html());
}

function openDialog(){
    console.log("open dialog!!!");
}



function applyToolFromPopup(keyname,value) {
    console.log("keyname",keyname);
    var vals = toolbars_mapping[keyname];
    console.log("applyToolfrom popup:",vals["action"], " with param ",value, " KEYNAME:",keyname);
    
    var action = vals["action"];

    if(action == "insertVideo"){

    }else if(action == "insertAudio"){

    }else if(action == "changeCSS"){

    }else if(action == "fontSize"){
        var uppercaseValue = value.toUpperCase();
        var tag = getTag();
        //console.log("tag",tag);
        if(tag == undefined){
            return;
        }
        if(tag != uppercaseValue){
            borto.wrapSelection('<'+value+'/>')
            if(fontsize.includes(tag)){
                for(f of fontsize){
                    if(tag != f.toLowerCase()){
                        removeSelectedElements(f);
                    }
                }
            }
        }else{
            //console.log("should remove tag!! ",value);
            removeSelectedElements(value);
        }
    }else if(action == "fontName"){
        
        if(value == "sansserif"){
            if(font_type == value){ // we undo the font type
                removeSelectedElements("font");
            }else{
                document.execCommand("fontName",false,"verdana");
            }
        }else if(value = "serif"){
            if(font_type == value){ // we undo the font type
                removeSelectedElements("font");
            }else{
                document.execCommand("fontName",false,"Times");
            }
        }
        font_type = value;
    }else if(action == "changelineheight"){
        borto.wrapSelection("<p style='height: "+ value + "px;'/>");
    }else if(action == "createLink"){   
        var html_value = "<a href='" + value + "' ";
        html_value += "onClick=\"window.open('" + value + "')\"";
        html_value += "</a>";
        //console.log("html value",html_value);
        borto.wrapSelection(html_value);
    }else if(action != undefined){
        console.log("in here", action);
        document.execCommand(vals["action"],true,value);
    }
    console.log("------------> HTML",$(".articlecontent").html());
}

function showPopuplink(keyname,state) {
    console.log("--> show popup",keyname);
    console.log("state",state);
    
    var popup = $("#"+keyname+"-popup");
    console.log("popup",popup);
    if(popup != undefined){
       if(state == "on"){
            wrapSelectedText();
            selRange = saveSelection();
            popup.show();
       }else{
           popup.hide();
       }
    }
}

function wrapWithIconDiscussion(path) {    
    console.log("wrap with icon");   
    // TODO: check if the rangeAt returns something valid
    //if(window.getSelection().toString() != ""){
        //var selection= window.getSelection().getRangeAt(0);
        var id = discussion_id_name + discussion_id_counter;
        current_discussion_id = id;
        console.log("discusion id",id);
        var html_code = "<img src='imgs/icons/note.png' class='discussion' id='" + id + "'>";
        document.execCommand("insertHTML",false,html_code);
        discussion_id_counter++;

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
        return current_discussion_id;
    //}
}

function createPopupDiscussion(id) {
    if(id == null) return;
    var $div = $(".discussions");
    $(".discussions").append("<div class='discussion-popup' name='discussion-popup' id='"+id+"' state='off'></div>"); 
    var $div = $("#"+id);
    var idheader = discussion_id_name + "header" + discussion_id_counter;
    $("<div id='discussion-popupheader' id='"+idheader+"'><h1>Discussion</h1></div>").appendTo($div);
    
    $("<button class='close'>Close</button>").appendTo($div);
    $("<div class='discussion-intern' id='discussion-intern'></div>").appendTo($div);
    $("<div class='discussion-send'></div>").appendTo($div);
    var $divsend =  $(".discussion-send");
    $divsend.append("<textarea type='text' class='text-field' value=''></textarea>");
    $divsend.append("<button class='send'>Send</button>");    

    console.log("before draggine",idheader);
    //dragElement(document.getElementById(id),"discussion-popupheader","discussion-popupheader");
    
    $div.mousedown(handle_mousedown);
    //dragElement(document.getElementById(id),idheader,"discussion-popupheader");
  
    /*
    var position = $("#tooldiv").position();
    console.log("position",position);
    $div.css("top",(position.top + 20).toString() + "px");
   // console.log("position.left",positiontop + "px");
    var posLeft = (position.left + 60).toString();
    $div.css("left",posLeft + "px");
*/

    $(".discussion-send button.send").on("click",function(){
        var valuemsg =  $(this).parent().find(".text-field").val(); 
        if(valuemsg.length > 0){
            addMessageRight(current_discussion_id, valuemsg);
            console.log("send new message",valuemsg);
        }
    });

    $(".discussion-popup button.close").on("click",function(){
        restoreIconToOff("discussion");
        //hidePopupDiscussion(current_discussion_id);
        hideAllPopupDiscussion();
    });


    var position = $("#tooldiv").position();
    console.log("position",position);
    $div.css("top",(position.top + 20).toString() + "px");
    var posLeft = (position.left + 60).toString();
    $div.css("left",posLeft + "px");

}


function addMessageRight(discussionid, msg){
    var $main_div = $(".discussions #" + discussionid);
    var $div = $main_div.find(".discussion-intern");
    $div.append("<div class='discussion-message-right' name='" + current_profile + "'></div>");
    var $divmessage = $(".discussion-message-right").last();
    var html_code = "<div class='arrowDiv'><img class='discussion-arrow' src='imgs/icons/arrow_right.svg'></div><p class='message'>" + msg + "</p></div>";
    $divmessage.html(html_code);

    $main_div.find("textarea.text-field").val("");
    //console.log("add mesage", $main_div.html()); 
}

function updateMessageDirection(discussionid){
    var invertmsg = false;
    var $main_div = $(".discussions #" + discussionid);
    var $div = $main_div.find(".discussion-intern");

    $div.find(".discussion-message-right").each(function(){
        var name = $(this).attr('name');
        console.log("name",name);
        if(name != current_profile){
            invertmsg = true;
            console.log("invert message");
        }
        
        //$(this).css("class","temp");
    });

    if(invertmsg){
        $div.find(".discussion-message-right").each(function(){
            console.log("invert message");
            $(this).attr("class","temp");
        });

        $div.find(".discussion-message-left").each(function(){
            console.log("invert message");
            $(this).attr("class","discussion-message-right");
            $(this).find(".discussion-arrow").attr("src","imgs/icons/arrow_right.svg");
        });
    
        $div.find(".temp").each(function(){
            console.log("invert message");
            $(this).attr("class","discussion-message-left");
            $(this).find(".discussion-arrow").attr("src","imgs/icons/arrow_left.svg");
        });
    }

    

    //console.log("add mesage", $main_div.html()); 
}

function showPopupDiscussion(id){
    $div = $(".discussions").find("div[id=" + id + "]");
    updateMessageDirection(id);
    $div.find(".text-field").val("");

    if($("#tooldiv").is(':visible')){
        var position = $("#tooldiv").position();
        //console.log("position",position);
        $div.css("top",(position.top + 20).toString() + "px");
        var posLeft = (position.left + 60).toString();
        $div.css("left",posLeft + "px");
    }else{

        $div.css("top","30%");
        $div.css("left","45%");
    }

    
    $div.show();
    console.log("!!! After popup discussion ------------> HTML",$(".articlecontent").html());
}

function hideAllPopupDiscussion(){
    $(".discussions .discussion-popup").hide();
}

function hidePopupDiscussion(id){
    $div = $(".discussions").find("div[id=" + id + "]");
    $div.hide();
}

function showNewPopupDiscussion(keyname,state){
    console.log("show popup",keyname);
    console.log("state",state);
    // we first close all other popup discussion
    hideAllPopupDiscussion();
    
    var popup = $("#"+keyname+"-popup");
    console.log("popup",popup);
    if(popup != undefined){
       if(state == "on"){
            var id = wrapWithIconDiscussion("imgs/icons/discussion.svg");
            createPopupDiscussion(id);
            showPopupDiscussion(id);
            //popup.show();
       }else{
           //popup.hide();
           //hidePopupDiscussion(current_discussion_id);
           hideAllPopupDiscussion();
       }
    }
    console.log("!!! After popup discussion ------------> HTML",$(".articlecontent").html());
}

var no_text = true;
function wrapWithIconComment(path) {    
    console.log("wrap with icon comment");

    var selectedText = "";
    // if(window.getSelection().toString() != ""){
    //console.log("!!! TEXT has been selected");
    if(window.getSelection().rangeCount > 0){
        var selection= window.getSelection().getRangeAt(0);
        selectedText = selection.extractContents();

        var span= document.createElement("span");
        var id = comment_id_name + comment_id_counter;
        current_comment_id = id;
        //console.log("comment id",id);
        span.setAttribute('id',id);
        comment_id_counter++;
        span.style.backgroundColor = "#00dd2e";
        span.setAttribute("class","commentspan");
        var textNode = document.createTextNode(" [...] ");
        //if(!no_text) span.appendChild(selectedText);
        span.appendChild(selectedText);
        span.appendChild(textNode);

        //console.log("span",span.html);

        selection.insertNode(span);
    }

    /*
    if(!no_text) {
        selection.insertNode(span);
    }else {
        //var html_code = "<span class='commentspan' id='" + id + "' style='background-color:#00dd2e'>[...]</span>";
        var html_code = "<span class='commentspan'>[...]</span>";
  //var html_code = "<span class='commentspan' style='background-color:#00dd2e'>[...]</span>";
        document.execCommand("insertHTML",false,html_code);
        console.log("!!!------------> HTML",$(".articlecontent").html());
        //document.execCommand("insertHTML",false,"<span id='bla'>BLA</span>");
    }*/

    comment_id_counter++;

    

    // BUG: why doesn'it work outside of the function
    // add interaction when clicking on text commented
    
    $("span.commentspan").on("click", function(){
        //console.log("span content",$(this).html());
        var id = $(this).attr("id");
        var text = $(this).attr("value");
        //console.log("should open comment box",id,text);
        if(!toolbar_on){
            showToolbar();
        }
        showPopupCommWithValue("comment","on",text);
    });
    /*
    $("#bla").on("click",function(){
        console.log("BLAALKADBLAMBL");
    });*/
    
}


function showPopupComm(keyname,state) {
    var popup = $("#"+keyname+"-popup");
    console.log("showpopupComm",popup);
    if(popup != undefined){
       if(state == "on"){
            //wrapSelectedText();
            //selRange = saveSelection();
            wrapWithIconComment("imgs/icons/discussion.svg");
            $("#tooldiv #comment-popup .text-field").val("Enter your text here...");
            popup.show();
       }else{
           popup.hide();
       }
    }
}

function showPopupCommWithValue(keyname,state,value) {
    console.log("showpopupCommwithvalue");
    var popup = $("#"+keyname+"-popup"); 
    console.log("value before",value);
    $("#tooldiv #comment-popup .text-field").val(value);
    
    console.log("text",value);
    restoreIconToOn(keyname);
    popup.show();
  
}


function addSuggestionMessage(value, eltID){
    // TODO: TO retrieve from the users list
    var nickname = current_user.user;
    var nickname_portrait = current_user.img;
    console.log("--> add suggestion with eltID",eltID);
    var $div = $(".suggestions").find("div[eltID=" + eltID +"]");
    $div.append("<div class='message-area'></div>");
    $msg_div = $div.find(".message-area:last");
    $msg_div.append("<img src='" + nickname_portrait + "' class='nickname-portrait'>");
    $msg_div.append("<h1 class='nickname'>" + nickname + "</h1>");
    $msg_div.append("<p class='nicknametext'>" + value + "</p>");
    //var $div = $(".suggestions .suggestion-popup#testbidon");
    //var $div = $("#1");
    console.log("found div sug?",$div);
    console.log($div.html());

}

function createSuggestionPopup(articleId){
    var div = $(".suggestions .suggestion-popup:first");
    var newDiv = div.clone(true,true);//.prop({ id:'1'});
    newDiv.attr("eltID",articleId);
    console.log("article ID",articleId);
    newDiv.css('top',"100px");
    newDiv.css('left',"220px");
    $(".suggestions").append(newDiv);
    newDiv.mousedown(handle_mousedown);
    newDiv.show();
}

$(".suggestions .suggestion-popup .send").on("click",function(){
    var submit_value = $(this).parent().find(".text-field").val(); 
    $(this).parent().find(".text-field").val("Send"); 
    var suggestion_id = $(this).parent().parent().parent().attr("eltID");
   // console.log("id 2",suggestion_id);
    //console.log("create new part",submit_value,current_user,suggestion_id);
    addSuggestionMessage(submit_value,suggestion_id);
    showSuggestionsIcon(current_profile);
});

$(".suggestions .suggestion-popup .close").on("click",function(){
    $(".suggestions .suggestion-popup").hide();
});


function showSuggestion(articleId){
    $(".suggestions .suggestion-popup").hide();
    var div = $(".suggestions").find("div[eltID=" + articleId + "]");
    if(div.length == 0){
        console.log("should create new suggestion popup");
        createSuggestionPopup(articleId);
    }else{
        console.log("sugggestion popup already here");
        updateSuggestion(current_profile,articleId);
        div.show();
    }
}

function updateSuggestion(profile, articleId){
    var $div = $(".suggestions").find("div[eltID=" + articleId + "]");
    console.log("update sugggestion",profile);
    if(profile == "reader"){
        $div.attr("name","reader");
        $div.find(".suggestion-popupheader").attr("name","reader");
        $div.find(".send-area").show();
    } else{
        console.log("in here");
        $div.attr("name","nonreader");
        $div.find(".suggestion-popupheader").attr("name","nonreader");
        $div.find(".send-area").hide();
        console.log("div inhalt",$div.html());
    }
}

function showPopupColor(keyname,state){
    var popup = $("#"+keyname+"-popup");
    console.log("popup",popup);
    if(popup != undefined){
       if(state == "on"){
            wrapSelectedText();
            selRange = saveSelection();
            popup.show();
       }else{
           popup.hide();
       }
    }
}

function showPopupText(keyname,state){
    var popup = $("#"+keyname+"-popup");
    console.log("popup",popup);
    
    if(popup != undefined){
       if(state == "on"){
            popup.show();
       }else{
           popup.hide();
       }
    }
}

function showPopupAplus(keyname,state){
    var popup = $("#"+keyname+"-popup");
    console.log("popup",popup);
    if(popup != undefined){
       if(state == "on"){
            if(!text_has_been_selected){
                $("#tooldiv #Aplus-popup a").css("color","#FFFFFF");
            }
            //text_has_been_selected = false;
            popup.show();
       }else{
           popup.hide();
       }
    }
}

function showPopupline(keyname,state){
    var popup = $("#"+keyname+"-popup");
    console.log("popup",popup);
    if(popup != undefined){
       if(state == "on"){
            wrapSelectedText();
            selRange = saveSelection();
            popup.show();
       }else{
           popup.hide();
       }
    }
}

function showPopupCode(keyname,state){
    //TODO
    console.log("--->showpopup code");
    var popup = $("#"+keyname+"-popup");
    // reset the value:
    //popup.
    console.log("popup",popup);
    if(popup != undefined){
       if(state == "on"){
            wrapSelectedText();
            selRange = saveSelection();
            popup.show();
       }else{
           popup.hide();
       }
    }
}

function setToolState(keyname, state) {  
    var path;
    if(state == "off") {
        path = "imgs/icons/" + keyname + "_selected.svg";
        state = "on";
    }
    else{
        path = "imgs/icons/" + keyname + ".svg";
        state = "off";
    }
    $(this).attr("src",path);
    $(this).parent().attr("value",state);
}

function setToolbar(profile_id) {

    var that = this;

    if(profile_id == undefined) profile_id = "Author";

    var vals = [];
    vals = toolbars[profile_id].split(",");
    //console.log("--> value toolbar",vals);

    var $tool_div = $("#tooldiv");
    $("#tooldiv .tools").remove();
   
	$.each(vals, function(index, keyname) {
        // leave it out for now...
        if(keyname == "number_size"){
            // we shoudld init the value properly.. for now, just use 18
            var nb = 18;
            var state = "off";
            $tool_div.append("<div class=" + '"tools">' + '<p name="' + keyname + '">' + nb + ' "value="' + state +'" </p></div>');
        }else{
            var path = "imgs/icons/" + keyname + ".svg"
            var state = "off";
            $tool_div.append("<div class='tools' name='"+ keyname + "' value='" + state + "'><img class='icon' src='" + path + "' ></div>");
            
            var vals = toolbars_mapping[keyname];
            //console.log("testing",keyname,vals);
            
            if(toolbars_mapping[keyname] != undefined && toolbars_mapping[keyname].func.startsWith("showPopup")){ 
                var func = toolbars_mapping[keyname].func;
                //console.log("--> add popup for",keyname);
                if(keyname != "discussion" && keyname != "pen"){
                    var $tool_with_popup_div = $tool_div.find(".tools[name="+ keyname + "]");
                    $tool_with_popup_div.append("<div class='popup-tool' id='" + keyname + "-popup'></div>"); 
                    var $popup = $tool_with_popup_div.find(".popup-tool");
                    if(func == "showPopupline"){
                        $popup.append("<img class='arrow2' src='imgs/icons/arrow_green_popup.svg'>");
                    }else{
                        $popup.append("<img class='arrow' src='imgs/icons/arrow_green_popup.svg'>");
                    }

                    if(toolbars_mapping[keyname].func == "showPopupComm") {
                        $popup.append("<div id='comment-popupheader'><h1>Comment</h1></div>");
                        $popup.append("<div class='comment-send' id='comment-send'></div>");
                        $div = $popup.find("#comment-send");
                        $div.append("<textarea type='text' class='text-field' value=''>Enter your text here....</textarea>");
                        $div.append("<button class='send'>Send</button>");
                        //console.log("--->",$popup.html());
                    }
                    else if(toolbars_mapping[keyname].func == "showPopuplink") {
                        $popup.append("<label>Add URL:</label>");
                        $popup.append("<input type='text' class='text-field' value='http://'>");
                        $popup.append("<input type='submit' value='OK' class='btn-field'></div>");
                    }else if(toolbars_mapping[keyname].func == "showPopupColor"){
                        $popup.append("<label id='selectedcolorcode'>#FF0014</label>");
                        $popup.append("<div class='selectedcolor' id='selectedcolor' style='background-color: blue'></div>");
                        $popup.append("<div class='colors' id='colors'></div>");
                        var $colors = $popup.find("#colors");
                        //console.log("nb colors",colors.length);
                        for(c of colors){
                            $colors.append("<div class='color' value='" + c +  "' style='background-color:" + c + "'></div>");
                        }

                        if(colors.length > 0){
                            $("#tooldiv #color-popup #selectedcolorcode").text(colors[0]);
                            $("#tooldiv #color-popup #selectedcolor").css("background-color",colors[0]);
                        }                


                    }else if(toolbars_mapping[keyname].func == "showPopupText"){
                        $popup.append("<a href='#' value='serif'>Serif fonts</a>");
                        $popup.append("<a href='#' value='sansserif'>Sans-serif fonts</a>");
                        $popup.hide();
                    }else if(toolbars_mapping[keyname].func == "showPopupAplus"){
                        $popup.append("<a href='#' class='title1' value='H1'>Titre 1</a>");
                        $popup.append("<a href='#' class='para1' value='H4'>Paragraph 1</a>");
                        $popup.append("<a href='#' class='title2' value='H2'>Titre 2</a>");
                        $popup.append("<a href='#' class='para2' value='H5'>Paragraph 2</a>");
                        $popup.append("<a href='#' class='title3' value='H3'>Titre 3</a>");
                        $popup.append("<a href='#' class='para3' value='H6'>Paragraph 3</a>");
                        $popup.hide();
                    }else if(toolbars_mapping[keyname].func == "showPopupline"){                 
                        $popup.append("<input class='lineheight' type='text' value='12'></input>");
                        $popup.append("<h2>PT</h2><h2 class='selected'>PX</h2><h2>EM</h2>");
                        $popup.append("<input type='submit' value='OK' class='btn-field'>");
                    }else if(toolbars_mapping[keyname].func == "showPopupCode"){
                        $popup.append("<label>Add HTML code:</label>");
                        $popup.append("<textarea type='text' class='text-field' value='...'>...</textarea>");
                        $popup.append("<input type='submit' value='OK' class='btn-field'>");
                    }
                }
            }
        }
    });

//    $tool_div.append("<div id='tooldivfooter'></div>");
    //console.log($tool_div.html());

    $("#tooldiv #comment-popup .send").on("click",function(){
        var submit_value = $(this).parent().find(".text-field").val(); 
        var keyname = $(this).parent().parent().parent().attr("name");
        if(current_comment_id.length > 0){
            $div =  $(".articlecontent").find("span[id="+ current_comment_id + "]");//$("span#" + current_comment_id);
            if($div != undefined){
                $div.attr("value",submit_value);
            }
            //restore value of text ara
            //$("#tooldiv #comment-popup .text-field").val("Enter your text here...");
            // hide the popup
            setToolState(keyname,"off");
            showPopuplink(keyname,"off");
            restoreIconToOff(keyname);
        }
    });

    // CLOSE discussion pop-up
    $("#discussion-popup button.close").on("click",function(){
        //close the popup
        var keyname = "discussion";
        setToolState(keyname,"off");
        showPopuplink(keyname,"off");
        restoreIconToOff(keyname);
    });

    // RETRIEVE informations from DISCUSSION popup
    $("#discussion-popup div.discussion-send button.send").on("click",function(){
        var keyname = "discussion";
        var submit_value = $(this).parent().find(".text-field").val(); 
        console.log("--> DISCUSSION: send mesage to server:",submit_value);
        // hide the popup
        //setToolState(keyname,"off");
        //showPopuplink(keyname,"off");
        //restoreIconToOff(keyname);
    });

    // RETRIEVE informations from LINK popup
    $("#tooldiv #link-popup .btn-field").on("click",function(){
        // for now, we just bind to the same call....
        restoreSelection(selRange);
        saveSelection3();
        undoSelection();
        restoreSelection3();
        //document.getElementById("test").focus();
        console.log("current article id", current_article_id);
        if(current_article_id.length > 0){
            document.getElementById(current_article_id).focus();
            //document.execCommand("createLink",true,"www.google.com");
            var submit_value = $(this).parent().find(".text-field").val(); 
            var keyname = $(this).parent().parent().attr("name");
            that.applyToolFromPopup(keyname,submit_value);
        }
        console.log("HTML FINAL",$(".articlecontent").html());
        // hide the popup and reset default values
        $("#tooldiv #link-popup .text-field").val("http://");
        setToolState(keyname,"off");
        showPopuplink(keyname,"off");
        restoreIconToOff(keyname);
        //undoSelection();
    });

    // RETRIEVE informations from CODE HTML popup
    $("#tooldiv #code-popup .btn-field").on("click",function(){
        restoreSelection(selRange);
        saveSelection3();
        undoSelection();
        restoreSelection3();

        //if(current_article_id.length > 0){
        document.getElementById(current_article_id).focus();

        var submit_value = $(this).parent().find(".text-field").val(); 
        var keyname = $(this).parent().parent().attr("name");
        that.applyToolFromPopup(keyname,submit_value);
        // hide the popup and clear the value
        $(this).parent().find(".text-field").val("...");
        setToolState(keyname,"off");
        showPopuplink(keyname,"off");
        restoreIconToOff(keyname);
    });

    // RETRIEVE informations from LINE HEIGHT popup
    $("#tooldiv #line-popup .btn-field").on("click",function(){
        restoreSelection(selRange);
        saveSelection3();
        undoSelection();
        restoreSelection3();

        //if(current,,)
        document.getElementById(current_article_id).focus();

        var submit_value = $(this).parent().find(".lineheight").val(); 
        var keyname = $(this).parent().parent().attr("name");
        that.applyToolFromPopup(keyname,submit_value);
        // hide the popup
        setToolState(keyname,"off");
        showPopuplink(keyname,"off");
        restoreIconToOff(keyname);
    });

    // RETRIEVE informations from FONT TYPE popup
    $("#tooldiv #text-popup a").on("click",function(){
        console.log("this",$(this));
        var submit_value = $(this).attr("value"); 
        var keyname = $(this).parent().parent().attr("name");
        that.applyToolFromPopup(keyname,submit_value);
        // hide the popup
        setToolState(keyname,"off");
        showPopuplink(keyname,"off");
        restoreIconToOff(keyname);
        $("#tooldiv #text-popup").find("a[value='serif']").css("color","#FFFFFF");
        $("#tooldiv #text-popup").find("a[value='sansserif']").css("color","#FFFFFF");
    });

    // RETRIEVE informations from FONT SIZE popup
    $("#tooldiv #Aplus-popup a").on("click",function(){
        var submit_value = $(this).attr("value"); 
        var keyname = $(this).parent().parent().attr("name");
        that.applyToolFromPopup(keyname,submit_value);
        setToolState(keyname,"off");
        showPopuplink(keyname,"off");
        restoreIconToOff(keyname);
        for(f of fontsize){
            $("#tooldiv #Aplus-popup").find("a[value=" + f + "]").css("color","#FFFFFF");
        }
    });

    // RETRIEVE informations from COLOR popup
    $("#tooldiv #color-popup .color").on("click",function(){
        restoreSelection(selRange);
        saveSelection3();
        undoSelection();
        restoreSelection3();

        document.getElementById(current_article_id).focus();

        var submit_value = $(this).attr("value"); 
        var keyname = $(this).parent().parent().parent().attr("name");
        $("#tooldiv #color-popup #selectedcolorcode").text(submit_value);
        $("#tooldiv #color-popup #selectedcolor").css("background-color",submit_value);
        that.applyToolFromPopup(keyname,submit_value);
        setTimeout(function() {
            setToolState(keyname,"off");
            showPopuplink(keyname,"off");
            restoreIconToOff(keyname);
        }, 200);
    });

    $("#tooldiv .tools" ).hover( 
        function() {
            var keyname = $(this).attr("name");
            if($(this).attr("value") == "off"){ // mmm... use checkbox or button instead, no?
                var path = "imgs/icons/" + keyname + "_hover.svg";
                $(this).find("img.icon").attr("src",path);
            }
    },  function() {
        var keyname = $(this).attr("name");
        if($(this).attr("value") == "off"){
            var path = "imgs/icons/" + keyname + ".svg";
            $(this).find("img.icon").attr("src",path);
        }
    });

    // TODO... moved onclick from div to img because of the popup ---> clean the .parent() and etc...
    $("#tooldiv .tools img.icon" ).on("click", function(){
        
        var keyname = $(this).parent().attr("name");
        console.log("--> tools keyname",keyname,"has been selected");
        var state = $(this).parent().attr("value");
        var path;
        if(state == "off") {
            path = "imgs/icons/" + keyname + "_selected.svg";
            state = "on";
        }
        else{
            path = "imgs/icons/" + keyname + ".svg";
            state = "off";
        }

        // we call the appropriate function.. either it is a pop-up or a direct exec-command
        // special case for the link...
        if(keyname == "link" && link_active){
            document.execCommand("unlink",false,false);
            link_active = false;
        }else{
            var vals = toolbars_mapping[keyname];
            that[vals.func](keyname,state);
        }
        

        $(this).attr("src",path);
        $(this).parent().attr("value",state);
        // small trick to make it active 200ms
        if(donotkeepselected.includes(keyname)){
            setTimeout(function() {restoreIconToOff(keyname)}, 200);
        }
        
    });

    /*
    $( "#tooldiv .tools img.icon" ).on("click", function(){
        var keyname = $(this).parent().attr("name");
        var vals = toolbars_mapping[keyname];
        //that[vals.func](vals);
        that[vals.func](keyname);
    });*/
    
} // END OF setToolbar



function restoreIconToOff(keyname){
    var path = "imgs/icons/" + keyname + ".svg";
    var state = "off";
    $("#tooldiv").find('div[name=' + keyname + ']').find("img.icon").attr("src",path);
    $("#tooldiv").find('div[name=' + keyname + ']').attr("value",state);
}

function restoreIconToOn(keyname){
    var path = "imgs/icons/" + keyname + "_selected.svg";
    var state = "on";
    $("#tooldiv").find('div[name=' + keyname + ']').find("img.icon").attr("src",path);
    $("#tooldiv").find('div[name=' + keyname + ']').attr("value",state);
}

// probably we won't use this function for other keyname, so leave Aplus for now
function restoreElemInIconToOn(tag){
    //unselect first other elements
    $("#tooldiv #Aplus-popup a").css("color","#FFFFFF");
    console.log("tag",tag);
    //select element
    $("#tooldiv #Aplus-popup").find("a[value=" + tag + "]").css("color","#087208");
}

function restoreElemFontInIconToOn(type){
    //unselect first other elements
    $("#tooldiv #text-popup a").css("color","#FFFFFF");
    // select element
    $("#tooldiv #text-popup").find("a[value=" + type + "]").css("color","#087208");
}

function restoreElemColorInIconToOn(color){
 //   $("#tooldiv #text-popup").find("a[value=" + font_type + "]").css("color","#087208");
    $("#tooldiv #color-popup #selectedcolorcode").text(color);
    $("#tooldiv #color-popup #selectedcolor").css("background-color",color);
}

function showToolbar() {
    var $tool_div = $("#tooldiv");
    $tool_div.show();
}

function hideToolbar() {
    var $tool_div = $("#tooldiv");
    $tool_div.hide();
}


//Make the DIV element draggagle:
dragElement(document.getElementById("tooldiv"),"tooldivheader","tooldiv-header");

function handle_mousedown(e){
    window.my_dragging = {};
    my_dragging.pageX0 = e.pageX;
    my_dragging.pageY0 = e.pageY;
    my_dragging.elem = this;
    my_dragging.offset0 = $(this).offset();
    function handle_dragging(e){
        var left = my_dragging.offset0.left + (e.pageX - my_dragging.pageX0);
        var top = my_dragging.offset0.top + (e.pageY - my_dragging.pageY0);
        $(my_dragging.elem)
        .offset({top: top, left: left});
    }
    function handle_mouseup(e){
        $('body')
        .off('mousemove', handle_dragging)
        .off('mouseup', handle_mouseup);
    }
    $('body')
    .on('mouseup', handle_mouseup)
    .on('mousemove', handle_dragging);
}


function dragElement2(eltID,idheader) {
    //if(elmnt == null) return;
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    //console.log("suggestions:",$(".suggestions").html());
    console.log("idheader",idheader);
    var div = $("div").find("[eltID = " + eltID + "]");
    var divheader = div.find("div[id=suggestion-popupheader]");
    divheader.mousedown( function() {
        dragMouseDown;
    });

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
     }
}


// just use for the tooldiv in the end.. other function used for the other movable div..
function dragElement(elmnt,idnameheader,keyword) {

    //console.log("drag element", elmnt);
    if(elmnt == null) return;
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

   if (document.getElementById(idnameheader)) {
      document.getElementById("tooldivheader").onmousedown = dragMouseDown;
   } else{
       console.log("no header found");
   }/*else {
        console.log("b--------------");
      /* otherwise, move the DIV from anywhere inside the DIV:*/
       //elmnt.onmousedown = dragMouseDown;
    //}
/*
    if (document.getElementById(elmnt.id + "footer")) {
        document.getElementById(elmnt.id + "footer").onmousedown = dragMouseDown;
      } else {
        elmnt.onmousedown = dragMouseDown;
      }*/
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
    
    if(keyword == "tooldiv-header"){
        elmnt.style.top = "50px";
        elmnt.style.left =  "480px";
    }
    /*else if(keyword == "discussion-popupheader"){
        var position = $("#tooldiv").position();
        elmnt.style.top = position.top ;//"35%";
        elmnt.style.left =  position.left + 20;//"20%";  

    }else if(keyword == "suggestion"){
        elmnt.style.top = "50px";
        elmnt.style.left =  "480px";
    }*/

}


function removeDiscussions() {
    console.log("--> removing suggestions from articlecontent");
    $(".articlecontent img.discussion").remove();
    //console.log($(".articlecontent").html());
}

function removeComments() {
    console.log("--> removing comments from articlecontent");
    $(".articlecontent span.commentspan").css("backgroundColor","#FFFFFF");
    $(".articlecontent span.commentspan").removeClass("commentspan");
    var str = $('.articlecontent').html().replace(/ \[...\] /g, '');
    $(".articlecontent").html(str);
}


function bidou() {
    console.log("bidou");
    console.log("SHOW CODE:");
    console.log($(".articlecontent").html());
}

function bidou3() {
    removeComments()
   
}


function bidou2() {
    console.log("bidou2");

    $(".articlecontent span.commentspan").css("backgroundColor","#FFFFFF");
    $(".articlecontent span.commentspan").removeClass("commentspan");
    //$(':contains("[...]")').each(function(){
      //  $(this).html($(this).html().split("[...]").join(""));
    //});

    //var str = $('.articlecontent').html().replace(/[...]/g, '');
    var str = $('.articlecontent').html().replace(' [...] ', '');
    console.log("str",str);
    $(".articlecontent").html(str);
    //var $div = $(".articles");
    // $(".articlecontent").parseHTML(str);
    //$div.parseHTML(str);
    //$(".articles").parseHTML(str);
   // $('.articlecontent').

    //var html_code = $(".articlecontent").html_code.toString();
    //html_code.replace(" [...] ","");
    //console.log("new html",html_code);
    //$(".articlecontent").removeData("[...]");
    
   // console.log("AHAHHAHA",$(".articlecontent").find("span.commentspan"));
    //var $removed_elems = $(".articlecontent span.commentspan").detach();
    //console.log("removedd elemes",$removed_elems);
   // $(".articlecontent span.commentspan").each(function(node){
     //   if(node != undefined){
       //     console.log("not undefined", node);
            //node.detach();
            /*if (node.nodeType == 1 &&
                    tagNamesArray.indexOf(node.tagName.toLowerCase()) > -1) {
                // Remove the node and replace it with its children
                replaceWithOwnChildren(node);
            }*/

   //     }
    //




    //$(".articles").detach();

    console.log("!!!!!!!!!!!!!!!!!!! END");
    console.log("SHOW CODE:");
    console.log($(".articlecontent").html());
}



//document.execCommand('hiliteColor', false, 'yellow')
//document.designMode = 'on';




