
var span_counter = 0;

var selectedElement = null;

var text_has_been_selected = false;

function singleline() {
    document.execCommand('formatblock', false, 'p');
    var selectedNodes = [];
    /*var sel = range.getSelection();
    for (var i = 0; i < sel.rangeCount; i++) {
        selectedNodes = selectedNodes.concat(sel.getRangeAt(i).getNodes());
        $(selectedNodes).css("height", "20px");       
    }*/
    selectedElement = window.getSelection().focusNode.parentNode;
    $(selectedElement).css("height", "20px");              
}

function nextNode(node) {
    if (node.hasChildNodes()) {
        return node.firstChild;
    } else {
        while (node && !node.nextSibling) {
            node = node.parentNode;
        }
        if (!node) {
            return null;
        }
        return node.nextSibling;
    }
}

function getRangeSelectedNodes(range, includePartiallySelectedContainers) {
    var node = range.startContainer;
    var endNode = range.endContainer;
    var rangeNodes = [];

    // Special case for a range that is contained within a single node
    if (node == endNode) {
        rangeNodes = [node];
    } else {
        // Iterate nodes until we hit the end container
        while (node && node != endNode) {
            rangeNodes.push( node = nextNode(node) );
        }

        // Add partially selected nodes at the start of the range
        node = range.startContainer;
        while (node && node != range.commonAncestorContainer) {
            rangeNodes.unshift(node);
            node = node.parentNode;
        }
    }

    // Add ancestors of the range container, if required
    if (includePartiallySelectedContainers) {
        node = range.commonAncestorContainer;
        while (node) {
            rangeNodes.push(node);
            node = node.parentNode;
        }
    }

    return rangeNodes;
}

function getSelectedNodes() {
    var nodes = [];
    if (window.getSelection) {
        var sel = window.getSelection();
        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
            nodes.push.apply(nodes, getRangeSelectedNodes(sel.getRangeAt(i), true));
        }
    }
    return nodes;
}

function replaceWithOwnChildren(el) {
    if(el != null && el != undefined){
        var parent = el.parentNode;
        if(parent != null && parent != undefined){
            while (el.hasChildNodes()) {
                parent.insertBefore(el.firstChild, el);
            }
            parent.removeChild(el);
        }
    }
}

function removeSelectedElements(tagNames) {
    var tagNamesArray = tagNames.toLowerCase().split(",");
    getSelectedNodes().forEach(function(node) {
        if(node != undefined){
            console.log("node",node.na);
            if (node.nodeType == 1 &&
                    tagNamesArray.indexOf(node.tagName.toLowerCase()) > -1) {
                // Remove the node and replace it with its children
                replaceWithOwnChildren(node);
            }

        }
    });
}

function removeSelectedElementsFromNode(nodeName,tagNames) {
    //var tagNamesArray = tagNames.toLowerCase().split(",");
   // nodeName.forEach(function(node){
    //var div = $("#article");
    //var children = div.children();
    console.log("!!!!!!!!!!!!!!!!!!! BEGIN");
    /*
    console.log(tagNames);
    console.log("div",$("#article"));
    var children = $("#article").children;
    console.log("childnodes",children.length);

    for(node in children){
        console.log("node:",children[node]);
    //}
*/

    //children.forEach(function(node){
    //getSelectedNodes().forEach(function(node) {
    console.log("AHAHHAHA",$(".articlecontent").find("span[id=articlespan0]"));
    $(".articlecontent").find("span[id=articlespan0]").each(function(node){
        if(node != undefined){
            console.log("not undefined", node.nodeType,node.nodeName);
            if (node.nodeType == 1 &&
                    tagNamesArray.indexOf(node.tagName.toLowerCase()) > -1) {
                // Remove the node and replace it with its children
                replaceWithOwnChildren(node);
            }

        }
    });
    console.log("!!!!!!!!!!!!!!!!!!! END");
}



borto = {
    tmpEl: document.createElement('div'),
    /* create element like in jquery with string <tag attribute1 attribute2 /> or <tag attribute1></tag> */
    htmlToDom: function(htmlEl){
        borto.tmpEl.innerHTML = htmlEl;
        return borto.tmpEl.children[0]
    },
    wrapSelection: function(htmlEl){
        var sel = window.getSelection();
        // In firefox we can select multiple area, so they are multiple range
        for(var i = sel.rangeCount;i--;){
            var wrapper = borto.htmlToDom(htmlEl)
            var range = sel.getRangeAt(i);
            wrapper.appendChild(range.extractContents());
            range.insertNode(wrapper);
        }
    }
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

function saveSelection3() {
    if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount > 0) {
            return sel.getRangeAt(0);
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }  
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

function wrapSelectedText() {    
    console.log("wrap selected text");   
    if(window.getSelection().toString() != "" && window.getSelection().rangeCount > 0){
        var selection= window.getSelection().getRangeAt(0);
        var selectedText = selection.extractContents();
        //console.log("selected text !!!!",selectedText);
        var span= document.createElement("span");
    //  span.setAttribute('id','articlespan'+ span_counter);
        span.setAttribute('id','articlespan0');
        span_counter++;
        span.style.backgroundColor = "#00dd2e";
        //span.style.backgroundColor = "#FF0000";
        span.appendChild(selectedText);
        selection.insertNode(span);
    }
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

function undoSelection() {   
    console.log("HTML BEFORE",$(".articlecontent").html());
    $("#articlespan0").css("background-color","rgb(0,0,0,0)");
    // TODO TODO TOD TODO TODO
    removeSelectedElementsFromNode($("#articlespan0"),["span"]);
    console.log("HTML AFTER",$(".articlecontent").html());
}

function getSelectionParentElement() {
    var parentEl = null, sel;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            parentEl = sel.getRangeAt(0).commonAncestorContainer;
            par = sel.getRangeAt(0).startContainer;
            //console.log("PAR",par);
            if (parentEl.nodeType != 1) {
                parentEl = parentEl.parentNode;
            }
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        parentEl = sel.createRange().parentElement();
    }
    //console.log("parentEL",parentEl.value);
    //console.log("parentEL",parentEl.nodeName);
    return parentEl;
}

function getTag(){
    var node = getSelectionParentElement();
    if(node != null){
        var tag = node.nodeName;
        return tag;
    }
    return undefined;
}

//$('#article').mouseup(function() {
$('.articles').dblclick(function() {
    
    console.log("BEGIN ------------mouse up");
    var node = getSelectionParentElement();
    var tag = node.nodeName;
    console.log("node",node);
    console.log("node",node.toString());
    //console.log("node",node.a;
    console.log("tagname",tag);
    if(tag == "B"){
        restoreIconToOn("bold");
    }else if(tag == "I"){
        restoreIconToOn("italic");
    }else if(tag == "A"){
        link_active = true;
        restoreIconToOn("link");
    }else if(tag == "U"){
        restoreIconToOn("underlined");
    }else if(fontsize.includes(tag)){
        console.log("yes it is a fontsize tag");
        text_has_been_selected = true;
        restoreElemInIconToOn(tag);
    }else if(tag == "SUP"){
        restoreIconToOn("x2");
    }else if(tag == "SUB"){
        restoreIconToOn("x2bis");
    }else if(tag == "FONT"){
        var val_color = node.getAttribute("color");
        var val_font = node.getAttribute("face");
        // FOR now... too lazy
        var type = "";
        if(val_font == "verdana") type = "sansserif";
        else if (val_font == "Times") type = "serif";
        console.log("values",val_color,val_font);
        if(type.length > 0) restoreElemFontInIconToOn(type);
        if(val_color.length > 0) restoreElemColorInIconToOn(val_color);
    }

    console.log("END ------------mouse up");

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

}


function getNextNode(node)
{
    if (node.firstChild)
        return node.firstChild;
    while (node)
    {
        if (node.nextSibling)
            return node.nextSibling;
        node = node.parentNode;
    }
}

function getNodesInRange(range)
{
    var start = range.startContainer;
    var end = range.endContainer;
    var commonAncestor = range.commonAncestorContainer;
    var nodes = [];
    var node;

    // walk parent nodes from start to common ancestor
    for (node = start.parentNode; node; node = node.parentNode)
    {
        nodes.push(node);
        if (node == commonAncestor)
            break;
    }
    nodes.reverse();

    // walk children and siblings from start until end is found
    for (node = start; node; node = getNextNode(node))
    {
        nodes.push(node);
        if (node == end)
            break;
    }

    console.log("nodes:",nodes);

    return nodes;
}
