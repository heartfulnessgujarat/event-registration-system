console.log("App loaded");

let participants=[];
let participantRows=[];



async function loadParticipants(){

let response =
await fetch(
CONFIG.API_URL+"?action=list"
);

let data =
await response.json();

participants=data.names;
participantRows=data.rows;

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

let row =
participantRows.find(r => r[1]==name);

showProfile(row);

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
