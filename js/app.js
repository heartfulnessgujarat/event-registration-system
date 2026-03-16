console.log("App file loaded");
console.log(CONFIG);

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
CONFIG.API_URL +
"?action=search&query="+query
);

let data =
await response.json();

console.log(data);

}
);
