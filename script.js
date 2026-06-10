let score = 0;
let totalPoints = 0;
let clickPower = 1;
let multiplier = 1;

const buildings = {

    meetlat:{
        name:"📏 Meetlat",
        amount:0,
        cps:1,
        cost:15
    },

    joost:{
        name:"👨‍🏫 Meester Joost",
        amount:0,
        cps:5,
        cost:100
    },
    
    frans:{
        name:"🥐 Frans ",
        amount:0,
        cps:10,
        cost:250
    },
    schrift:{
        name:"📝 Nakijkstapel",
        amount:0,
        cps:25,
        cost:500
    },

    klas:{
        name:"🏫 Klaslokaal",
        amount:0,
        cps:100,
        cost:3000
    },

    school:{
        name:"🎓 School",
        amount:0,
        cps:500,
        cost:10000
    },

    bus:{
        name:"🚌 Schoolreis",
        amount:0,
        cps:2500,
        cost:50000
    },

    sport:{
        name:"⚽ Sportklassen Brugge ",
        amount:0,
        cps:4500,
        cost:100000
    },

    vrij:{
        name:"🆓 Vrijaf",
        amount:0,
        cps:6500,
        cost:500000
    },

    middelbaar:{
        name:"📚 Middelbaar",
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
    name:"✏️ Scherpe Potloden",
    cost:500,
    bought:false,
    action(){
        clickPower*=2;
    }
},

{
    name:"☕ Extra Koffie",
    cost:2500,
    bought:false,
    action(){
        multiplier*=2;
    }
},

{
    name:" 📖 Stagiair",
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
            "Eerste Les"
        );

    if(totalPoints >= 1000)
        addAchievement(
            "Krijtkampioen"
        );

    if(buildings.joost.amount >= 1)
        addAchievement(
            "Meester Joost Ingehuurd"
        );

    if(buildings.frans.amount >= 1)
        addAchievement(
            "Eerste franse les"
        );
    
    if(buildings.frans.amount >= 5)
        addAchievement(
            "Beau travail !"
        );
        
    if(buildings.middelbaar.amount >= 1)
        addAchievement(
            "Laatste examens 6de leerjaar geslaagd"
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
            "Lucky Meetlat!"
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

            score,
            totalPoints,
            clickPower,
            buildings,
            achievements,
            upgrades,

        })
    );

},5000);

const save =
JSON.parse(
    localStorage.getItem(
        "vicyburgerSave"
    )
);

if(save){

    score = save.score;
    totalPoints =
        save.totalPoints;

    clickPower =
        save.clickPower;

    Object.assign(
        buildings,
        save.buildings
    );

save.upgrades.forEach((savedUp, i) => {
    upgrades[i].bought = savedUp.bought;
});

}

function saveGame() {
    const gameState = {
        x: player.x,
        y: player.y,
        score: score
    };

    localStorage.setItem("savegame", JSON.stringify(gameState));
}



renderShop();
renderUpgrades();
update();