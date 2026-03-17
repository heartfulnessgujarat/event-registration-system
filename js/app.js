let THANKYOU_HTML="";
async function preloadThankYou(){

let response =
await fetch("./data/thankyou.html?v="+Date.now());

THANKYOU_HTML =
await response.text();

console.log("Thank you preloaded");

}
console.log("App loaded");

let participants=[];
let participantRows=[];
let centres=[];
let dataLoaded=false;

const searchBox =
document.getElementById("searchBox");

const suggestionBox =
document.getElementById("suggestions");



// Disable search initially
searchBox.disabled=true;
searchBox.placeholder="Loading participants...";



// LOAD PARTICIPANTS
async function loadParticipants(){

let response =
await fetch("./data/participants.json");

let data =
await response.json();

participants =
data.map(p => String(p.name).trim());

participantRows =
data.map(p => p.row);

dataLoaded=true;

searchBox.disabled=false;
searchBox.placeholder="Type participant name";

console.log("Participants loaded:",participants.length);

}



// LOAD CENTRES
async function loadCentres(){

let response =
await fetch("./data/centres.json");

centres =
await response.json();

}

loadParticipants();
loadCentres();



// SEARCH PARTICIPANT
searchBox.addEventListener(
"keyup",
function(){

runParticipantSearch(this.value);

}
);



function runParticipantSearch(query){

if(!dataLoaded)return;

query =
query.trim().toLowerCase();

if(query.length===0){

suggestionBox.innerHTML="";
return;

}



let participantResults=[];

for(let i=0;i<participants.length;i++){

let cleanName =
participants[i]
.toLowerCase();

if(cleanName.startsWith(query)){

participantResults.push(participants[i]);

}

}

showParticipantSuggestions(participantResults);

}



// SHOW SUGGESTIONS
function showParticipantSuggestions(list){

suggestionBox.innerHTML="";

if(list.length===0){

suggestionBox.innerHTML=
"<div class='suggestionItem'>No match</div>";

return;

}



for(let i=0;i<list.length;i++){

let div =
document.createElement("div");

div.className="suggestionItem";

div.textContent=list[i];

div.onclick=function(){

selectParticipant(this.textContent);

};

suggestionBox.appendChild(div);

}

}



// SELECT PARTICIPANT
function selectParticipant(name){

searchBox.value=name;

suggestionBox.innerHTML="";

let row =
participantRows.find(r => r[1]==name);

showProfile(row);

}



// PROFILE DISPLAY
function showProfile(row){

window.currentRow=row;

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
onkeyup="searchCentre(this.value)">

<div id="centreSuggestions"
class="suggestions"></div>

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



// ENABLE EDIT
function enableEdit(){

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

Yes, I have edited details – Register Me

</button>

`;

}



// CENTRE SEARCH
function searchCentre(query){

query=query.toLowerCase();

if(query.length===0){

document
.getElementById("centreSuggestions")
.innerHTML="";

return;

}



let centreResults=[];

for(let i=0;i<centres.length;i++){

let centreName =
centres[i].centre
.toLowerCase();

if(centreName.startsWith(query)){

centreResults.push(centres[i]);

}

}



let html="";

centreResults.forEach(c=>{

html+=`

<div class="suggestionItem"
onclick="selectCentre('${c.centre}')">

${c.centre}

</div>

`;

});

document
.getElementById("centreSuggestions")
.innerHTML=html;

}



// SELECT CENTRE
function selectCentre(name){

document
.getElementById("centre")
.value=name;

document
.getElementById("centreSuggestions")
.innerHTML="";

let centreData =
centres.find(c=>c.centre==name);

document
.getElementById("district")
.value=
centreData.district;

document
.getElementById("zone")
.value=
centreData.zone;



document
.getElementById("editedRegisterBtn")
.disabled=false;

}



// SHOW THANK YOU MESSAGE

async function showThankYou(){

let response =
await fetch("./data/thankyou.html?v="+Date.now());

let html =
await response.text();

document.querySelector(".container").innerHTML =
html;

}



// REGISTER WITHOUT EDIT
function registerParticipant(){

showThankYou();

}



// REGISTER AFTER EDIT
async function registerEditedParticipant(){

let name =
window.currentRow[1];

let mobile =
document.getElementById("mobile").value;

let email =
document.getElementById("email").value;

let centre =
document.getElementById("centre").value;

let district =
document.getElementById("district").value;

let zone =
document.getElementById("zone").value;

let pin =
document.getElementById("pin").value;



let response =
await fetch(

CONFIG.API_URL+
"?action=updateProfile"+
"&name="+encodeURIComponent(name)+
"&mobile="+mobile+
"&email="+encodeURIComponent(email)+
"&centre="+encodeURIComponent(centre)+
"&district="+encodeURIComponent(district)+
"&zone="+encodeURIComponent(zone)+
"&pin="+pin

);

let result =
await response.json();

if(result.status==="updated"){

showThankYou();

}
else{

alert("Update failed");

}

}
