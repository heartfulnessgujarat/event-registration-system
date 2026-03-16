console.log("App loaded");

document
.getElementById("searchBox")
.addEventListener(
"keyup",
async function(){

let query=this.value;

if(query.length<3)
return;

let response =
await fetch(
CONFIG.API_URL,
{
method:"POST",

headers:{
"Content-Type":
"application/x-www-form-urlencoded"
},

body:
"action=search&query="+query

}
);

let text =
await response.text();

let data =
JSON.parse(text);

showSuggestions(data.data);

}
);

function showSuggestions(list){

let html="";

for(let i=0;i<list.length;i++){

html+=`
<div class="suggestionItem">
${list[i]}
</div>
`;

}

document
.getElementById("suggestions")
.innerHTML=html;

}
