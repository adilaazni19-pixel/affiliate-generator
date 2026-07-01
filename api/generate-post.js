export default async function handler(req,res){

try{

const {
productName,
benefits,
contentType,
aiModel
}=req.body;

const prompt = `
Tulis posting affiliate Malaysia.

Produk:
${productName}

Kelebihan:
${benefits}

Jenis:
${contentType}

Bahasa santai.
Tidak formal.
Tidak overclaim.
`;

if(aiModel==="gemini"){

const response =
await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[
{
text:prompt
}
]
}
]
})
}
);

const result =
await response.json();

const content =
result.candidates?.[0]?.content?.parts?.[0]?.text
|| "Tiada output";

return res.status(200).json({
content
});

}

return res.status(200).json({
content:"Claude belum diaktifkan."
});

}catch(error){

return res.status(500).json({
error:error.message
});

}

}
