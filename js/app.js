console.log("App loaded");

let timer;

document
.getElementById("searchBox")
.addEventListener(
"keyup",
function(){

let query=this.value;

clearTimeout(timer);

if(query.length<3){

document
.getElementById("suggestions")
.innerHTML="";

return;

}

timer=setTimeout(function(){

searchParticipant(query);

},400);

}
);



async function searchParticipant(query){

try{

let response =
await fetch(
CONFIG.API_URL +
"?query="+
encodeURIComponent(query)
);

let data =
await response.json();

if(data.status=="success"){

showSuggestions(data.data);

}

}
catch(error){

console.log(error);

}

}



function showSuggestions(list){

let box =
document.getElementById("suggestions");

box.innerHTML="";

if(list.length==0){

box.innerHTML=
"<div class='suggestionItem'>No participant found</div>";

return;

}

list.forEach(function(name){

let div =
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
