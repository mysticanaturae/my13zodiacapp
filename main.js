// Local storage
function saveUserData(userData){ localStorage.setItem('astroUser', JSON.stringify(userData)); }
function loadUserData(){ const data=localStorage.getItem('astroUser'); return data? JSON.parse(data):null; }

// Demo snapshot
function computeSnapshot(name,dob,time,place){
  return `Izračun za: ${name}\nDatum: ${dob}\nUra: ${time}\nKraj: ${place}\nSonce, Luna, Ascendent (demo)`;
}

// Freemium/Premium OpenAI
async function generatePrediction(level, userData) {
  const { name, dob, time, place } = userData;

  const snapshot = {
    name,
    dob,
    time,
    place,
    houses13,
    zodiacImages,
  };

  try {
    const response = await fetch('/generateforecast.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        snapshot,
        premium: level === "premium"
      })
    });

    const data = await response.json();

    // OpenAI returns nested structure:
    if (data?.choices?.[0]?.message?.content) {
      return data.choices[0].message.content;
    }

    return "Napaka: prazna vsebina iz OpenAI.";
  } catch (err) {
    console.error(err);
    return "Napaka pri generiranju napovedi.";
  }
}

// Zodiac cards
const zodiacImages = {
  "Oven":"https://static.wixstatic.com/media/7535eb_4686ee40d73541afb9116473eed4cf64~mv2.png",
  "Bik":"https://static.wixstatic.com/media/7535eb_51af61b776b3483b9776bb203f4dd949~mv2.png",
  "Dvojčka":"https://static.wixstatic.com/media/7535eb_38e1fd146cc64ed4b5c203b54ad3c3ef~mv2.png",
  "Rak":"https://static.wixstatic.com/media/7535eb_04c1dad8d7a54fe9ba73e43d4fb8c96c~mv2.png",
  "Lev":"https://static.wixstatic.com/media/7535eb_63ae5332c9bf47b1a17d2c4063edfa12~mv2.png",
  "Devica":"https://static.wixstatic.com/media/7535eb_a86a4eafaa274b77bc2df05b5e634930~mv2.png",
  "Tehtnica":"https://static.wixstatic.com/media/7535eb_a86a4eafaa274b77bc2df05b5e634930~mv2.png",
  "Škorpijon":"https://static.wixstatic.com/media/7535eb_0bb8888d2ef04fdfbb773d4108fb6eac~mv2.png",
  "Ophiuchus":"https://static.wixstatic.com/media/7535eb_8d4b7558ec1545d2a4825fe05a3d5850~mv2.png",
  "Strelec":"https://static.wixstatic.com/media/7535eb_1411795fb0764a09a023179c9eff21d0~mv2.png",
  "Kozorog":"https://static.wixstatic.com/media/7535eb_22eddfb8f65644019f99ec7f083e0b5e~mv2.png",
  "Vodnar":"https://static.wixstatic.com/media/7535eb_f8efc8ce37a64367b6bf8f74b7c8670f~mv2.png",
  "Ribi":"https://static.wixstatic.com/media/7535eb_89ce0c6de1324a7394193b0409c18dc1~mv2.png"
};

const houses13 = [
  {number:1, name:"Hiša Sebstva", ruler:"Oven", description:"Osnova identitete, fizično telo, osebni izraz."},
  {number:2, name:"Hiša Vrednosti", ruler:"Bik", description:"Finančni in materialni viri, vrednote."},
  {number:3, name:"Hiša Komunikacije", ruler:"Dvojčka", description:"Misli, komunikacija, lokalno okolje."},
  {number:4, name:"Hiša Doma", ruler:"Rak", description:"Družina, notranji svet, čustvena varnost."},
  {number:5, name:"Hiša Kreativnosti", ruler:"Lev", description:"Ustvarjalnost, ljubezen, otroci."},
  {number:6, name:"Hiša Dela", ruler:"Devica", description:"Rutina, zdravje, služba."},
  {number:7, name:"Hiša Partnerstva", ruler:"Tehtnica", description:"Odnosi, partnerstva, kontrakti."},
  {number:8, name:"Hiša Transformacije", ruler:"Škorpijon", description:"Globoke spremembe, dedovanje, intimnost."},
  {number:9, name:"Hiša Transparentnosti", ruler:"Ophiuchus", description:"Samopresoja, samopomoč, duhovni vpogledi."},
  {number:10, name:"Hiša Potovanj in Filozofije", ruler:"Strelec", description:"Razširjanje obzorij, učenje, potovanja, filozofija."},
  {number:11, name:"Hiša Karier", ruler:"Kozorog", description:"Poklic, ambicije, javni ugled."},
  {number:12, name:"Hiša Prijateljstev", ruler:"Vodnar", description:"Skupnosti, prijatelji, dolgoročni cilji."},
  {number:13, name:"Hiša Duše in Karmičnih Lekcij", ruler:"Ribi", description:"Karma, skrivnosti, razsvetljenje, duhovna rast."}
];

function createRepeaterItem(sign){
  const container = document.createElement('div');
  container.style="background:#333; border-radius:12px; padding:15px; text-align:center; box-shadow:2px 2px 12px rgba(0,0,0,0.3);";
  container.innerHTML=`
    <img src="${zodiacImages[sign]}" style="width:80px;height:80px;border-radius:50%;margin-bottom:10px;">
    <h3 style="color:#6c63ff;">${sign}</h3>
    <p id="signHeadline-${sign}"></p>
  `;
  return container;
}

const signsRepeater=document.getElementById('signsRepeater');
Object.keys(zodiacImages).forEach(sign=>signsRepeater.appendChild(createRepeaterItem(sign)));

// Gumbi
document.getElementById('btnCompute').addEventListener('click',async()=>{
  const userData={
    name:document.getElementById('nameInput').value,
    dob:document.getElementById('dobInput').value,
    time:document.getElementById('timeInput').value,
    place:document.getElementById('placeInput').value
  };
  saveUserData(userData);
  document.getElementById('snapshotBox').innerText=computeSnapshot(userData.name,userData.dob,userData.time,userData.place);
  document.getElementById('statusText').innerText="Snapshot izračunan!";
  const freeText=await generatePrediction("free",userData);
  document.getElementById('snapshotBox').innerText+=`\n\n${freeText}`;
});

document.getElementById('btnPremium').addEventListener('click',async()=>{
  const userData=loadUserData();
  if(!userData){ alert("Najprej izračunaj svoj snapshot!"); return; }
  document.getElementById('statusText').innerText="Generiram premium napovedi...";
  const premiumText=await generatePrediction("premium",userData);
  document.getElementById('snapshotBox').innerText+=`\n\n${premiumText}`;
  document.getElementById('statusText').innerText="Premium napoved pripravljena!";
});
