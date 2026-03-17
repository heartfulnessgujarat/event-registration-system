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

let response =
await fetch("./data/participants.json");

let data =
await response.json();

participants =
data.map(p => p.name);

participantRows =
data.map(p => p.row);

dataLoaded=true;

searchBox.disabled=false;
searchBox.placeholder="Type participant name";

console.log(
"Participants loaded:",
participants.length
);

// Refresh if user already typed
if(searchBox.value.length>0){

triggerSearch(searchBox.value);

}

}

loadParticipants();



// Search logic
searchBox.addEventListener(
"keyup",
function(){

triggerSearch(this.value);

}
);



function triggerSearch(query){

if(!dataLoaded)return;

query=query.toLowerCase();

if(query.length==0){

suggestionBox.innerHTML="";
return;

}

let results =
participants.filter(name=>

name.toLowerCase()
.includes(query)

).slice(0,20);

showSuggestions(results);

}



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
participantRows.find(r => r[1]==name);

showProfile(row);

}



// PROFILE VIEW
function showProfile(row){

window.currentRow=row;

window.isEditing=false;

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
value="${row[2]}"
disabled>
</td>
</tr>

<tr>
<td>Email</td>
<td>
<input id="email"
value="${row[3]}"
disabled>
</td>
</tr>

<tr>
<td>Centre</td>
<td>
<input id="centre"
value="${row[4]}"
disabled
onchange="centreChanged()">
</td>
</tr>

<tr>
<td>District</td>
<td>
<input id="district"
value="${row[5]}"
disabled>
</td>
</tr>

<tr>
<td>Zone</td>
<td>
<input id="zone"
value="${row[6]}"
disabled>
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
value="${row[8]}"
disabled>
</td>
</tr>

</table>

<br>

<button id="registerBtn"
onclick="registerParticipant()">

Yes, Details are OK – Register Me

</button>

<button id="editBtn"
onclick="enableEdit()">

I want to edit details

</button>

<div id="editSection"></div>

`;

document
.getElementById("result")
.innerHTML=html;

}



// ENABLE EDIT MODE
function enableEdit(){

window.isEditing=true;

document.getElementById("mobile").disabled=false;
document.getElementById("email").disabled=false;
document.getElementById("centre").disabled=false;
document.getElementById("pin").disabled=false;



document.getElementById("registerBtn").disabled=true;

document.getElementById("editBtn").disabled=true;



document
.getElementById("editSection")
.innerHTML=`

<br>

<button id="editedRegisterBtn"
disabled
onclick="registerEditedParticipant()">

I have edited details – Register Me

</button>

`;

}



// Centre change simulation
function centreChanged(){

document
.getElementById("editedRegisterBtn")
.disabled=true;



setTimeout(function(){

document.getElementById("district").value="Updated District";

document.getElementById("zone").value="Updated Zone";

document
.getElementById("editedRegisterBtn")
.disabled=false;

},800);

}



// REGISTER NORMAL
function registerParticipant(){

alert("Proceed to event selection");

}



// REGISTER AFTER EDIT
function registerEditedParticipant(){

let mobile =
document.getElementById("mobile").value;

let email =
document.getElementById("email").value;

let centre =
document.getElementById("centre").value;

let pin =
document.getElementById("pin").value;

console.log(
"Updated:",
mobile,
email,
centre,
pin
);

alert("Save + Register flow next");

}
