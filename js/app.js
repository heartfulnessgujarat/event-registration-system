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

let response=
await fetch(
CONFIG.API_URL+
"?action=test",
{
method:"GET",
mode:"no-cors"
}
);

let data=
await response.text();

console.log(data);

}
);
