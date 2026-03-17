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

// Enable search
searchBox.disabled=false;
searchBox.placeholder="Type participant name";


// IMPORTANT FIX:
// If user already typed something, refresh search
if(searchBox.value.length>0){

triggerSearch(searchBox.value);

}

}
catch(error){

console.log("Load error:",error);

searchBox.placeholder="Failed to load data";

}

}

loadParticipants();



// Search handler
searchBox.addEventListener(
"keyup",
function(){

triggerSearch(this.value);

}
);



function triggerSearch(query){

if(!dataLoaded){

return;

}

query=query.toLowerCase();

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



// Show dropdown
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

<table class="profileTable">

<tr>
<td>Name</td>
<td>
<input value="${row[1]}" disabled>
</td>
</tr>

<tr>
<td>Mobile</td>
<td>
<input id="mobile"
value="${row[2]}">
</td>
</tr>

<tr>
<td>Email</td>
<td>
<input id="email"
value="${row[3]}">
</td>
</tr>

<tr>
<td>Centre</td>
<td>
<input id="centre"
value="${row[4]}">
</td>
</tr>

<tr>
<td>District</td>
<td>
<input value="${row[5]}" disabled>
</td>
</tr>

<tr>
<td>Zone</td>
<td>
<input value="${row[6]}" disabled>
</td>
</tr>

<tr>
<td>SRCMID</td>
<td>
<input value="${row[7]}" disabled>
</td>
</tr>

<tr>
<td>Pin</td>
<td>
<input id="pin"
value="${row[8]}">
</td>
</tr>

</table>

<br>

<button onclick="saveProfile()">
Save Changes
</button>

`;

document
.getElementById("result")
.innerHTML=html;

}


function saveProfile(){

let mobile =
document.getElementById("mobile").value;

let email =
document.getElementById("email").value;

let centre =
document.getElementById("centre").value;

let pin =
document.getElementById("pin").value;

console.log(
"Saving:",
mobile,
email,
centre,
pin
);

alert("Save button working (API next)");

}
