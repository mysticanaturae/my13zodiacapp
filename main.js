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

// =====================================================
// REFERENCE BIRTH – za skaliranje Moon in Asc
// =====================================================
const referenceBirth = {
    dob: "2000-01-01",  // referenčni datum za skaliranje
    time: "00:00",
    moon: "Oven",       // referenčna Luna
    asc: "Oven"         // referenčni Ascendent
};

// =====================================================
// Povezave do slik znakov
// =====================================================
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

// =====================================================
// 13-ZODIAK BERG SISTEM
// =====================================================
const zodiac13 = [
    "Oven","Bik","Dvojčka","Rak","Lev","Devica","Tehtnica",
    "Škorpijon","Ophiuchus","Strelec","Kozorog","Vodnar","Ribi"
];

// =====================================================
// BERG – TOČNE MEJE ZNAMENJ
// =====================================================
const bergIntervals = [
    { sign:"Oven",      start:"04-19", end:"05-13" },
    { sign:"Bik",       start:"05-14", end:"06-19" },
    { sign:"Dvojčka",   start:"06-20", end:"07-20" },
    { sign:"Rak",       start:"07-21", end:"08-09" },
    { sign:"Lev",       start:"08-10", end:"09-15" },
    { sign:"Devica",    start:"09-16", end:"10-30" },
    { sign:"Tehtnica",  start:"10-31", end:"11-22" },
    { sign:"Škorpijon", start:"11-23", end:"11-29" },
    { sign:"Ophiuchus", start:"11-30", end:"12-17" },
    { sign:"Strelec",   start:"12-18", end:"01-18" },
    { sign:"Kozorog",   start:"01-19", end:"02-15" },
    { sign:"Vodnar",    start:"02-16", end:"03-11" },
    { sign:"Ribi",      start:"03-12", end:"04-18" }
];

// =====================================================
// 13 HIŠ
// =====================================================
const houses13 = [
    { number:1,  name:"Hiša Sebstva",                ruler:"Oven",      description:"Osnova identitete, fizično telo, osebni izraz."},
    { number:2,  name:"Hiša Vrednosti",              ruler:"Bik",       description:"Finančni in materialni viri, notranje vrednote."},
    { number:3,  name:"Hiša Komunikacije",           ruler:"Dvojčka",   description:"Misli, učenje, komunikacija, lokalna izmenjava."},
    { number:4,  name:"Hiša Doma",                   ruler:"Rak",       description:"Družina, korenine, notranji svet in čustvena varnost."},
    { number:5,  name:"Hiša Kreativnosti",           ruler:"Lev",       description:"Ustvarjalnost, samozavest, ljubezen in otroci."},
    { number:6,  name:"Hiša Dela",                   ruler:"Devica",    description:"Rutina, zdravje, služenje, vsakodnevni ritem."},
    { number:7,  name:"Hiša Partnerstva",            ruler:"Tehtnica",  description:"Odnosi, partnerstva, ravnovesje in dogovori."},
    { number:8,  name:"Hiša Transformacije",         ruler:"Škorpijon", description:"Globoke spremembe, regeneracija, intimnost."},
    { number:9,  name:"Hiša Transparentnosti",       ruler:"Ophiuchus", description:"Samospoznanje, samoozdravitev, razkritje globokih resnic."},
    { number:10, name:"Hiša Potovanj in Filozofije", ruler:"Strelec",   description:"Potovanja, učenje, širjenje zavesti, višji cilji."},
    { number:11, name:"Hiša Karier",                 ruler:"Kozorog",   description:"Poklic, ambicije, struktura, dosežki."},
    { number:12, name:"Hiša Prijateljstev",          ruler:"Vodnar",    description:"Skupnosti, povezave, prihodnost, vizije."},
    { number:13, name:"Hiša Duše in Karmičnih Lekcij",ruler:"Ribi",     description:"Karma, nezavedno, skrivnosti, razsvetljenje."}
];

// --- Berg / IAU-like sign starts (v stopinjah ekliptike, index = Oven ... Ribi)
const SIGN_STARTS = [
  0.0,   // Oven (Aries) start
  33.0,  // Bik (Taurus)
  61.0,  // Dvojčka (Gemini)
  90.0,  // Rak (Cancer)
  118.0, // Lev (Leo)
  152.0, // Devica (Virgo)
  181.0, // Tehtnica (Libra)
  207.0, // Škorpijon (Scorpius)
  241.0, // Ophiuchus
  258.0, // Strelec (Sagittarius)
  283.0, // Kozorog (Capricorn)
  313.0, // Vodnar (Aquarius)
  333.0  // Ribi (Pisces)
];

// --- House cusps (točne cusp vrednosti, 0..360) - vnesene iz tvojih hišnih tabel
const HOUSE_CUSPS = [
  248.0186, // Cusp 1
  272.7486, // Cusp 2
  309.4716, // Cusp 3
  337.3196, // Cusp 4
  357.3696, // Cusp 5
  33.1826,  // Cusp 6
  77.1416,  // Cusp 7
  100.3786, // Cusp 8
  106.9696, // Cusp 9
  125.5696, // Cusp10
  158.9876, // Cusp11
  186.8196, // Cusp12
  210.9816  // Cusp13
];

function normalizeDeg(d){
  let r = d % 360;
  if(r < 0) r += 360;
  return r;
}

function inRangeWrapped(value, start, end){
  value = normalizeDeg(value);
  start = normalizeDeg(start);
  end = normalizeDeg(end);
  if(start <= end) return (value >= start && value < end);
  return (value >= start || value < end);
}

// poišče znak iz absolutne ekliptične dolžine (0..360) glede na SIGN_STARTS
function getSignFromLongitude(longDeg){
  const deg = normalizeDeg(longDeg);
  for(let i = SIGN_STARTS.length - 1; i >= 0; i--){
    const start = SIGN_STARTS[i];
    const next = SIGN_STARTS[(i+1) % SIGN_STARTS.length];
    // check wrap by comparing against start points (simple approach)
    if(inRangeWrapped(deg, start, next)) return zodiac13[i];
  }
  return zodiac13[0];
}

// poišče hišo iz absolutne dolžine po HOUSE_CUSPS (vrne 1..13)
function getHouseFromLongitude(longDeg){
  const deg = normalizeDeg(longDeg);
  const cusps = HOUSE_CUSPS.map(normalizeDeg);
  for(let i=0;i<cusps.length;i++){
    const start = cusps[i];
    const end = cusps[(i+1)%cusps.length];
    if(inRangeWrapped(deg, start, end)) return i+1;
  }
  return 1;
}

// nova composeSnapshotText, Berg-kompatibilna
function composeSnapshotText(userData){
  // 1) datetime
  const date = new Date(`${userData.dob}T${userData.time}`);

  // 2) Sonce – po Berg intervalih (MM-DD)
  const sun = getBergSunSign(date); // uporablja tvoje bergIntervals iz main.js

  // 3) LUNA – približno preko lunine faze na dan v letu → map na 13 znakov
  const yearStart = new Date(date.getFullYear(),0,1);
  const dayOfYear = Math.floor((date - yearStart)/(1000*60*60*24));
  const moonCycle = 29.530588853; // lunacija
  const moonPhase = (dayOfYear % moonCycle) / moonCycle;
  const moonIndex = Math.floor(moonPhase * 13) % 13;
  const moon = zodiac13[moonIndex];

  // 4) ASCENDENT – približno po lokalni uri (24h → 13 znakov)
  const birthHour = date.getHours() + (date.getMinutes()/60);
  const ascIndex = Math.floor((birthHour/24) * 13) % 13;
  const asc = zodiac13[ascIndex];

  // 5) HIŠE: dodeli glede na asc (poravnane z znaki)
  // Najprej poiščemo, kateri znak je asc in naredimo mapping hiš -> znak
  const ascSignIndex = zodiac13.indexOf(asc);
  const housesAssigned = houses13.map((h,i)=>({
    ...h,
    sign: zodiac13[(ascSignIndex + i) % 13]
  }));

  // 6) TEKST
  let text = `Izračun za: ${userData.name}\nDatum: ${userData.dob}\nUra: ${userData.time}\nKraj: ${userData.place}\n\n`;
  text += `🌞 Sonce: ${sun}\n🌙 Luna: ${moon}\n⬆️ Ascendent: ${asc}\n\nHiše:\n`;
  housesAssigned.forEach(h => {
    text += `${h.number}. ${h.name} — znak: ${h.sign} (vladar: ${h.ruler}) — ${h.description}\n`;
  });

  return { text, sun, moon, asc, housesAssigned };
}

// =====================================================
// RENDER KARTIC HIŠ
// =====================================================
function renderZodiacCards(housesAssigned, level='free'){
    const container = document.getElementById('signsRepeater');
    container.innerHTML = '';
    housesAssigned.forEach(h=>{
        const card = document.createElement('div');
        card.className = 'zodiacCard';
        let img = `<div class="imgContainer"><img src="${zodiacImages[h.ruler]}" class="rulerImage" alt="${h.ruler}">`;
        if(level==='premium') img += `<img src="${zodiacImages[h.sign]}" class="signImage" alt="${h.sign}">`;
        img += `</div>`;

        card.innerHTML = `
            <div class="houseName">${h.number}. ${h.name}</div>
            ${img}
            <div class="signRuler">
                <span>Znak: ${h.sign}</span>
                <span>Vladar: ${h.ruler}</span>
            </div>
            <div class="houseDescription">${h.description}</div>
        `;
        container.appendChild(card);
    });
}

// =====================================================
// GENERIRANJE NAPOVEDI
// =====================================================
async function generatePrediction(level, userData, computed){
    if(level==='free'){
        return `Danes za ${userData.name}: Sonce v ${computed.sun} prinaša jasnost, Luna v ${computed.moon} poglobitev, Ascendent v ${computed.asc} pa nove priložnosti.`;
    }

    const prompt = buildPremiumPrompt(userData, computed);
    try{
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
        return demoPremiumText(userData,computed);
    }
}

function demoPremiumText(userData,computed){
    const { sun, moon, asc, housesAssigned } = computed;
    let out = `🌟 PREMIUM (DEMO) za ${userData.name}\nSonce: ${sun}\nLuna: ${moon}\nAsc: ${asc}\n\nHiše:\n`;
    housesAssigned.forEach(h=>{
        out += `${h.number}. ${h.name} — ${h.sign}: ${h.description}\n`;
    });
    out += `\n(Opomba: poveži AI API za polno razlago.)`;
    return out;
}

function buildPremiumPrompt(userData, computed){
    const { name, dob, time, place } = userData;
    const { sun, moon, asc, housesAssigned } = computed;
    const houses = housesAssigned
        .map(h=>`${h.number}. ${h.name} — znak: ${h.sign} — ${h.description}`)
        .join('\n');

    return `
Ustvari mistično, personalizirano astrološko razlago za ${name}, rojeno ${dob} ob ${time} v kraju ${place}.
Sistem: 13 zodiakov Berg z Ophiuchusom kot 9. znamenjem.
Položaji:
- Sonce: ${sun}
- Luna: ${moon}
- Ascendent: ${asc}

Hiše:
${houses}

Vrnite:
1) Mističen, globok uvodni odstavek (max 450 znakov).
2) 13 praktičnih alfa-nalog (ena za vsako hišo).
3) Zaključno afirmacijo.

Ton: transformacijski, zdravilen, intuitiven.
Dolžina: do 900 znakov.
`;
}

// =====================================================
// EVENTI
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    renderZodiacCards(houses13,'free');
});

document.getElementById('btnCompute').addEventListener('click', async () => {
    const userData = {
        name: document.getElementById('nameInput').value || 'Anonim',
        dob:  document.getElementById('dobInput').value,
        time: document.getElementById('timeInput').value || '00:00',
        place:document.getElementById('placeInput').value || ''
    };
    saveUserData(userData);
    const computed = composeSnapshotText(userData);
    renderZodiacCards(computed.housesAssigned,'free');
    document.getElementById('snapshotBox').innerHTML = `<pre>${computed.text}</pre>`;
    document.getElementById('statusText').innerText = "Freemium izračun končan!";
    const freeText = await generatePrediction('free', userData, computed);
    document.getElementById('snapshotBox').innerHTML += `<pre>${freeText}</pre>`;
});

document.getElementById('btnPremium').addEventListener('click', async () => {
    const userData = loadUserData();
    if(!userData){
        alert("Najprej izračunaj svoj snapshot!");
        return;
    }
    document.getElementById('statusText').innerText = "Generiram premium razlago...";
    const computed = composeSnapshotText(userData);
    renderZodiacCards(computed.housesAssigned,'premium');
    const premium = await generatePrediction('premium', userData, computed);
    document.getElementById('snapshotBox').innerHTML = `<pre>${premium}</pre>`;
    document.getElementById('statusText').innerText = "Premium pripravljena!";
});
