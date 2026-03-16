console.log("App loaded");

let participants=[];

async function loadParticipants(){

let response =
await fetch(
CONFIG.API_URL+"?action=list"
);

let data =
await response.json();

participants=data.data;

console.log(
"Participants loaded:",
participants.length
);

}

loadParticipants();



document
.getElementById("searchBox")
.addEventListener(
"keyup",
function(){

let query=
this.value.toLowerCase();

if(query.length<2){

document
.getElementById("suggestions")
.innerHTML="";

return;

}

let results=
participants.filter(name=>

name.toLowerCase()
.includes(query)

).slice(0,20);

showSuggestions(results);

}
);



function showSuggestions(list){

let box=
document.getElementById("suggestions");

box.innerHTML="";

if(list.length==0){

box.innerHTML=
"<div class='suggestionItem'>No match</div>";

return;

}

list.forEach(function(name){

let div=
document.createElement("div");

div.className="suggestionItem";

div.textContent=name;

div.onclick=function(){

selectParticipant(name);

};

box.appendChild(div);

});

}



function selectParticipant(name){

document
.getElementById("searchBox")
.value=name;

document
.getElementById("suggestions")
.innerHTML="";

console.log("Selected:",name);

}
