/*
$('#article').mouseup(function() {
    console.log("mouse up");
    var currentNode = getSelectedNode();
    var div = $("#article a");
    console.log("div",div);
    if(div != undefined){
        console.log("should highlight the link button");
        document.execCommand("unlink",false,false);
    }else{
        console.log("there is no link");
    }
    //var text=getSelectedText();
    //if (text!='') alert(text);
});*/

/*
function getSelectedText() {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
    return '';
}​*/

function wrapSelectedText() {    
    console.log("wrap selected text");   
    var selection= window.getSelection().getRangeAt(0);
    var selectedText = selection.extractContents();
    console.log("selected text !!!!",selectedText);
    var span= document.createElement("span");
    span.setAttribute('id','articlespan0');
    //span.style.backgroundColor = "#00dd2e";
    
    span.style.backgroundColor = "#FF0000";
    span.appendChild(selectedText);
    selection.insertNode(span);
}

function saveSelection() {
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
}

function restoreSelection(range) {
    if (range) {
        if (window.getSelection) {
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (document.selection && range.select) {
            range.select();
        }
    }
}


function restoreSelection2(range2) {
    if (range2) {
        if (window.getSelection) {
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range2);
        } else if (document.selection && range2.select) {
            range2.select();
        }
    }
}

function insertTextAtCursor(text) {
    var sel, range, html;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            var textNode = document.createTextNode(text);
            range.insertNode(textNode);
            sel.removeAllRanges();
            range = range.cloneRange();
            range.selectNode(textNode);
            range.collapse(false);
            sel.addRange(range);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.pasteHTML(text);
        range.select();
    }
}

var selRange;

function displayTextInserter() {
    wrapSelectedText();
    selRange = saveSelection();
    //document.getElementById("textInserter").style.display = "block";
    //document.getElementById("textToInsert").focus();
}
 
function removeLink3(){
    selRange2 = saveSelection();
    console.log("selrange2",selRange2);
    console.log("selrange2",selRange2.toString);

}


function insertText() {
    var text = document.getElementById("textToInsert").value;
    
   // document.getElementById("textInserter").style.display = "none";
    restoreSelection(selRange);

    //document.getElementById("test").focus();
    
    //insertTextAtCursor(text);
    //restoreSelection(selRange);
    saveSelection3();
    undoSelection();
    restoreSelection3();
    
    document.getElementById("test").focus();
    document.execCommand("createLink",true,"www.google.com");
    
    console.log("HTML FINAL",$(".article").html());
    //insertTextAtCursor(text);
}

function getSelectionParentElement() {
    var parentEl = null, sel;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            parentEl = sel.getRangeAt(0).commonAncestorContainer;
            if (parentEl.nodeType != 1) {
                parentEl = parentEl.parentNode;
                /*if(parentEl.type == "a"){
                    console.log("found");
                }else{
                    var p = parentEl.commonAncestorContainer;
                    if(p.type == "a"){
                        console.log("second...");
                    }
                }*/
            }
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        parentEl = sel.createRange().parentElement();
    }
    return parentEl;
}




function getSelectedNode()
{
    if (document.selection)
        return document.selection.createRange().parentElement();
    else
    {
        var selection = window.getSelection();
        //console.log("tt",selection);
        console.log("tt",selection.toString());
       // var htmlcode = eval(selection.toString());
        if (selection.rangeCount > 0){
            //console.log("a",selection.getRangeAt(0));
            return selection.getRangeAt(0).startContainer.parentNode;
        }
    }
}
/*
$('#article').mouseup(function() {
    console.log("mouse up");
    var currentNode = getSelectedNode();
    var div = $("#article a");
    console.log("div",div);
    if(div != undefined){
        console.log("should highlight the link button");
        document.execCommand("unlink",false,false);
    }else{
        console.log("there is no link");
    }
    //var text=getSelectedText();
    //if (text!='') alert(text);
});*/

/*
$('#article').mouseup(function() {
    console.log("mouse up");


    console.log("last try:", window.getSelection().type);

    return;

    var selection = window.getSelection();
    var text1 = selection.toString();
    console.log("text1",text1);


    var e = document.createElement('div');
    e.setAttribute('style', 'display: none;');
    e.setAttribute('id','temporarydiv');
    e.innerHTML = text1;
    document.body.appendChild(e);
    console.log("TEMP DIV: ",$("#temporarydiv").innerHTML());

    var div = $("#temporarydiv").find("b");
    if(typeof div === 'undefined'){
        console.log("no b tag");
    }else{
        console.log("b tag found");
    }

    document.body.removeChild(e);

/*
    if(text1 == text2){
        
    }
    


    //var elem2 = getSelectionParentElement();
    //console.log("elem2",elem2);

    var text2 = eval(elem2).textContent;
    console.log("text2 !!!!!!!",text2);

    var text3 = elem2.textContent;
    console.log("text3",text3);


    if(text1 == text2){


       // var htmlContent = "<img>ldafljaflj<b>dsfs</b>"; // a response via AJAX containing HTML
        var e = document.createElement('div');
        e.setAttribute('style', 'display: none;');
        e.setAttribute('id','temporarydiv');
        e.innerHTML = text3;
        document.body.appendChild(e);
        
        console.log("we do something!");
        console.log(e.toString());
        
        //var htmlConvertedIntoDom = e.lastChild.childNodes; // the HTML converted into a DOM element :), now let's remove the
        
        var div = $("#temporarydiv").find("b");
        if(typeof div === 'undefined'){
            console.log("no b tag");
        }else{
            console.log("b tag found");
        }
        
        
        document.body.removeChild(e);
    }else {
        console.log("we don't do anything");
    }
*/

//});


$('#article').mouseup(function() {
    console.log("mouse up");

    var selection = window.getSelection();
    var text1 = selection.toString();
    console.log("text1",text1);
    
    var elem2 = getSelectionParentElement();
    console.log("elem2",elem2);

    var text2 = eval(elem2).textContent;
    console.log("text2",text2);

    var text3 = elem2.textContent;
    console.log("text3",text3);


    if(text1 == text2){


       // var htmlContent = "<img>ldafljaflj<b>dsfs</b>"; // a response via AJAX containing HTML
        var e = document.createElement('div');
        e.setAttribute('style', 'display: none;');
        e.setAttribute('id','temporarydiv');
        e.innerHTML = text3;
        document.body.appendChild(e);
        
        console.log("we do something!");
        console.log(e.toString());
        
        //var htmlConvertedIntoDom = e.lastChild.childNodes; // the HTML converted into a DOM element :), now let's remove the
        
        var div = $("#temporarydiv").find("b");
        if(typeof div === 'undefined'){
            console.log("no b tag");
        }else{
            console.log("b tag found");
        }
        
        
        document.body.removeChild(e);
    }else {
        console.log("we don't do anything");
    }

/*
        console.log("we can check for whatever div");
        var $tempDiv = document.createElement('div');
        $tempDiv.appendChild(text3.toString());
        //$tempDiv.innerHTML = text2;

        var div = $tempDiv.find("b");
        if(typeof div === 'undefined'){
            console.log("no b tag");
        }else{
            console.log("b tag found");
        }
        console.log("div",div);
        //document.execCommand("unlink",false,false);
    }else{
        console.log("we don't do anything");
    }*/

});



function removeLink2(){

    var selection = window.getSelection();
    var text1 = selection.toString();
    console.log("tt",selection.toString());

    var elem = getSelectedNode();
    console.log("elem",elem.toString());

    var elem2 = getSelectionParentElement();
    console.log("elem2",elem2);

    var text2 = eval(elem2).textContent;
    console.log("text2",text2);
    if(text1 == text2){
        console.log("we can check for whatever div");
        document.execCommand("unlink",false,false);
    }else{
        console.log("we don't do anything");
    }

/*
    console.log("HTML BEFORE remove link",$(".article").html());

    var selection = window.getSelection().type;
    //console.log("DOM",selection);


    var r = window.getSelection().getRangeAt(0);
    console.log("r",r.toString());
    var t = r.getBoundingClientRect();
    console.log("r",r.getBoundingClientRect());

    console.log

    console.log("r",r.html);

    var currentNode = getSelectedNode();
    console.log("current node",currentNode);
    var div = eval(currentNode).hide();//$("#article a");
    
    if(typeof div === 'undefined'){
        console.log("nnn");
    }
    console.log("HTML AFTER",$(".article").html());
    */
}

function removeLink(){

    //var parentEl = null, sel;
    //parentEl = window.getSelection().getRangeAt(0).parentElement();
    //console.log("test",getSelectionParentElement());



    var divhtml = $("#articlespan0 a");
    if(divhtml != undefined){
        console.log("link is here");
    }else{
        console.log("link is not here");
    }

    var p = window.getSelection().getRangeAt(0).startContainer.parentNode;
    console.log("p",p.toString());
    console.log("p");
    console.log("pp",window.getSelection().getRangeAt(0).startContainer);
    console.log(window.getSelection().toString);

    console.log("oooo",getSelectedNode());

    

/*
    console.log("HTML BEFORE remove link",$(".article").html());
    document.execCommand("unlink",false,false);
    console.log("HTML AFTER remove link",$(".article").html());
/*
    console.log("HTML BEFORE",$(".article").html());

    var parentEl = null, sel;
    parentEl = sel.getRangeAt(0).commonAncestorContainer;
    console.log(parentEl);


    window.getSelection().getRangeAt(0).parentElement.remove();
    console.log("HTML AFTER",$(".article").html());
    */
}

function undoSelection2(){
    console.log("HTML BEFORE SPAN",$(".article").html());
    $('#articlespan0').contents().unwrap();
    console.log("HTML AFTER SPAN",$(".article").html());
}

function undoSelection() {   

    console.log("HTML BEFORE",$(".article").html());
    //var saveHtml = $("#articlespan0").html();
    $("#articlespan0").css("background-color","rgb(0,0,0,0)");
   // insertTextAtCursor(saveHtml);
    console.log("HTML AFTER",$(".article").html());
    
/*
    var selection= window.getSelection().getRangeAt(0);
    //selection.undoSelection();
    var selectedText = selection.extractContents();
    console.log("sel",selectedText.toString());
    //selection.removeProperty("background-color");
    //selectedText.style.removeProperty("background-color");
    var span= document.createElement("span");

    //span.style.backgroundColor = "#00dd2e";
    span.style.backgroundColor = "#FF00FF";
   // span.style.removeProperty("background-color");;
    span.appendChild(selectedText);
    selection.insertNode(span);*/
}

function saveSelection3() {
    if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
}

function restoreSelection3(range) {
    if (range) {
        if (window.getSelection) {
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (document.selection && range.select) {
            range.select();
        }
    }
}

