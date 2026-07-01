alert("app.js loaded");
function clearField(id){
document.getElementById(id).value="";
}

function clearOutput(){
document.getElementById("output").value="";
}

function copyOutput(){

const text=
document.getElementById("output").value;

navigator.clipboard.writeText(text);

alert("Copied");
}

async function analyzeProduct(){

const link =
document.getElementById("productLink").value;

document.getElementById("productName").value =
"Produk Affiliate";

document.getElementById("benefits").value =
"Masukkan kelebihan produk di sini.";

}

async function generatePost(){
const data = await response.json();

if(data.error){
  alert(data.error);
  return;
}

document.getElementById("output").value =
data.content || "Tiada output";
const productName =
document.getElementById("productName").value;

const benefits =
document.getElementById("benefits").value;

const contentType =
document.getElementById("contentType").value;
const style =
document.getElementById("style").value;
const aiModel =
document.getElementById("aiModel").value;

const response =
await fetch("/api/generate-post",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
productName,
benefits,
contentType,
aiModel
})

});

const data =
await response.json();

document.getElementById("output").value =
data.content;

}
