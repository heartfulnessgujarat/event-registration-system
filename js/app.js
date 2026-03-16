console.log("App loaded");

document
.getElementById("searchBox")
.addEventListener(
"keyup",
function(){

let query=this.value;

if(query.length<3)
return;

let script =
document.createElement("script");

script.src=
CONFIG.API_URL+
"?action=search&query="+
query+
"&callback=showSuggestions";

document.body.appendChild(script);

}
);

function showSuggestions(result){

let list=result.data;

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
