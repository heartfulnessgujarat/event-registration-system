console.log("App loaded");

let participants=[];
let participantRows=[];
let dataLoaded=false;

const searchBox =
document.getElementById("searchBox");

const suggestionBox =
document.getElementById("suggestions");


// Disable search initially
searchBox.disabled=true;
searchBox.placeholder="Loading participants...";



// Load participants
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

// Enable search now
searchBox.disabled=false;
searchBox.placeholder="Type participant name";

}
catch(error){

console.log("Load error:",error);

searchBox.placeholder="Failed to load data";

}

}

loadParticipants();



// Search logic
searchBox.addEventListener(
"keyup",
function(){

if(!dataLoaded){

return;

}

let query =
this.value.toLowerCase();

if(query.length==0){

suggestionBox.innerHTML="";
return;

}



let results =
participants.filter(function(name){

return name
.toLowerCase()
.includes(query);

}).slice(0,20);

showSuggestions(results);

}
);



// Show suggestions
function showSuggestions(list){

suggestionBox.innerHTML="";

if(list.length==0){

suggestionBox.innerHTML=
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

suggestionBox.appendChild(div);

});

}



// Select participant
function selectParticipant(name){

searchBox.value=name;

suggestionBox.innerHTML="";

let row =
participantRows.find(function(r){

return String(r[1]).trim()==name;

});

if(row){

showProfile(row);

}

}



// Show profile
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
