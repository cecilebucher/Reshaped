
var content_1 = "<div class='container'>\n<div class='item-1-1'>\n<h1>Design and Science of the Holobiont</h1>\n</div>" 
+ "<div class='item-2-1'>\n<p class='text'>In 1991, after a lifetime of biological research, the scientist \nLynn Margulis published Symbiosis as a Source of Evolutionary Innovation . Much of Margulis’ work focused on the principle of symbiosis, which she proposed emerges when individuals from one species engage with individuals from another species, over a sufficient period of time. Rather than centering biology around the premise of individual organisms, her work focused on their interaction in emergent, mutualistic systems.</p>"
+ "<p draggable='true' class='text'>In Margulis’ formulation, each individual species in the system (e.g. you, or the lactobacillus  in your gut) is a “biont,” and she coined the phrase “holobiont” to describe the association formed when bionts from different species engage with one another over their lifetimes. Margulis’ first use of holobiont referred to coral/zooxanthellae symbiosis, wherein the zooxanthellae live in coral cells and provide nutrients to the coral for as long as it lives. Take away the coral biont, and the zooxanthellae perish. Take away the zooxanthellae bionts (which, sadly, is happening) and the coral dies quickly. Margulis recognized that we needed a new word and a new framework to understand and describe organisms as systems, rather than as individuals.</p></div>"
+ "<div class='item-2-2'><img src='imgs/holobiont.jpg'></div>"   
+ "<div class='item-2-3'><p class='ref'>1. Margulis, L., & Fester, R. (1991). Symbiosis as a source of evolutionary innovation: speciation andmorphogenesis. Mit Press.</p>" 
+ "<p class='ref'>2. Margulis, L. (1970). Origin of Eukaryotic Cells: Evidence and Research Implications for a Theory of the Origin and Evolution of Microbial, Plant, and Animal Cells on the Precambrian Earth. Yale University Press. Retrieved from https://books.google.com/books?id=mrBzQgAACAAJ</p></div></div>";


var current_article_id = "article0";

function update()
{
    console.log("update FROM EDITOR");
    //console.log(editor.getValue());
    //console.log("current_article_id",current_article_id);
    var $doc = $("#" + current_article_id);
    $doc.html(editor.getValue());

    $(".articlecontent").html(editor.getValue());

    //console.log("!!!",$(".articles").html());

    //var idoc = document.getElementById(current_article_id).contentWindow.document;
    //var div = document.getElementById("bla");
    //console.log("div",div);
    
    //var idoc = document.getElementById('iframe').contentWindow.document;
    //document.getElementById("bla").innerHTML(editor.getValue());
    //div.innerHTML("vlkjalvja");

    
	//var idoc = div.contentWindow.document;
    /*
	idoc.open();
	idoc.write(editor.getValue());
    idoc.close();
    */
    
}

function setupArticle() {
   // var doc = $("#" + current_article_id);
    document.getElementById(current_article_id).addEventListener("input",function(){
        console.log("update FROM ARTICLE");
        var value = $("#"+current_article_id).html();
        console.log("value",value);
        window.editor.setValue(value,1);
    }, false);

}

function insertArticle(html_content){
    editor.setValue(html_content,1); // 1 -> moves cursor to the start // -1 -> moves cursor to the end
}

function setupEditor()
{

    //var textarea = $('#content');


    console.log("setting editor");
    window.editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/html");
    //editor.vScrollBarAlwaysVisible(true);
    //editor.setValue("<div></div>",1);
    //editor.setValue(content_1,1);

    editor.getSession().on('change', function() {
        update();
    });

    editor.focus();
    
    editor.setOptions({
        fontSize: "10pt",
        showLineNumbers: false,
        showGutter: false,
        vScrollBarAlwaysVisible:true,
        //enableBasicAutocompletion: false, enableLiveAutocompletion: false
    });

    editor.setShowPrintMargin(false);
    editor.setBehavioursEnabled(false);

    //editor.resize();
}

function setupEditor2() {
    var textarea = $('#content');

    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/twilight");
    editor.getSession().setMode("ace/mode/javascript");

    editor.getSession().on('change', function () {
        textarea.val(editor.getSession().getValue());
    });

    textarea.val(editor.getSession().getValue());

    $("#toggletextarea-btn").on('click', function () {
        textarea.toggle();
        $(this).text(function (i, text) {
            return text === "Show Content" ? "Hide Content" : "Show Content";
        });
    });

    $("#alertcontent-btn").on('click', function () {
        alert(textarea.val());
    });
}

//setupEditor();
//setupArticle();
//update();

//alert("coucou");