console.log("App loaded");

let participants=[];



async function loadParticipants(){

try{

let response =
await fetch(
CONFIG.API_URL+"?action=list"
);

let data =
await response.json();

if(data && data.data){

participants=data.data;

console.log(
"Participants loaded:",
participants.length
);

}

}
catch(error){

console.log("Load error:",error);

}

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



async function selectParticipant(name){

document
.getElementById("searchBox")
.value=name;

document
.getElementById("suggestions")
.innerHTML="";

try{

let response =
await fetch(

CONFIG.API_URL+
"?action=profile&name="+
encodeURIComponent(name)

);

let data =
await response.json();

if(data.status=="found"){

showProfile(data.data);

}

}
catch(error){

console.log(error);

}

}



function showProfile(row){

let html=`

<h3>Participant Profile</h3>

<p><b>Name:</b> ${row[1]}</p>

<p><b>Mobile:</b> ${row[2]}</p>

<p><b>Email:</b> ${row[3]}</p>

<p><b>Centre:</b> ${row[4]}</p>

<p><b>District:</b> ${row[5]}</p>

<p><b>Zone:</b> ${row[6]}</p>

<p><b>SRCMID:</b> ${row[7]}</p>

<p><b>Pin:</b> ${row[8]}</p>

`;

document
.getElementById("result")
.innerHTML=html;

}
