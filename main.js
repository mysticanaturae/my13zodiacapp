// =====================================================
// LOCAL STORAGE
// =====================================================
function saveUserData(userData) {
    localStorage.setItem('astroUser', JSON.stringify(userData));
}
function loadUserData() {
    const data = localStorage.getItem('astroUser');
    return data ? JSON.parse(data) : null;
}

// Povezave do slik znakov
const zodiacImages = {
    "Oven":"https://static.wixstatic.com/media/7535eb_4686ee40d73541afb9116473eed4cf64~mv2.png",
    "Bik":"https://static.wixstatic.com/media/7535eb_51af61b776b3483b9776bb203f4dd949~mv2.png",
    "Dvojčka":"https://static.wixstatic.com/media/7535eb_38e1fd146cc64ed4b5c203b54ad3c3ef~mv2.png",
    "Rak":"https://static.wixstatic.com/media/7535eb_04c1dad8d7a54fe9ba73e43d4fb8c96c~mv2.png",
    "Lev":"https://static.wixstatic.com/media/7535eb_63ae5332c9bf47b1a17d2c4063edfa12~mv2.png",
    "Devica":"https://static.wixstatic.com/media/7535eb_a86a4eafaa274b77bc2df05b5e634930~mv2.png",
    "Tehtnica":"https://static.wixstatic.com/media/7535eb_81207ec70cae4e23aada067d793eb455~mv2.png",
    "Škorpijon":"https://static.wixstatic.com/media/7535eb_0bb8888d2ef04fdfbb773d4108fb6eac~mv2.png",
    "Ophiuchus":"https://static.wixstatic.com/media/7535eb_8d4b7558ec1545d2a4825fe05a3d5850~mv2.png",
    "Strelec":"https://static.wixstatic.com/media/7535eb_1411795fb0764a09a023179c9eff21d0~mv2.png",
    "Kozorog":"https://static.wixstatic.com/media/7535eb_22eddfb8f65644019f99ec7f083e0b5e~mv2.png",
    "Vodnar":"https://static.wixstatic.com/media/7535eb_f8efc8ce37a64367b6bf8f74b7c8670f~mv2.png",
    "Ribi":"https://static.wixstatic.com/media/7535eb_89ce0c6de1324a7394193b0409c18dc1~mv2.png"
};

<!-- 13-zodiak Berg Calculator (Freemium + Premium) -->
<script>
const zodiac13 = ["Oven","Bik","Dvojčka","Rak","Lev","Devica","Tehtnica","Škorpijon","Ophiuchus","Strelec","Kozorog","Vodnar","Ribi"];

const bergIntervals = [
  {sign:"Oven", start:"04-19", end:"05-13"},
  {sign:"Bik", start:"05-14", end:"06-19"},
  {sign:"Dvojčka", start:"06-20", end:"07-20"},
  {sign:"Rak", start:"07-21", end:"08-09"},
  {sign:"Lev", start:"08-10", end:"09-15"},
  {sign:"Devica", start:"09-16", end:"10-30"},
  {sign:"Tehtnica", start:"10-31", end:"11-22"},
  {sign:"Škorpijon", start:"11-23", end:"11-29"},
  {sign:"Ophiuchus", start:"11-30", end:"12-17"},
  {sign:"Strelec", start:"12-18", end:"01-18"},
  {sign:"Kozorog", start:"01-19", end:"02-15"},
  {sign:"Vodnar", start:"02-16", end:"03-11"},
  {sign:"Ribi", start:"03-12", end:"04-18"}
];

const houses13 = [
  {number:1, name:"Hiša Sebstva", ruler:"Oven", description:"Osnova identitete, fizično telo, osebni izraz."},
  {number:2, name:"Hiša Vrednosti", ruler:"Bik", description:"Finančni in materialni viri, vrednote."},
  {number:3, name:"Hiša Komunikacije", ruler:"Dvojčka", description:"Misli, komunikacija, lokalno okolje."},
  {number:4, name:"Hiša Doma", ruler:"Rak", description:"Družina, notranji svet, čustvena varnost."},
  {number:5, name:"Hiša Kreativnosti", ruler:"Lev", description:"Ustvarjalnost, ljubezen, otroci."},
  {number:6, name:"Hiša Dela", ruler:"Devica", description:"Rutina, zdravje, služba."},
  {number:7, name:"Hiša Partnerstva", ruler:"Tehtnica", description:"Odnosi, partnerstva, kontrakti."},
  {number:8, name:"Hiša Transformacije", ruler:"Škorpijon", description:"Globoke spremembe, dedovanje, intimnost."},
  {number:9, name:"Hiša Transparentnosti", ruler:"Ophiuchus", description:"Samospoznanje, samoozdravitev, globoke resnice."},
  {number:10, name:"Hiša Potovanj in Filozofije", ruler:"Strelec", description:"Razširjanje obzorij, učenje, potovanja, filozofija."},
  {number:11, name:"Hiša Karier", ruler:"Kozorog", description:"Poklic, ambicije, javni ugled."},
  {number:12, name:"Hiša Prijateljstev", ruler:"Vodnar", description:"Skupnosti, prijatelji, dolgoročni cilji."},
  {number:13, name:"Hiša Duše in Karmičnih Lekcij", ruler:"Ribi", description:"Karma, skrivnosti, razsvetljenje, duhovna rast."}
];

// Reference birth for scaling Moon & Ascendant
const referenceBirth = {
  dob: "1978-03-10",
  time: "00:55",
  sun: "Vodnar",
  moon: "Ribi",
  asc: "Ophiuchus"
};

// Berg Sun
function formatMMDD(date){ const m=(date.getMonth()+1).toString().padStart(2,'0'); const d=date.getDate().toString().padStart(2,'0'); return `${m}-${d}`; }
function getBergSunSign(date){
  const mmdd = formatMMDD(date);
  for(const interval of bergIntervals){
    const { sign, start, end } = interval;
    if(start <= end){
      if(mmdd >= start && mmdd <= end) return sign;
    } else {
      if(mmdd >= start || mmdd <= end) return sign;
    }
  }
  return "Neznano";
}

// Julian date
function toJulianDateUTC(date){
  const Y=date.getUTCFullYear(), M=date.getUTCMonth()+1, D=date.getUTCDate() + date.getUTCHours()/24 + date.getUTCMinutes()/(24*60) + date.getUTCSeconds()/(24*3600);
  let y=Y, m=M; if(m<=2){y-=1;m+=12;}
  const A=Math.floor(y/100), B=2-A+Math.floor(A/4);
  return Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+D+B-1524.5;
}

// Scaled Moon & Ascendant
function getScaledMoonSign(date){
  const refDate = new Date(`${referenceBirth.dob}T${referenceBirth.time}`);
  const refMoonIndex = zodiac13.indexOf(referenceBirth.moon);
  const diffDays = Math.floor((date-refDate)/(1000*60*60*24));
  const steps = Math.round(diffDays/(29.530588853/13));
  return zodiac13[(refMoonIndex + steps + 13*1000) % 13];
}

function getScaledAscendant(date){
  const refDate = new Date(`${referenceBirth.dob}T${referenceBirth.time}`);
  const refAscIndex = zodiac13.indexOf(referenceBirth.asc);
  const diffHours = (date-refDate)/(1000*60*60);
  const steps = Math.floor(diffHours/(24/13));
  return zodiac13[(refAscIndex + steps + 13*1000) % 13];
}

function assignHousesFromAsc(ascSign){
  const start=zodiac13.indexOf(ascSign);
  return houses13.map((h,i)=>({...h, sign:zodiac13[(start+i)%13]}));
}

// Compose snapshot
function composeSnapshotText(userData){
  const birthDate = new Date(`${userData.dob}T${userData.time}`);
  const sun = getBergSunSign(birthDate);
  const moon = getScaledMoonSign(birthDate);
  const asc = getScaledAscendant(birthDate);
  const housesAssigned = assignHousesFromAsc(asc);

  let text=`Izračun za: ${userData.name}\nDatum: ${userData.dob}\nUra: ${userData.time}\nKraj: ${userData.place}\n\n`;
  text+=`🌞 Sonce: ${sun}\n🌙 Luna: ${moon}\n⬆️ Ascendent: ${asc}\n\nHiše (kratek pregled):\n`;
  housesAssigned.forEach(h=>text+=`${h.number}. ${h.name} — znak: ${h.sign} (vladar: ${h.ruler}) — ${h.description}\n`);

  return { text, sun, moon, asc, housesAssigned };
}

// Funkcija za render hiš z znaki in vladarji
// level = 'free' ali 'premium'
function renderZodiacCards(housesAssigned, level = 'free') {
  const container = document.getElementById('signsRepeater');
  container.innerHTML = '';

  housesAssigned.forEach(h => {
    const card = document.createElement('div');
    card.className = 'zodiacCard';

    // Izbira slik glede na nivo
    let imagesHTML = '';
    if(level === 'premium') {
      imagesHTML = `
        <div class="imgContainer">
          <img src="${zodiacImages[h.sign]}" class="signImage" alt="${h.sign}">
          <img src="${zodiacImages[h.ruler]}" class="rulerImage" alt="${h.ruler}">
        </div>
      `;
    } else {
      imagesHTML = `
        <div class="imgContainer">
          <img src="${zodiacImages[h.ruler]}" class="rulerImage" alt="${h.ruler}">
        </div>
      `;
    }

    card.innerHTML = `
      <div class="houseName">${h.number}. ${h.name}</div>
      ${imagesHTML}
      <div class="signRuler">
        <span>Znak: ${h.sign}</span>
        <span>Vladar: ${h.ruler}</span>
      </div>
      <div class="houseDescription">${h.description}</div>
    `;

    container.appendChild(card);
  });
}

// Klic render funkcije ob nalaganju strani (freemium)
document.addEventListener('DOMContentLoaded', () => {
  const computed = composeSnapshotText({
    name: 'Anonim',
    dob: '2000-01-01',
    time: '00:00',
    place: ''
  });
  renderZodiacCards(computed.housesAssigned, 'free');
});

// Event listener za premium gumb
document.getElementById('btnPremium').addEventListener('click', async () => {
  const userData = loadUserData();
  if(!userData) { alert('Najprej izračunaj svoj snapshot!'); return; }

  document.getElementById('statusText').innerText = "Generiram premium napoved...";
  const computed = composeSnapshotText(userData);

  // Render premium kartice z obema slikama
  renderZodiacCards(computed.housesAssigned, 'premium');

  const premium = await generatePrediction('premium', userData, computed);
  document.getElementById('snapshotBox').innerText = premium;
  document.getElementById('statusText').innerText = "Premium napoved pripravljena!";
});

// Demo premium text fallback
function demoPremiumText(userData,computed){
  const { sun, moon, asc, housesAssigned } = computed;
  let out = `🌟 PREMIUM (demo) za ${userData.name}\nSonce: ${sun}\nLuna: ${moon}\nAsc: ${asc}\n\nHiše (kratek pregled):\n`;
  housesAssigned.forEach(h=>out+=`${h.number}. ${h.name} — ${h.sign}: ${h.description}\n`);
  out += `\n(Opomba: za polno AI razlago poveži /api/openai.)`;
  return out;
}

// Build premium prompt for AI
function buildPremiumPrompt(userData, computed){
  const { name, dob, time, place } = userData;
  const { sun, moon, asc, housesAssigned } = computed;
  const houseLines = housesAssigned.map(h=>`${h.number}. ${h.name} — znak: ${h.sign} (vladar: ${h.ruler}) — ${h.description}`).join('\n');
  return `Ustvari globoko, personalizirano astrološko razlago za ${name}.\nRojstni podatki: ${dob} ob ${time}, kraj: ${place}.\nSistem: 13-zodiak Berg, Ophiuchus je 9. znak.\nPoložaji:\n- Sonce: ${sun}\n- Luna: ${moon}\n- Ascendent: ${asc}\n\nHiše:\n${houseLines}\n\nProsimo za kratko 1-odstavek razlage, eno praktično nalogo na hišo, eno afirmacijo na konec.\nDolžina do 900 znakov, ton: mističen, empatičen, transformacijski.`;
}

// Generate prediction
async function generatePrediction(level, userData, computed){
  if(level==='free'){
    return `Danes za ${userData.name}: Sonce v ${computed.sun} vabi k jasnosti, Luna v ${computed.moon} podpira čustveno preobrazbo, Ascendent v ${computed.asc} odpira vrata priložnostim.`;
  } else {
    const prompt = buildPremiumPrompt(userData, computed);
    try {
      const res = await fetch('/api/generateforecast',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          snapshot:{
            sun: computed.sun,
            moon: computed.moon,
            asc: computed.asc,
            houses: computed.housesAssigned,
            raw: computed.text,
            userData
          },
          premium:true
        })
      });
      if(!res.ok) return demoPremiumText(userData,computed);
      const json = await res.json();
      return json.text || demoPremiumText(userData,computed);
    } catch(e){
      console.warn('Backend call failed',e);
      return demoPremiumText(userData,computed);
    }
  }
}

// Local storage helpers
function saveUserData(userData){ localStorage.setItem('astroUser',JSON.stringify(userData)); }

// Event listeners
document.getElementById('btnCompute').addEventListener('click', async()=>{
  const userData={
    name: document.getElementById('nameInput').value || 'Anonim',
    dob: document.getElementById('dobInput').value,
    time: document.getElementById('timeInput').value || '00:00',
    place: document.getElementById('placeInput').value || ''
  };
  saveUserData(userData);
  const computed=composeSnapshotText(userData);
  document.getElementById('snapshotBox').innerText=computed.text;
  document.getElementById('statusText').innerText="Freemium snapshot izračunan!";
  const freeText=await generatePrediction('free',userData,computed);
  document.getElementById('snapshotBox').innerText+=`\n\n${freeText}`;
});

document.getElementById('btnPremium').addEventListener('click', async()=>{
  const userData=loadUserData();
  if(!userData){ alert('Najprej izračunaj svoj snapshot!'); return; }
  document.getElementById('statusText').innerText="Generiram premium napoved...";
  const computed=composeSnapshotText(userData);
  renderZodiacCards(computed.housesAssigned);
  const premium=await generatePrediction('premium',userData,computed);
  document.getElementById('snapshotBox').innerText=premium;
  document.getElementById('statusText').innerText="Premium napoved pripravljena!";
});
</script>