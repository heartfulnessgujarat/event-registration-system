document
.getElementById("searchBox")

.addEventListener(

"keyup",

function(){

let html=`

<div class="suggestionItem">

Sample User 1

</div>

<div class="suggestionItem">

Sample User 2

</div>

`;

document
.getElementById("suggestions")
.innerHTML=html;

}
);
