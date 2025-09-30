let xp=0;
let health =100;
let gold = 50;
let currentWeapon = 0; //3 ways to create a variable var ,let, const.
let fighting;
let monsterHealth;

let inventory = ["stick"];

// var allows most amount of changing which might introduce bugs and const allows least amount of changing
const button1 = document.getElementById("button1"); //getting an element with id button1 from index.html
const  button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const text = document.getElementById("text");
const xpText = document.getElementById("xpText");
const healthText = document.getElementById("healthText");
const goldText = document.getElementById("goldText");
const monsterStats = document.getElementById("monsterStats");
const monsterNameText = document.getElementById("monsterName");
const monsterHealthText = document.getElementById("monsterHealth");

const weapons= [
    {
        name : "stick",
        power : 5
    },{
        name : "dagger",
        power : 30
    },{
        name : "claw hammer",
        power : 50
    },{
        name : "sword",
        power : 100
    }
];

const monsters =[
    {
        name :"slime",
        level:2,
        health:15
    },{
        name :"fanged beast",
        level:8,
        health:60
    },{
        name :"dragon",
        level:20,
        health:300
    }
]
//arrays cant store any data types . objects are similar to arrays .{} -> empty object which can consist key vale pair
const location=[
    {
        name: "town square",
        "button text": ["Go to the Store", "Enter the cave", "Fight the dragon"],
        "button function": [goStore, goCave, fightDragon],
        text: "you are in the town square you see a sign that says \"Store\" "
    },
    {
        name: "store",
        "button text": ["Buy 10 health for 10 gold","Buy weapon for 30 gold","Go to town square"],
        "button function": [buyHealth,buyWeapon,goTown],
        text:"you entered the store"
    },
    {
        name: "Cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button function": [fightSlime, fightBeast, goTown],
        text: "you entered the cave.now you can see some monsters"
    },
    {
        name:"fight",
        "button text":["Attack","Dodge","Run"],
        "button function": [attack,dodge,goTown],
        text:"you are fighting a monster."
    }
];

//initialize buttons
button1.addEventListener("click", goStore);
button2.addEventListener("click",goCave);
button3.addEventListener("click",fightDragon);

function update(location){
    //now after clicking go store button it is going to display 3 new button with following texts
    button1.innerHTML = location["button text"][0];
    button2.innerHTML = location["button text"][1];
    button3.innerHTML = location["button text"][2];
    //console.log("Going to store");

    //on clicking new buttons different functions are called
    button1.addEventListener("click", location["button function"][0]);
    button2.addEventListener("click",location["button function"][1]);
    button3.addEventListener("click",location["button function"][2]);
    text.innerText = location.text; // \" \" is called excaping
}

function goTown() {
    update(location[0]);
}
function goStore() {
    update(location[1]);
}
function goCave() {
    update(location[2]);
}

function buyHealth() {
    if (gold >= 10){
        gold = gold-10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }
    else{
        text.innerText = "Do not posses enough gold to buy health";
    }
}
function buyWeapon() {
    if( currentWeapon < weapons.length-1 ){
        if (gold >= 30){
            gold -= 30;
            currentWeapon++; //add 1 cause user is buying next weapon in the weapons array
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name
            text.innerText = "you now have a new "+ newWeapon;
            inventory.push(newWeapon)//updating inventory
            text.innerText+= "In your inventory you have : "+inventory;
        }
        else{
            text.innerText = "Do not posses enough gold to buy Weapon";
        }
    }
    else{
        text.innerText = "You already posses the strongest weapon";
        button2.innerText="Sell weapon for 15 gold"
        button2.addEventListener("click", sellWeapon);
    }
}
function sellWeapon(){
    if (inventory.length > 1){
        gold+=15
        goldText.innerText = gold;
        let currentWeapon= inventory.shift(); //we already have a current Weapon
        // but since we are using let the scope of this weapon is upto this if statement only
        text.innerText="you sold a "+currentWeapon;
        text.innerText+= "In your inventory you have : "+inventory;
    }
    else{
        text.innerText = "dont sell you only weapon";
    }
}
function fightSlime(){
    fighting=0;
    goFight();
}
function fightBeast() {
    fighting=1;
    goFight();
}
function fightDragon(){
    fighting=2;
    goFight();
}
function goFight(){
    update(location[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterHealth.innerHTML = monsters[fighting].name;
    monsterHealth.innerHTML = monsterHealth;
}
function attack(){}
function dodge(){}
