let version = 4;
let score = 0;
let totalPoints = 0;
let clickPower = 1;
let multiplier = 1;

const buildings = {

     kok:{
        name:"👨‍🍳 Kok",
        amount:0,
        cps:1,
        cost:15
    },

    grilstation:{
        name:"🔥 Grillstation",
        amount:0,
        cps:5,
        cost:100
    },
    
    burgerkraam:{
        name:"🏪 Burgerkraam ",
        amount:0,
        cps:10,
        cost:250
    },

    restaurant:{
        name:"🍔 Fastfoodrestaurant",
        amount:0,
        cps:25,
        cost:500
    },

    robot:{
        name:"🤖 Burgerrobot",
        amount:0,
        cps:100,
        cost:3000
    },

    fabriek:{
        name:"🏭 Burgerfabriek",
        amount:0,
        cps:500,
        cost:10000
    },

    kantoor:{
        name:"🏢 Burger Hoofdkantoor",
        amount:0,
        cps:2500,
        cost:50000
    },

     festival:{
        name:"🎪 Burgerfestival ",
        amount:0,
        cps:4500,
        cost:100000
    },

    wereldwijd:{
        name:"🌍 Wereldwijde Franchise",
        amount:0,
        cps:6500,
        cost:500000
    },

    labaratorium:{
        name:"🧪 Burgerlaboratorium",
        amount:0,
        cps:7500,
        cost:1000000
    }


};

const achievements = [];

function addAchievement(text){

    if(achievements.includes(text)) return;

    achievements.push(text);

    const div = document.createElement("div");

    div.innerText = "🏆 " + text;

    document
        .getElementById("achievements")
        .appendChild(div);
}

const bought_upgrades = [];

// function addUpgrade(up){

//     if(bought_upgrades.includes(up)) return;

//     bought_upgrades.push(up);

//     const div = document.createElement("div");

//     div.innerText = "🏅 " + up.name;

//     document
//         .getElementById("bought_upgrades")
//         .appendChild(div);
// }

function calculateCPS(){

    let cps = 0;

    for(let b in buildings){

        cps +=
            buildings[b].amount *
            buildings[b].cps;
    }

    return cps;
}

function update(){

    document
        .getElementById("score")
        .innerText =
        Math.floor(score) + " punten";

    document
        .getElementById("cps")
        .innerText =
        calculateCPS() + " per seconde";

    document
        .getElementById("totalPoints")
        .innerText =
        Math.floor(totalPoints);

    document
        .getElementById("clickPowerText")
        .innerText =
        clickPower;

    renderShop();
}

function floating(x,y,text){

    const d =
        document.createElement("div");

    d.className = "floating";

    d.innerText = text;

    d.style.left = x+"px";
    d.style.top = y+"px";

    document.body.appendChild(d);

    let pos = y;

    const anim =
        setInterval(()=>{

            pos -= 2;

            d.style.top = pos+"px";

        },16);

    setTimeout(()=>{

        clearInterval(anim);

        d.remove();

    },1000);
}

document
.getElementById("vcb")
.onclick = e => {

    score += clickPower * multiplier;

    totalPoints += clickPower;

    floating(
        e.clientX,
        e.clientY,
        "+"+(clickPower*multiplier)
    );

    update();
};

function buy(id){

    const b = buildings[id];

    if(score < b.cost) return;

    score = score - b.cost;

    b.amount = b.amount + 1;

    b.cost =
        Math.floor(b.cost * 1.15);

    update();
}

function renderShop(){

    const shop =
        document.getElementById("shop");

    shop.innerHTML = "";

    for(let id in buildings){

        const b = buildings[id];

        const div =
            document.createElement("div");

        div.className =
            "shopItem";

        div.innerHTML = `
            <b>${b.name}</b><br>
            Aantal: ${b.amount}<br>
            +${b.cps}/s<br>
            Kosten: ${Math.floor(b.cost)}
        `;

        div.onclick =
            ()=>buy(id);

        shop.appendChild(div);
    }
}

const upgrades = [

{
    name:"🧀 Extra Kaas",
    cost:500,
    bought:false,
    action(){
        clickPower*=2;
    }
},

{
    name:"🥓 Krokant Spek",
    cost:2500,
    bought:false,
    action(){
        multiplier*=2;
    }
},

{
    name:"🥒 Dubbele Augurk",
    cost:5000,
    bought:false,
    action(){
        multiplier = multiplier * 4;
    }
} ];

// function renderUpgrades(){

//     const box =
//         document.getElementById(
//             "upgrades"
//         );

//     box.innerHTML="";

//     upgrades.forEach(up=>{

//         if(up.bought) return;

//         const div =
//             document.createElement("div");

//         div.className =
//             "upgrade";

//         div.innerHTML =
//             up.name +
//             "<br>Kosten: "+
//             up.cost;

//         div.onclick = ()=>{

//             if(score < up.cost)
//                 return;

//             score -= up.cost;

//             up.bought = true;

//             up.action();

//             renderUpgrades();

//             update();
//         };

//         box.appendChild(div);
//     });
// }
function renderUpgrades() {

    const shop = document.getElementById("upgrades");
    const boughtBox = document.getElementById("bought_upgrades");

    shop.innerHTML = "";
    boughtBox.innerHTML = "";

    upgrades.forEach(up => {

        if (up.bought) {
            const div = document.createElement("div");
            div.innerText = "🏅 " + up.name;
            boughtBox.appendChild(div);
            return;
        }

        const div = document.createElement("div");
        div.className = "upgrade";

        div.innerHTML = `
            ${up.name}<br>
            Kosten: ${up.cost}
        `;

        div.onclick = () => {

            if (score < up.cost) return;

            score -= up.cost;
            up.bought = true;
            up.action();

            renderUpgrades();
            update();
        };

        shop.appendChild(div);
    });
}

setInterval(()=>{

    score +=
        calculateCPS()
        * multiplier;

    totalPoints +=
        calculateCPS()
        * multiplier;

    update();

},1000);

setInterval(()=>{

    if(totalPoints >= 1)
        addAchievement(
            "Eerste burger"
        );

    if(totalPoints >= 1000)
        addAchievement(
            "een echte burger routine"
        );

    if(buildings.kok.amount >= 10)
        addAchievement(
            "Een echte keuken"
        );

    if(buildings.grilstation.amount >= 1)
        addAchievement(
            "Griller Ingehuurd"
        );
        
    if(buildings.restaurant.amount >= 1)
        addAchievement(
            "een echte hype aan het worden"
        );


},1000);

const golden =
document.getElementById(
    "goldenRuler"
);

function spawnGolden(){

    golden.style.display =
        "block";

    golden.style.left =
        Math.random() *
        (window.innerWidth-100)
        +"px";

    golden.style.top =
        Math.random() *
        (window.innerHeight-100)
        +"px";

    setTimeout(()=>{

        golden.style.display =
            "none";

    },10000);
}

setInterval(()=>{

    if(Math.random()<0.15)
        spawnGolden();

},30000);

golden.onclick = ()=>{

    golden.style.display =
        "none";

    const r =
        Math.floor(
            Math.random()*4
        );

    if(r===0){

        score += 777;

        alert(
            "Lucky Burger!"
        );

    }else if(r===1){

        multiplier = 7;

        alert(
            "Frenzy!"
        );

        setTimeout(()=>{

            multiplier = 1;

        },30000);

    }else if(r===2){

        score +=
            calculateCPS()*300;

        alert(
            "Jackpot!"
        );

    }else{

        clickPower*=7;

        alert(
            "Klik Frenzy!"
        );

        setTimeout(()=>{

            clickPower=
            Math.max(
                1,
                clickPower/7
            );

        },30000);
    }

    update();
};

setInterval(()=>{

    localStorage.setItem(
        "vicyburgerSave",

        JSON.stringify({
            version,
            score,
            totalPoints,
            clickPower,
            buildings,
            achievements,
            upgrades,

        })
    );
    
},5000);

const saveRaw = localStorage.getItem("vicyburgerSave");
let save = null;

try {
    save = JSON.parse(saveRaw);
} catch (e) {
    save = null;
}

if (save) {
    // If the save matches the current version, restore state.
    // If versions differ, discard the old save so outdated values aren't applied.
    if (save.version === version) {
        score = save.score || 0;
        totalPoints = save.totalPoints || 0;
        clickPower = save.clickPower || 1;

        Object.assign(buildings, save.buildings || {});

        if (Array.isArray(save.upgrades)) {
            save.upgrades.forEach((savedUp, i) => {
                if (upgrades[i]) upgrades[i].bought = !!savedUp.bought;
            });
        }
    } else {
        // Remove incompatible save to avoid confusion on next load
        // and reset in-memory state so the UI shows defaults immediately.
        console.warn("Discarding old save (version "+ (save.version) +") — expected version "+ version);
        localStorage.removeItem("vicyburgerSave");
        save = null;

        // reset runtime state to defaults
        score = 0;
        totalPoints = 0;
        clickPower = 1;
        multiplier = 1;

        // reset buildings amounts to 0 (keep base cps/costs as defined above)
        for (let id in buildings) {
            if (Object.prototype.hasOwnProperty.call(buildings, id)) {
                buildings[id].amount = 0;
            }
        }

        // reset upgrades bought flags
        upgrades.forEach(up => up.bought = false);

        // clear achievements
        achievements.length = 0;

        // update UI immediately
        renderShop();
        renderUpgrades();
        update();
    }
}

// function saveGame() {
//     const gameState = {
//         x: player.x,
//         y: player.y,
//         score: score
//     };

//     localStorage.setItem("vicyburgerSave", JSON.stringify(gameState));
// }

function resetToDefaults() {
    score = 0;
    totalPoints = 0;
    clickPower = 1;
    multiplier = 1;

    for (let id in buildings) {
        if (Object.prototype.hasOwnProperty.call(buildings, id)) {
            buildings[id].amount = 0;
            // Optionally reset cost to base values if you store them elsewhere
        }
    }

    upgrades.forEach(up => up.bought = false);
    achievements.length = 0;

    renderShop();
    renderUpgrades();
    update();
}

function checkSaveVersion() {
    const raw = localStorage.getItem("vicyburgerSave");
    if (!raw) return;

    let s = null;
    try {
        s = JSON.parse(raw);
    } catch (e) {
        return;
    }

    if (s && s.version !== version) {
        console.warn("Detected incompatible save version (" + s.version + "), expected " + version + ". Resetting save and game state.");
        localStorage.removeItem("vicyburgerSave");
        resetToDefaults();
    }
}

// Watch for changes to the save (from other tabs or runtime changes)
window.addEventListener("storage", (e) => {
    if (e.key === "vicyburgerSave") checkSaveVersion();
});

// Periodically ensure a mismatched save doesn't persist while the page is open
setInterval(checkSaveVersion, 3000);

localStorage.removeItem("jufAnneSave");
// localStorage.removeItem("vicyburgerSave");

renderShop();
renderUpgrades();
update();