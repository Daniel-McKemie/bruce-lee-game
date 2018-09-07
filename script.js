// Movement/collision detection borrowed from Eric Lewis' article:
// https://wakeful-baritone.glitch.me/

const hero = { x: 0, y: 0 };


// Brick placement & for loop to place
let bricks = [
    { x: 19, y: 11 },

];
for (let i = 0; i < 39; i++) {
    bricks.push({
        x: Math.floor(Math.random() * 18) + 2,
        y: Math.floor(Math.random() * 10) + 1,
    })
};


// Treasure Chest placement & for loop to place
let chests = [
    { x: 4, y: 8 },

];
for (let i = 0; i < 6; i++) {
    chests.push({
        x: Math.floor(Math.random() * 18) + 2,
        y: Math.floor(Math.random() * 10) + 1,
    })
};


// Enemy placement
const enemies = [
    { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 10 + 1), Name: 'Gene' },
    { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 10 + 1), Name: 'Paul' },
    { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 10 + 1), Name: 'Ace' },
    { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 10 + 1), Name: 'Peter' },
    { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 10 + 1), Name: 'Bruce' },
    { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 10 + 1), Name: 'Vinnie' }

];


// Life Count box
const heroLifeBox = document.getElementsByClassName('hero-hp js-hp');
const enemyLifeBox = document.getElementsByClassName('enemy-hp js-hp');

let bruceLeeHP = 0;
let kissArmyHP = 0;
// Hero's life
let heroHP = function(x) {
    let value = parseInt(heroLifeBox.value, 10);
    value = isNaN(value) ? 0 : value;
    value += x
    heroLifeBox.value = value;
    heroLifeBox[0].innerHTML = value;
    bruceLeeHP = value;
};
heroHP(30);


function enemyHP(x) {
    let value = parseInt(enemyLifeBox.value, 10);
    value = isNaN(value) ? 0 : value;
    value += x
    enemyLifeBox.value = value;
    enemyLifeBox[0].innerHTML = value;
    kissArmyHP = value;

}


// Brick rendering
function renderBricks() {
    for (let i = 0; i < bricks.length; i++) {
        const brick = bricks[i];
        const brickElement = document.createElement('div');
        brickElement.className = 'brick';
        brickElement.style.left = (brick.x * 10).toString() + 'px';
        brickElement.style.top = (brick.y * 10).toString() + 'px';
        document.getElementsByClassName('board')[0].appendChild(brickElement);
        // CHANGE THIS FOR RESPONSIVENESS (from px to vh/vw)
    }
};
renderBricks();


// Treasure chest rendering
function renderChests() {
    for (let i = 0; i < chests.length; i++) {
        const chest = chests[i];
        closedChestElement = document.createElement('div');
        closedChestElement.className = 'chest chest-closed';
        closedChestElement.style.left = (chest.x * 10).toString() + 'px';
        closedChestElement.style.top = (chest.y * 10).toString() + 'px';
        document.getElementsByClassName('board')[0].appendChild(closedChestElement);
        // CHANGE THIS FOR RESPONSIVENESS (from px to vh/vw)
    }

};
renderChests();

function renderEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        livingEnemyElement = document.createElement('div');
        livingEnemyElement.className = ('enemy enemy-living');
        switch (enemy.Name) {
            case 'Gene':
                livingEnemyElement.id = ('gene');
                break;
            case 'Paul':
                livingEnemyElement.id = ('paul');
                break;
            case 'Ace':
                livingEnemyElement.id = ('ace');
                break;
            case 'Peter':
                livingEnemyElement.id = ('peter');
                break;
            case 'Bruce':
                livingEnemyElement.id = ('bruce');
                break;
            case 'Vinnie':
                livingEnemyElement.id = ('vinnie');
                break;
            default:
                console.log('No!')
        }
        livingEnemyElement.style.left = (enemy.x * 10).toString() + 'px';
        livingEnemyElement.style.top = (enemy.y * 10).toString() + 'px';
        document.getElementsByClassName('board')[0].appendChild(livingEnemyElement);
        // CHANGE THIS FOR RESPONSIVENESS (from px to vh/vw)
    }

};
renderEnemies();

// Prevent any two items from layering.  Preventative


// hero layering built in to random locations of objects.
function preventBrickLayering(x, y) { // Gives enemies priority
    for (let i = 0; i < bricks.length; i++) {
        const brick = bricks[i];
        if (brick.x == x && brick.y == y) {
            doneBrick = document.getElementsByClassName('brick');
            doneBrick[i].remove()
            bricks.splice(i, 1);
        }
    }
}

function preventChestLayering(x, y) {
    for (let i = 0; i < chests.length; i++) {
        const chest = chests[i];
        if (chest.x == x && chest.y == y) {
            doneChest = document.getElementsByClassName('chest chest-closed');
            doneChest[i].remove()
            chests.splice(i, 1);
        }
    }
}


for (let i = 0; i < enemies.length; i++) {
    preventBrickLayering(enemies[i].x, enemies[i].y)
    preventChestLayering(enemies[i].x, enemies[i].y)
};

for (let i = 0; i < chests.length; i++) {
    preventBrickLayering(chests[i].x, chests[i].y)
};




// Sets coordinates of dungeon
const isCoordinateInGrid = function(x, y) {
    if (x < 0 || y < 0 || x > 19 || y > 11) {
        return false
    }
    return true
};

// Check for brick each move
const isBrickInCoordinate = function(x, y) {
    for (let i = 0; i < bricks.length; i++) {
        const brick = bricks[i];
        if (brick.x == x && brick.y == y) {
            return true
        }
    }
    return false
};

// Checks for treasure chest each move
const isChestInCoordinate = function(x, y) {
    for (let i = 0; i < chests.length; i++) {
        const chest = chests[i];
        if (chest.x == x && chest.y == y) {
            return true
        }
    }
    return false
};

const isEnemyInCoordinate = function(x, y) {
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        if (enemy.x == x && enemy.y == y) {
            return true
        }
    }
    return false
};


// Changes chest from close to open
function changeChestClass(x, y) {
    for (let i = 0; i < chests.length; i++) {
        const chest = chests[i];
        if (chest.x == x && chest.y == y) {
            doneChest = document.getElementsByClassName('chest chest-closed');
            doneChest[i].remove()
            chests.splice(i, 1);
            openChestElement = document.createElement('div');
            openChestElement.className = 'chest chest-open';
            openChestElement.style.left = (chest.x * 10).toString() + 'px';
            openChestElement.style.top = (chest.y * 10).toString() + 'px';
            document.getElementsByClassName('board')[0].appendChild(openChestElement);
        }
    }
}

// Changes enemy from living to dead
function changeEnemyClass(x, y) {
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        if (enemy.x == x && enemy.y == y) {
            doneEnemy = document.getElementsByClassName('enemy enemy-living');
            doneEnemy[i].remove()
            enemies.splice(i, 1);
            deadEnemyElement = document.createElement('div');
            deadEnemyElement.className = 'enemy enemy-dead';
            deadEnemyElement.style.left = (enemy.x * 10).toString() + 'px';
            deadEnemyElement.style.top = (enemy.y * 10).toString() + 'px';
            document.getElementsByClassName('board')[0].appendChild(deadEnemyElement);
        }
    }
}


// Fill out possible treasure chest contents
function treasureChest() {
    let diceRoll = Math.floor(Math.random() * 2);
    switch (diceRoll) {
        case 0:
            heroHP(20);
            break;
        case 1:
            heroHP(-3);
            break;
        case 2:
            heroHP(5);
            break;
    }

}

// Global buttons and text for hero
let fightElement = document.createElement('div')
fightElement.className = 'scroll scroll-content';
let fightText = null;
const fightButton1 = document.createElement('div');
fightButton1.className = 'scroll-button';
const fightButton2 = document.createElement('div');
fightButton2.className = 'scroll-button';
const fightButton3 = document.createElement('div');
fightButton3.className = 'scroll-button';
const fightButton4 = document.createElement('div');
fightButton4.className = 'scroll-button';
let fightButtonText1 = document.createTextNode('Punch');
let fightButtonText2 = document.createTextNode('Low Kick');
let fightButtonText3 = document.createTextNode('Roundhouse');
let fightButtonText4 = document.createTextNode('Dragonstomp');

function appendFightButtons() {
    fightElement.appendChild(fightText);
    document.getElementsByClassName('board')[0].appendChild(fightElement);
    fightButton1.appendChild(fightButtonText1);
    fightElement.appendChild(fightButton1);
    fightButton2.appendChild(fightButtonText2);
    fightElement.appendChild(fightButton2);
    fightButton3.appendChild(fightButtonText3);
    fightElement.appendChild(fightButton3);
    fightButton4.appendChild(fightButtonText4);
    fightElement.appendChild(fightButton4);
}

let turn = 0;
// Fighting scenes
function heroTurn(enemy) {
    // Hero's Turn
    // Fill out Listeners appropriately!!!
    // FIX HeroHP
    if (turn % 2 === 0) {
        console.log('Your turn!')
        fightButton1.addEventListener('click', function() {
            let heroDiceRoll = Math.floor(Math.random() * 6)
            switch (heroDiceRoll) {
                case 0:
                case 1:
                case 2:
                case 3:
                    alert('Hit!');
                    enemyHP(-10);
                    turn++;
                    enemyTurn(enemy);
                    break;
                case 4:
                    alert('Nice! Extra hard punch!')
                    enemyHP(-15);
                    turn++;
                    enemyTurn(enemy);
                    break;
                case 5:
                    alert('You missed!');
                    turn++;
                    enemyTurn(enemy);
                    break;
            }
        })
        fightButton2.addEventListener('click', function() {
            let diceRoll = Math.floor(Math.random() * 4)
            switch (diceRoll) {
                case 0:
                    enemyHP(-20);
                    enemyTurn(enemy);
                    break;
                case 1:
                    enemyHP(-5);
                    enemyTurn(enemy);
                    break;
                default:
                    console.log('No!')
            }
        })
        fightButton3.addEventListener('click', function() {
            let diceRoll = Math.floor(Math.random() * 2)
            switch (diceRoll) {
                case 0:
                    enemyHP(-20);
                    enemyTurn(enemy);
                    break;
                case 1:
                    enemyHP(-5);
                    enemyTurn(enemy);
                    break;
                default:
                    console.log('No!')
            }
        })
        fightButton4.addEventListener('click', function() {
            let diceRoll = Math.floor(Math.random() * 2)
            switch (diceRoll) {
                case 0:
                    enemyHP(-20);
                    enemyTurn(enemy);
                    break;
                case 1:
                    enemyHP(-5);
                    enemyTurn(enemy);
                    break;
                default:
                    console.log('No!')
            }
        })
    } else if (turn !== 0) {
        turn++
        enemyTurn(enemy);
    }
}



function enemyTurn(enemy) {
    switch (enemy) {
        case 'Gene':
            let geneDiceRoll = Math.floor(Math.random() * 2)
            switch (geneDiceRoll) {
                case 0:
                    alert('You got hit!')
                    heroHP(-20);
                    turn++;
                    break;
                case 1:
                    alert('Got hit soft!')
                    heroHP(-5);
                    turn++;
                    break;

            }
            break;
        case 'Paul':
            let paulDiceRoll = Math.floor(Math.random() * 2)
            switch (paulDiceRoll) {
                case 0:
                    console.log('You got hit!');
                    heroHP(-20);
                    turn++
                    break;
                case 1:
                    console.log('Gene hit soft!');
                    heroHP(-5);
                    turn++
                    break;

            }
            break;
        case 'Ace':
            let aceDiceRoll = Math.floor(Math.random() * 2)
            switch (aceDiceRoll) {
                case 0:
                    console.log('You got hit!');
                    heroHP(-20);
                    turn++
                    break;
                case 1:
                    console.log('Gene hit soft!');
                    heroHP(-5);
                    turn++
                    break;

            }
            break;
        case 'Peter':
            let peterDiceRoll = Math.floor(Math.random() * 2)
            switch (peterDiceRoll) {
                case 0:
                    console.log('You got hit!');
                    heroHP(-20);
                    turn++
                    break;
                case 1:
                    console.log('Gene hit soft!');
                    heroHP(-5);
                    turn++
                    break;

            }
            break;
        case 'Bruce':
            let bruceDiceRoll = Math.floor(Math.random() * 2)
            switch (bruceDiceRoll) {
                case 0:
                    console.log('You got hit!');
                    heroHP(-20);
                    turn++
                    break;
                case 1:
                    console.log('Gene hit soft!');
                    heroHP(-5);
                    turn++
                    break;

            }
            break;
        case 'Vinnie':
            let vinnieDiceRoll = Math.floor(Math.random() * 2)
            switch (vinnieDiceRoll) {
                case 0:
                    console.log('You got hit!');
                    heroHP(-20);
                    turn++
                    break;
                case 1:
                    console.log('Gene hit soft!');
                    heroHP(-5);
                    turn++
                    break;

            }
            break;

    }
    checkWinner()
}

function checkWinner() {
    if (bruceLeeHP <= 0) {
        alert('You died')
        // write reset function
    }
    if (kissArmyHP <= 0) {
        alert('Enemy died!')
        changeEnemyClass(hero.x, hero.y)
    }
}

// Sends to appropriate fight scene
function enemyFight(x, y) {
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        if (enemy.x == x && enemy.y == y) {
            switch (enemy.Name) {
                case 'Gene':
                    heroTurn('Gene');
                    enemyHP(10);
                    fightText = document.createTextNode('The grand and noble leader, with an always fledgling reality TV career, is mad because you are making fun of his band.  Get ready to battle!!!');
                    appendFightButtons()
                    break;
                case 'Paul':
                    heroTurn('Paul');
                    enemyHP(40);
                    fightText = document.createTextNode('Paul Stanley descended upon you like a star falling from the sky!');
                    appendFightButtons()
                    break;
                case 'Ace':
                    heroTurn('Ace');
                    enemyHP(30);
                    fightText = document.createTextNode('That\'s not Sting...That\'s Ace Frehley! And he\'s ready to rumble!');
                    appendFightButtons()
                    break;
                case 'Peter':
                    heroTurn('Peter');
                    enemyHP(20);
                    fightText = document.createTextNode('This weird cat lookin\' dude just threw a drumstick at you!  Peter Criss wants to fight!');
                    appendFightButtons()
                    break;
                case 'Bruce':
                    heroTurn('Bruce');
                    enemyHP(10);
                    fightText = document.createTextNode('Oh I guess this guy was mostly in the band after they quit wearing makeup...Bruce Kulick squares up... ');
                    appendFightButtons()
                    break;
                case 'Vinnie':
                    heroTurn('Vinnie');
                    enemyHP(5);
                    fightText = document.createTextNode('Vinnie Vincent (yeah, the guy in makeup that no one actually knew was in the band) wants to throw down!');
                    appendFightButtons()
                    break;
                default:
                    console.log('Nada!')
            }
        }
    }
}


// Allows hero to move
const moveHeroTo = function(x, y) {
    const hero = document.getElementsByClassName('hero');
    hero[0].style.top = (y * 10).toString() + 'px';
    hero[0].style.left = (x * 10).toString() + 'px';
    // CHANGE THIS FOR RESPONSIVENESS (from px to vh/vw)
    if (isChestInCoordinate(x, y)) {
        changeChestClass(x, y);
    }
    if (isEnemyInCoordinate(x, y)) {
        changeEnemyClass(x, y);

    }
}

// THIS IS IMPORTANT!!!
// Detect object in plot & collision detection
const canMoveTo = function(x, y) {
    if (!isCoordinateInGrid(x, y)) {
        return false;
    } else if (isBrickInCoordinate(x, y)) {
        return false;
    } else if (isChestInCoordinate(x, y)) {
        treasureChest();
    } else if (isEnemyInCoordinate(x, y)) {
        enemyFight(x, y);
    }
    return true
};



// Movements
function moveLeft() {
    if (canMoveTo(hero.x - 1, hero.y)) {
        hero.x -= 1;
        moveHeroTo(hero.x, hero.y);
    }
};

function moveRight() {
    if (canMoveTo(hero.x + 1, hero.y)) {
        hero.x += 1;
        moveHeroTo(hero.x, hero.y);
    }
};

function moveUp() {
    if (canMoveTo(hero.x, hero.y - 1)) {
        hero.y -= 1;
        moveHeroTo(hero.x, hero.y);
    }
};

function moveDown() {
    if (canMoveTo(hero.x, hero.y + 1)) {
        hero.y += 1;
        moveHeroTo(hero.x, hero.y);
    }
};

// Key commands for movements
document.body.addEventListener('keydown', function(e) {
    const keyCode = e.keyCode;
    if ([37, 38, 39, 40].includes(keyCode)) {
        e.preventDefault();
    }
    switch (keyCode) {
        case 37:
            moveLeft();
            break;
        case 38:
            moveUp();
            break;
        case 39:
            moveRight();
            break;
        case 40:
            moveDown();
            break;
    }
});