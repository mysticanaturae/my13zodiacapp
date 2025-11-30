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
// ZODIAK SLIKE
// =====================================================
const zodiacImages = {
    "Oven":"https://static.wixstatic.com/media/7535eb_4686ee40d73541afb9116473eed4cf64~mv2.png",
    "Bik":"https://static.wixstatic.com/media/7535eb_51af61b776b3483b9776bb203f4dd949~mv2.png",
    "Dvojčka":"https://static.wixstatic.com/media/7535eb_38e1fd146cc64ed4b5c203b54ad3c3ef~mv2.png",
    "Rak":"https://static.wixstatic.com/media/7535eb_04c1dad8d7a54fe9ba73e43d4fb8c96c~mv2.png",
    "Lev":"https://static.wixstatic.com/media/7535eb_63ae5332c9bf47b1a17d2c4063edfa12~mv2.png",
    "Devica":"https://static.wixstatic.com/media/7535eb_a86a4eafaa274b77bc2df05b5e634930~mv2.png",
    "Tehtnica":https://static.wixstatic.com/media/7535eb_81207ec70cae4e23aada067d793eb455~mv2.png,
    "Škorpijon":"https://static.wixstatic.com/media/7535eb_0bb8888d2ef04fdfbb773d4108fb6eac~mv2.png",
    "Ophiuchus":"https://static.wixstatic.com/media/7535eb_8d4b7558ec1545d2a4825fe05a3d5850~mv2.png",
    "Strelec":"https://static.wixstatic.com/media/7535eb_1411795fb0764a09a023179c9eff21d0~mv2.png",
    "Kozorog":"https://static.wixstatic.com/media/7535eb_22eddfb8f65644019f99ec7f083e0b5e~mv2.png",
    "Vodnar":"https://static.wixstatic.com/media/7535eb_f8efc8ce37a64367b6bf8f74b7c8670f~mv2.png",
    "Ribi":"https://static.wixstatic.com/media/7535eb_89ce0c6de1324a7394193b0409c18dc1~mv2.png"
};

// =====================================================
// 13 HIŠ
// =====================================================
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

// =====================================================
// 13-ZODIAK IZRAČUN (Sonce, Luna, Ascendent)
// =====================================================
const zodiac13 = [
    { name: "Oven", start: 0 },
    { name: "Bik", start: 30 },
    { name: "Dvojčka", start: 60 },
    { name: "Rak", start: 90 },
    { name: "Lev", start: 120 },
    { name: "Devica", start: 150 },
    { name: "Tehtnica", start: 180 },
    { name: "Škorpijon", start: 210 },
    { name: "Ophiuchus", start: 240 },
    { name: "Strelec", start: 258 },
    { name: "Kozorog", start: 288 },
    { name: "Vodnar", start: 318 },
    { name: "Ribi", start: 348 }
];

// SONCE
function getSunSign(date) {
    const startYear = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((date - startYear) / (1000 * 60 * 60 * 24));
    const degree = (dayOfYear / 365) * 360;
    for (let i = zodiac13.length - 1; i >= 0; i--) {
        if (degree >= zodiac13[i].start) return zodiac13[i].name;
    }
    return "Oven";
}

// LUNA
function getMoonSign(date) {
    const synodicMonth = 29.5306;
    const base = new Date("2001-01-01");
    const days = (date - base) / (1000 * 60 * 60 * 24);
    const moonDegree = (days % synodicMonth) * (360 / synodicMonth);
    for (let i = zodiac13.length - 1; i >= 0; i--) {
        if (moonDegree >= zodiac13[i].start) return zodiac13[i].name;
    }
    return "Oven";
}

// ASCENDENT
function getAscendant(date, latitude, longitude) {
    const hours = date.getUTCHours() + (date.getUTCMinutes() / 60);
    const lst = (100.46 + 0.985647 * ((date - new Date(date.getUTCFullYear(),0,1)) / (1000*3600*24))
                 + longitude + 15 * hours) % 360;
    const ascDegree =
        (Math.atan2(
            Math.sin(lst * Math.PI/180),
            Math.cos(lst * Math.PI/180) * Math.sin(latitude * Math.PI/180)
        )) * 180 / Math.PI;
    const degree = (ascDegree + 360) % 360;
    for (let i = zodiac13.length - 1; i >= 0; i--) {
        if (degree >= zodiac13[i].start) return zodiac13[i].name;
    }
    return "Oven";
}

// =====================================================
// SNAPSHOT
// =====================================================
function composeSnapshotText(userData, astro) {
    return {
        text:
`Izračun za: ${userData.name}
Datum: ${userData.dob}
Ura: ${userData.time}
Kraj: ${userData.place}

🌞 Sonce: ${astro.sun}
🌙 Luna: ${astro.moon}
⬆️ Ascendent: ${astro.asc}
`,
        housesAssigned: [...houses13]
    };
}

// =====================================================
// IZRIS ZODIAK KARTIC (vidne ves čas)
// =====================================================
function renderZodiacCards(housesAssigned) {
    const container = document.getElementById('signsRepeater');
    container.innerHTML = '';
    housesAssigned.forEach(h => {
        const card = document.createElement('div');
        card.style = "background:#333; border-radius:12px; padding:15px; text-align:center; box-shadow:2px 2px 12px rgba(0,0,0,0.3); color:#fff; margin:8px;";
        card.innerHTML = `
            <img src="${zodiacImages[h.ruler]}" style="width:80px;height:80px;border-radius:50%;margin-bottom:10px;">
            <h3 style="color:#6c63ff;">${h.ruler}</h3>
            <strong>${h.number}. ${h.name}</strong><br>
            <p style="font-size:12px;">${h.description}</p>
        `;
        container.appendChild(card);
    });
}

// =====================================================
// OPENAI NAPOVED
// =====================================================
async function generatePrediction(level, userData, computed){
  const { sun, moon, asc, housesAssigned } = computed;

  if(level === 'free'){
    return `Danes za ${userData.name}: Sonce v ${sun} vabi k jasnosti, Luna v ${moon} podpira čustveno preobrazbo, Ascendent v ${asc} odpira vrata priložnostim.`;
  }

  // PREMIUM
  try {
    const res = await fetch('/api/generateforecast', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({
        snapshot: {
          sun,
          moon,
          asc,
          houses: housesAssigned,
          raw: computed.text,
          userData
        },
        premium: true
      })
    });

    const data = await res.json();

    if(data?.choices?.[0]?.message?.content){
      return data.choices[0].message.content;
    }

    return demoPremiumText(userData, computed);

  } catch(err){
    console.error("Premium fetch failed", err);
    return demoPremiumText(userData, computed);
  }
}

// =====================================================
// BUTTON: FREE
// =====================================================
document.getElementById('btnCompute').addEventListener('click', async () => {
    const userData = {
        name: document.getElementById('nameInput').value || 'Anonim',
        dob: document.getElementById('dobInput').value,
        time: document.getElementById('timeInput').value || '00:00',
        place: document.getElementById('placeInput').value || ''
    };
    saveUserData(userData);

    const date = new Date(`${userData.dob}T${userData.time}`);
    const latitude = 46.0569;
    const longitude = 14.5058;

    const astro = {
        sun: getSunSign(date),
        moon: getMoonSign(date),
        asc: getAscendant(date, latitude, longitude)
    };

    const computed = composeSnapshotText(userData, astro);
    document.getElementById('snapshotBox').innerText = computed.text;
    renderZodiacCards(computed.housesAssigned);

    const freeText = await generatePrediction("free", userData, computed, astro);
    document.getElementById('snapshotBox').innerText += `\n${freeText}`;
});

// =====================================================
// BUTTON: PREMIUM
// =====================================================
document.getElementById('btnPremium').addEventListener('click', async () => {
    let userData = loadUserData();
    if (!userData) { alert("Najprej izračunaj svoj snapshot!"); return; }

    const date = new Date(`${userData.dob}T${userData.time}`);
    const latitude = 46.0569;
    const longitude = 14.5058;

    const astro = {
        sun: getSunSign(date),
        moon: getMoonSign(date),
        asc: getAscendant(date, latitude, longitude)
    };

    const computed = composeSnapshotText(userData, astro);
    renderZodiacCards(computed.housesAssigned);

    const premiumText = await generatePrediction("premium", userData, computed, astro);
    document.getElementById('snapshotBox').innerText = premiumText;
});
