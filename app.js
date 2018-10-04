var db_files = require('./app_DB.js');
var http = require('http');
var fs = require('fs');

var express = require('express');

var app = express();
var server = require('http').createServer(app); 
// Chargement de socket.io
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', function (req, res) {
    //res.sendfile(__dirname + '/public/views/index.ejs');
    res.render(__dirname + '/public/views/index.ejs',{vartest: "variable"});

});


var content_2 = "<div class='article2'><h2>Ten Principles for Good Design</h2>"
                + "<h3>1</h3><p>The possibilities for innovation are not, by any means, exhausted. Technological development is always offering new opportunities for innovative design. But innovative design always develops in tandem with innovative technology, and can never be an end in itself.</p> "
                + "<img src='imgs/article/img3.jpg'>"
                + "</div>";
var content_2 = "<div class='article2'><div class='itemTest-1'><h2>Ten Principles for Good Design</h2></div>"
+ "<div class='item-2-1'><h3>1</h3><h4>Good design is innovative</h4><p>The possibilities for innovation are not, by any means, exhausted. Technological development is always offering new opportunities for innovative design. But innovative design always develops in tandem with innovative technology, and can never be an end in itself.</p> <img src='imgs/article/img3.jpg'></div>"
+ "<div class='item-2-2'><h3>2</h3><h4>Good design makes a product useful</h4><p>A product is bought to be used. It has to satisfy certain criteria, not only functional, but also psychological and aesthetic. Good design emphasises the usefulness of a product whilst disregarding anything that could possibly detract from it.</p><img src='imgs/article/img2.jpg'></div></div></div>";


var content_3 = "<div>un petit <a href='http://wwww.google.com' onclick=window.open('https://www.google.com')>texte</a> <p>un peu de paragraphe</p><h1>et un titre</h1></div>";
var content_3 = "<div><p>un peu de paragraphe</p><h1>et un titre</h1></div>";



var publications = [
    {
        id: "article1",
        filename: 'new microbes',
        author: 'Paul Browdy',
        content: content_3,
        image: 'imgs/article/img_3.jpg',
        portrait: "imgs/portraits/3.png",
        email: "info@browdy.com",
        version: "3.0",
        date: "03.12.2017",
        background_color: "#FFFFFF",
        color: "#000000",
    },
    {
        id: "article2",
        filename: 'Toward a Theory of Architecture Machines',
        author: 'Nicholas Negroponte',
        content: db_files.article_1(),
        image: 'imgs/article/img_4.jpg',
        portrait: "imgs/portraits/10.png",
        email: "info@nicholasnegroponte.com",
        version: "1.0",
        date: "20.12.2010",
        background_color: "none",
        color: "none",
    },
    {
        id: "article0",
        filename: 'Design and Science of the Holobiont',
        author: 'Kevin Slavin',
        content: db_files.article_3(),
        image: 'imgs/article/img_2.jpg',
        portrait: "imgs/portraits/9.png",
        email: "info@kevinslavin.com",
        version: "1.0",
        date: "06.06.2017",
        background_color: "none",
        color: "none",
    },
   
    
    /*
    {
        id: 3,
        filename: 'MIT new discovery',
        author: 'Françoise Jacquet',
        content: '<p>un texte de Jacquet</p>',
        image: 'imgs/cells_3.jpg',
        portrait: "imgs/portraits/4.png",
        // publishedAt: new Date('2016-03-17'),
        createdAt: new Date('2016-03-17')
    }*/
];

var article_id_name = "article";
var article_id_counter = 3;

var libraries = [
    {
        id: 0,
        title: "cells.jpg",
        filename: "imgs/fakeLibrary/img0.jpg",
        date: "04.2018",
        type: "image",
        size: "24mo",
    },
    {
        id: 1,
        title: "structure.jpg",
        filename: "imgs/fakeLibrary/img1.png",
        date: "04.2018",
        type: "image",
        size: "24mo",
    },
    {
        id: 2,
        title: "globules.png",
        filename: "imgs/fakeLibrary/img2.jpg",
        date: "04.2018",
        type: "image",
        size: "24mo",
    },
    {
        id: 3,
        title: "samples.jpg",
        filename: "imgs/fakeLibrary/img3.jpg",
        date: "04.2018",
        type: "image",
        size: "24mo",
    },
]

var templates = [
        {
            id: 0,
            title: 'Bravado',
            author: 'Yvan Courbet',
            image: 'imgs/cells_0.jpg',
            portrait: "imgs/portraits/8.png",
            version: "5.0",
            date: "06.2018",
            website: "wwww.yvancourbet.com",
            stars: "imgs/fakeStars/3stars.png",
        },
        {
            id: 1,
            title: 'Nihilo',
            author: 'Patrick Deleuze',
            image: 'imgs/cells_0.jpg',
            portrait: "imgs/portraits/7.png",
            version: "3.0",
            date: "08.2018",
            website: "wwww.patrickdeleuze.com",
            stars: "imgs/fakeStars/4stars.png",
        }
]

var bibliography = [
        {
            id: 0,
            ref: "Yussof, Kathryn. ed. London: BiPolar Arts Catalyst, 2008",
        },
        {   
            id: 1,
            ref: "Ascott Roy. Technoetic Arts. <http://www.intellectbooks.com/journals>",
        }
]


// we should juste store the ids of course.... except if we let the user keep a bookmark
// although the publication could have been deleted by the publisher.... ?
var bookmarks = [
    /*
    {
        id: "article2",
        filename: 'Design and Science of the Holobiont',
        author: 'Aaron Larner',
        content: db_files.article_1(),
        //content: db.article_1,
        image: 'imgs/holobiont_back.jpg',
        portrait: "imgs/portraits/5.png",
        email: "info@aaronlarner.com",
        createdAt: new Date('2016-03-19')
    },*/
    {
        id: "article0",
        filename: 'Design and Science of the Holobiont',
        author: 'Kevin Slavin',
        content: db_files.article_3(),
        image: 'imgs/article/img_2.jpg',
        portrait: "imgs/portraits/9.png",
        email: "info@kevinslavin.com",
        version: "1.0",
        date: "06.06.2017",
    },
]

//var id_draft = 0;
var drafts = [

]

function getPublicationWithID(id) {
    for(p of publications){
        if(p.id == id){
            return p;
        }
    }
    return undefined;
}

function getPublicationWithFilename(filename) {
    for(p of publications){
        if(p.filename == filename){
            return p;
        }
    }
    return undefined;
}

function isInPublication(filename) {
    for(p of publications){
        if(p.filename == filename){
            return true;
        }
    }
    return false;
}

function isIdinBookmarks(id) {
    for(b of bookmarks){
        if(b.id == id){
            return true;
        }
    }
    return false;
}


function getDraftWithID(id) {
    for(d of drafts){
        if(d.id == id){
            return d;
        }
    }
    return undefined;
}

function getDraftWithFilename(filename) {
    for(d of drafts){
        if(d.filename == filename){
            return d;
        }
    }
    return undefined;
}

function isInDraft(filename) {
    for(d of drafts){
        if(d.filename == filename){
            return true;
        }
    }
    return false;
}

function deleteElementInArray(id,array){
    var index = -1;
    var counter = 0;
    for(el of array){
        if(el.id == id){
            index = counter;
        }
        counter++;
    }
    if(index != -1){
        array.splice(index,1);
    }
}

function hasRightForDraft(draft,profile) {
    console.log("hasRightForDraft",profile,draft.rights);
    for(r of draft.rights){
        
        if(r == profile) return true;
    }
    return false;
}



app.get('/publications', function(req, res) {
    /* 
    client side -> ejs
    <% for(let i = 0; i < publications.length; i++) { %>
    <article>
        <h2><%= publications[i].title %></h1>
        <p><%= publications[i].body %></p>
    </article>
    <% } %>
    */

    //res.setHeader('Content-Type', 'text/plain');
    //res.send('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
    //res.render(__dirname + '/public/views/index.ejs',{publications: publications});
});


app.post('/todo/ajouter/', function(req, res) {

})


io.on('connection', function(client,pseudo) {  
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
        client.emit('messages', 'Hello from server');
    });

    // Dès qu'on nous donne un pseudo, on le stocke en variable de session
    client.on('petit_nouveau', function(pseudo) {
        client.pseudo = pseudo;
    });

    client.on('message', function (message) {
        // On récupère le pseudo de celui qui a cliqué dans les variables de session
        console.log(client.pseudo + ' me parle ! Il me dit : ' + message);
        client.broadcast.emit('newContent', message);
    }); 

    client.on('Publications', function (message) {
        console.log("CLients wants to select all publication",message);
        //console.log(publications);
        client.emit('newPublications',publications);
    });

    // send the drafts but without the content, no?
    //client.on('Drafts', function (message) {
    client.on('showAllDrafts', function (message) {
        console.log("Client wants to select all drafts",message);
        var profile_drafts = [];
        for(d of drafts){
            if(hasRightForDraft(d,message)){
                console.log("has right -> pushing draft");
                profile_drafts.push(d);
                console.log("--> draft with id",d.id);
            }
        }
        client.emit('newDrafts',profile_drafts);
    });

    client.on('Library', function (message) {
        console.log(client.pseudo + " fetches its library with profile",message);
        client.emit("newLibrary",libraries);
    });

    client.on('Bibliography', function (message) {
        console.log(client.pseudo + " fetches its Bibiliography with profile",message);
        client.emit('newBibliography',bibliography);
    });

    client.on('Templates', function (message) {
        console.log(client.pseudo + " fetches its Templates with profile",message);
        client.emit('newTemplates',templates);
    });

    client.on('Bookmarks', function (message) {
        console.log(client.pseudo + " fetches its Bookmarks with profile",message);
        client.emit("newBookmarks",bookmarks);
    });

    client.on('Codes', function (message) {
        console.log(client.pseudo + " fetches its rviz with profile",message);
        client.emit("newCode");
    });

    client.on('rpoints', function (message) {
        console.log(client.pseudo + " fetches its rpoints with profile",message);
        client.emit("newRpoints");
    });

    client.on('rviz', function (message) {
        console.log(client.pseudo + " fetches its rviz with profile",message);
        client.emit("newRviz");
    });

    client.on("openpublication", function(message) {
        console.log("Client wants to open publication with id",message);
        var publication = getPublicationWithID(message);
        //console.log("draft content",publication.content);
        client.emit("showpublication",publication);
    });

    client.on("openpublicationWhenLoggedOut", function(message) {
        console.log("Client wants to open publication with id",message);
        var publication = getPublicationWithID(message);
        //console.log("draft content",publication.content);
        client.emit("showpublicationWhenLoggedOut",publication);
    });

    client.on("opendraft", function(message) {
        console.log("Client wants to open draft with id",message);
        //console.log("draft",drafts);
        var draft = getDraftWithID(message);
        //console.log("draft content",draft.content);
        client.emit("showdraft",draft);
    });

    client.on("savedraft", function(message) {
        console.log("Client wants to save draft with id", message.id, message.filename);
        console.log("color font: ",message.color);
        console.log("color background: ",message.background_color);
        if(isInDraft(message.filename)){
            console.log("--> draft already exists");
            var draft = getDraftWithFilename(message.filename);
            //if(message.content.length > 0) {
            draft.content = message.content;
            //}
            draft.version = message.version;
            draft.background_color = message.background_color;
            draft.color = message.color;
        }else { // we have a new draft
            message.id = article_id_name + article_id_counter;
            console.log("--> new draft is created with id",message.id);
            article_id_counter++;
            //message.id = id_draft;
            //id_draft++;
            drafts.push(message);
        }
    });

    client.on("addBookmark", function(message) {
        console.log("Client wants to add bookmark", message.id);
        var id = message.id;
        // check first if the publication is not already in the bookmarks
        if(isIdinBookmarks(id)){
           console.log("--> publication is alread in the bookmarks"); 
        }
        else {
            var publication = getPublicationWithID(id);
            bookmarks.push(publication);
        }
    });

    client.on("openBookmark", function(message) {
        console.log("Client wants to open bookmark");
    });

    client.on("deleteBookmark", function(message) {
        console.log("Client wants to delete bookmark",message.id);
        var id = message.id;
        console.log("should delete bookmark with id",id);
        deleteElementInArray(id,bookmarks);
        client.emit("updateNewBookmarks",bookmarks);
    });

    client.on("sharedraft", function(message) {
        console.log("Client wants to share draft",message.id,message.filename);
        var draft;
        if(message.id == undefined) {
            draft = getDraftWithFilename(message.filename);
            if(draft != undefined){
                draft.id = article_id_name + article_id_counter;
                article_id_counter++;
            }
            //draft.id = id_draft;
            //id_draft++;
        }
        else draft = getDraftWithID(message.id);

        // update the content in case the user hadn't saved the file before sharing
        // draft.content = message.content;

        /*
        if(draft == undefined) { // user clicks on share with without having saved the draft before
            draft ={
                "id": id_draft, // will be generated on server side
                "filename": message.filename,
                "author": "Vincent Spaulinet",
                "content": content,
                "image": "imgs/cells_3.jpg",
                "portrait": "imgs/portraits/6.png",
                "rights": ["author"],
            };
            id_draft++;
        }*/

        // case where the designer publishes it
        if(message.rights == "publish"){
            // should we remove the draft from the drafts?
            if(isInPublication(message.filename)){
                if(message.content != undefined){
                    var publication = getPublicationWithFilename(message.filename);
                    publication.content = message.content;
                }
            } else {
                //console.log("draft",draft);
                var publication = {};
                for(var k in draft){
                    publication[k]=draft[k];
                }
                //publication.id = article_id_name + article_id_counter;
                //article_id_counter++;
                if(message.content != undefined){
                    publication.content = message.content;
                }
                publications.push(publication);
                //console.log("publications",publications);
            }
            
        } else {
            // sharing with editor, designer ....
            if(!hasRightForDraft(draft,message.rights)){
                draft.rights.push(message.rights);
            }
            //console.log("new rights:",draft.rights);
        }
        
    });

    client.on("deletedraft", function(message) {
        console.log("Client wants to delete draft",message.id);
        var id = message.id;
        deleteElementInArray(id,drafts);
        client.emit('UpdateNewDrafts',drafts);
    });
});



server.listen(8080);