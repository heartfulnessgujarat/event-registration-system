console.log("App loaded");

document
.getElementById("searchBox")
.addEventListener(
"keyup",
async function(){

let query=this.value;

if(query.length<3){

document
.getElementById("suggestions")
.innerHTML="";

return;

}

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

console.log("Error:",error);

}

}
);



function showSuggestions(list){

let html="";

if(list.length==0){

html=
"<div class='suggestionItem'>No participant found</div>";

}

else{

for(let i=0;i<list.length;i++){

html+=`

<div class="suggestionItem">

${list[i]}

</div>

`;

}

}

document
.getElementById("suggestions")
.innerHTML=html;

}
