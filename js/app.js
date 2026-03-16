console.log("App file loaded");

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
body:JSON.stringify({
action:"search",
query:query
})
}
);

let data =
await response.json();

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
