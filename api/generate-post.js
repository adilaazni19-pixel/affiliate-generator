export default async function handler(req,res){

try{

const {
productName,
benefits,
contentType,
style, 
aiModel
}=req.body;

const prompt = `
Anda seorang copywriter affiliate Malaysia yang berpengalaman.

Nama Produk:
${productName}

Kelebihan:
${benefits}

Jenis Kandungan:
${contentType}

Gaya Copywriting:
${style}

Arahan:

Jika Soft Sell:
- gaya santai
- tidak memaksa membeli

Jika Hard Sell:
- CTA kuat
- fokus conversion

Jika Problem Solving:
- fokus masalah dan penyelesaian

Jika Storytelling:
- gaya bercerita

Jika FOMO:
- timbulkan rasa rugi jika tak beli

Jika PAS:
- Problem, Agitate, Solution

Jika AIDA:
- Attention, Interest, Desire, Action

Jika POV:
- gaya pengalaman pengguna

Gunakan Bahasa Melayu Malaysia.
Jangan overclaim.
Terus hasilkan posting.
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
