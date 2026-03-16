console.log("App loaded");

let participants=[];
let participantRows=[];
let dataLoaded=false;

document
.getElementById("searchBox")
.disabled=true;

document
.getElementById("searchBox")
.placeholder="Loading participants...";

async function loadParticipants(){

try{

let response =
await fetch(CONFIG.API_URL+"?action=list");

let data =
await response.json();

participants = data.names || [];
participantRows = data.rows || [];

dataLoaded=true;

console.log(
"Participants loaded:",
participants.length
);

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

if(!dataLoaded){

document
.getElementById("suggestions")
.innerHTML=
"<div class='suggestionItem'>Loading...</div>";

return;

}

let query =
this.value.toLowerCase();

if(query.length<1){

document
.getElementById("suggestions")
.innerHTML="";

return;

}



let results =
participants.filter(function(name){

return String(name)
.toLowerCase()
.includes(query);

}).slice(0,20);



showSuggestions(results);

}
);



function showSuggestions(list){

let box =
document.getElementById("suggestions");

box.innerHTML="";

if(list.length==0){

box.innerHTML=
"<div class='suggestionItem'>No match</div>";

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

let row =
participantRows.find(function(r){

return String(r[1]).trim()==name;

});

if(row){

showProfile(row);

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
