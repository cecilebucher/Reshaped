

var socket = io.connect('http://localhost:8080');

// On demande le pseudo au visiteur...
// var pseudo = prompt('Quel est votre pseudo ?');
// Et on l'envoie avec le signal "petit_nouveau" (pour le différencier de "message")
socket.emit('petit_nouveau', "cec");

// On affiche une boîte de dialogue quand le serveur nous envoie un "message"
socket.on('message', function(message) {
    alert('Le serveur a un message pour vous : ' + message);
})

socket.on('newContent', function(message) {
    // alert('Nouveau contenu : ' + message);
    $(".content").html(message);
})

socket.on('newPublications', function(publications) {
    showPublications(publications);
})

socket.on('showpublicationWhenLoggedOut', function(publication){
    showPublicationWhenLoggedOut(publication);
})

socket.on('newDrafts', function(drafts) {
    console.log("client receives show drafts");
    showDrafts(drafts, true);
})

socket.on('UpdateNewDrafts', function(drafts) {
    showDrafts(drafts, false);
});

socket.on('newBibliography', function(bibliography) {
    console.log("in here??");
    showBibliography(bibliography);
});

socket.on('newLibrary', function(library) {
    showLibrary(library);
});

socket.on('newBookmarks', function(bookmarks){
    showBookmarks(bookmarks, true);
});

socket.on('updateNewBookmarks', function(bookmarks){
    showBookmarks(bookmarks, false)
});

socket.on('newTemplates', function(templates){
    showTemplates(templates);
});

socket.on('newRpoints', function(rpoints){
    showRpoints(rpoints);
});

socket.on('newRviz', function(rviz){
    showRviz(rviz);
    //showRpoints(rviz);
});

socket.on('newCode', function(code){
    showCode(code);
});

//socket.on('')

socket.on('showdraft', function(draft) {
    showDraft(draft);
});

socket.on('showpublication', function(publication) {
    //console.log("socket receive showpublication",current_profile);
    showPublication(publication);
});

// Lorsqu'on clique sur le bouton, on envoie un "message" au serveur
$('#poke').click(function () {
    var article = $(".content").html();
    socket.emit('message', article);
})