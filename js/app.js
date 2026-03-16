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
"?action=test"

);

let data=
await response.text();

console.log(data);

}
);
