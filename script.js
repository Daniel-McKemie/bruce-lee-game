// Movement/collision detection borrowed from Eric Lewis' article:
// https://wakeful-baritone.glitch.me/


const hero = { x: 0, y: 0 };
// For controlled random, set ranges to each object to avoid collisions

// Brick placement
const bricks = [
    { x: Math.floor(Math.random() * 18) + 2, y: Math.floor(Math.random() * 10) + 1 },
    { x: Math.floor(Math.random() * 18) + 2, y: Math.floor(Math.random() * 10) + 1 },
    { x: Math.floor(Math.random() * 18) + 2, y: Math.floor(Math.random() * 10) + 1 },
    { x: Math.floor(Math.random() * 18) + 2, y: Math.floor(Math.random() * 10) + 1 },
    { x: Math.floor(Math.random() * 18) + 2, y: Math.floor(Math.random() * 10) + 1 },
    { x: Math.floor(Math.random() * 18) + 2, y: Math.floor(Math.random() * 10) + 1 },
    { x: Math.floor(Math.random() * 18) + 2, y: Math.floor(Math.random() * 10) + 1 },
    { x: Math.floor(Math.random() * 18) + 2, y: Math.floor(Math.random() * 10) + 1 },
    { x: Math.floor(Math.random() * 18) + 2, y: Math.floor(Math.random() * 10) + 1 },
    { x: Math.floor(Math.random() * 18) + 2, y: Math.floor(Math.random() * 10) + 1 },
    { x: Math.floor(Math.random() * 18) + 2, y: Math.floor(Math.random() * 10) + 1 },
    { x: Math.floor(Math.random() * 18) + 2, y: Math.floor(Math.random() * 10) + 1 },
    { x: Math.floor(Math.random() * 18) + 2, y: Math.floor(Math.random() * 10) + 1 },
    { x: Math.floor(Math.random() * 18) + 2, y: Math.floor(Math.random() * 10) + 1 },
    { x: Math.floor(Math.random() * 18) + 2, y: Math.floor(Math.random() * 10) + 1 },
    { x: Math.floor(Math.random() * 18) + 2, y: Math.floor(Math.random() * 10) + 1 }

];

// Treasure Chest placement
let chests = [
    { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 10 + 1) },
    { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 10 + 1) },
    { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 10 + 1) },
    { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 10 + 1) },
    { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 10 + 1) },
    { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 10 + 1) }

];

// Enemy placement
const enemies = [
    { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 10 + 1) }, // Gene Simmons
    { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 10 + 1) }, // Paul Stanley
    { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 10 + 1) }, // Ace Frehley
    { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 10 + 1) }, // Peter Criss
    { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 10 + 1) }, // Spaceman
    { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 10 + 1) } // Vinnie Vincent

];

// Life Count box
const heroLifeBox = document.getElementsByClassName('hero-hp js-hp');
const enemyLifeBox = document.getElementsByClassName('enemy-hp js-hp');



// Triggers life counter up
function lifeCountUp(x) {
    let value = parseInt(heroLifeBox.value, 10);
    value = isNaN(value) ? 0 : value;
    value += x
    heroLifeBox.value = value;
    heroLifeBox[0].innerHTML = value;
};

// Triggers life counter down
function lifeCountDown(x) {
    let value = parseInt(heroLifeBox.value, 10);
    value = isNaN(value) ? 0 : value;
    value -= x
    heroLifeBox.value = value;
    heroLifeBox[0].innerHTML = value;
};

// function enemyHP(x) {
//     let value = parseInt(enemyLifeBox.value, 10);
//     value = isNaN(value) ? 2 : value;
//     value += 60
//     lifeBox.value = value;
//     lifeBox[0].innerHTML = value;

// }


// Brick rendering
const renderBricks = function() {
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
const renderChests = function() {
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

const renderEnemies = function() {
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        livingEnemyElement = document.createElement('div');
        livingEnemyElement.className = 'enemy enemy-living';
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
const changeChestClass = function(x, y) {
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
const changeEnemyClass = function(x, y) {
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


// Add many riddles by changing (* n) in riddleNumber randoms.
// Write all the riddles.
// Riddles in treasure squares

let riddleElement = document.createElement('div')
riddleElement.className = 'scroll scroll-content';
let riddleText = null;
const riddleButton1 = document.createElement('div');
riddleButton1.className = 'scroll-button';
const riddleButton2 = document.createElement('div');
riddleButton2.className = 'scroll-button';
const riddleButton3 = document.createElement('div');
riddleButton3.className = 'scroll-button';
const riddleButton4 = document.createElement('div');
riddleButton4.className = 'scroll-button';


// CREATE RIDDLE OBJECT THAT HAS riddle:, options:, and eventListener in switch determines correct answer

function riddleScrolls() {
    riddleElement = document.createElement('div');
    riddleElement.className = 'scroll scroll-content';
    const riddleNumber = Math.floor(Math.random() * 3) // Chooses (out of 3) riddles at random
    switch (riddleNumber) {
        case 0:
            riddleText = document.createTextNode('A riddle!');
            riddleButtonText1 = document.createTextNode('Option A');
            riddleButtonText2 = document.createTextNode('Option B');
            riddleButtonText3 = document.createTextNode('Option C');
            riddleButtonText4 = document.createTextNode('Option D');
            riddleButton1.addEventListener('click', rightAnswer) // One of these listeners sends to the correct answer
            riddleButton2.addEventListener('click', wrongAnswer) // The rest sent to wrong answer
            riddleButton3.addEventListener('click', wrongAnswer) // Assign these buttons accordingly
            riddleButton4.addEventListener('click', wrongAnswer) // To the proper function
            break;
        case 1:
            riddleText = document.createTextNode('A riddle 2!');
            riddleButtonText1 = document.createTextNode('Option A');
            riddleButtonText2 = document.createTextNode('Option B');
            riddleButtonText3 = document.createTextNode('Option C');
            riddleButtonText4 = document.createTextNode('Option D');
            riddleButton1.addEventListener('click', rightAnswer) // One of these listeners sends to the correct answer
            riddleButton2.addEventListener('click', wrongAnswer) // The rest sent to wrong answer
            riddleButton3.addEventListener('click', wrongAnswer) // Assign these buttons accordingly
            riddleButton4.addEventListener('click', wrongAnswer) // To the proper function
            break;
        case 2:
            riddleText = document.createTextNode('A riddle 3!');
            riddleButtonText1 = document.createTextNode('Option A');
            riddleButtonText2 = document.createTextNode('Option B');
            riddleButtonText3 = document.createTextNode('Option C');
            riddleButtonText4 = document.createTextNode('Option D');
            riddleButton1.addEventListener('click', rightAnswer) // One of these listeners sends to the correct answer
            riddleButton2.addEventListener('click', wrongAnswer) // The rest sent to wrong answer
            riddleButton3.addEventListener('click', wrongAnswer) // Assign these buttons accordingly
            riddleButton4.addEventListener('click', wrongAnswer) // To the proper function
            break;
        default:
            console.log('Nada!')
    }
    riddleElement.appendChild(riddleText);
    document.getElementsByClassName('board')[0].appendChild(riddleElement);
    riddleButton1.appendChild(riddleButtonText1);
    riddleElement.appendChild(riddleButton1);
    riddleButton2.appendChild(riddleButtonText2);
    riddleElement.appendChild(riddleButton2);
    riddleButton3.appendChild(riddleButtonText3);
    riddleElement.appendChild(riddleButton3);
    riddleButton4.appendChild(riddleButtonText4);
    riddleElement.appendChild(riddleButton4);

}

// Right answer for riddle
function rightAnswer() {
    console.log('Correct!') // Change alert and style accordingly
    lifeCountUp(35);
    changeChestClass(hero.x, hero.y)
    riddleElement.style.display = 'none';

}

// Wrong answer for riddle
function wrongAnswer() {
    console.log('Wrong') // Change alert and style accordingly
    changeChestClass(hero.x, hero.y)
    riddleElement.style.display = 'none';
}

// Bruce Lee's moves

function punch() {
    console.log('Punch')
}

function lowKick() {
    console.log('Low Kick')
}

function roundHouse() {
    console.log('Roundhouse!')
}

function dragonStomp() {
    console.log('Dragonstomp!')
}

// Fighting scenes
function geneSimmons() {
    fightText = document.createTextNode('The grand and noble leader, with an always fledgling reality TV career is mad about you making fun of his band.  Get ready to battle!!!');
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
    

    fightButton1.addEventListener('click', function() {
        const diceRoll = Math.floor(Math.random() * 1)
        switch (diceRoll) {
            case 0:
                
            case 1:
                console.log('Missed!')
        }
        

    })
    fightButton2.addEventListener('click', geneKick)
    fightButton3.addEventListener('click', geneRoundhouse)
    fightButton4.addEventListener('click', geneDragonStomp)
}

function paulStanley() {
    fightText = document.createTextNode('Paul Stanley descended upon you like a star falling from the sky!')
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

function aceFrehley() {
    fightText = document.createTextNode('That\'s not Sting...That\'s Ace Frehley! And he\'s ready to rumble!')
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

function peterCriss() {
    fightText = document.createTextNode('This weird cat lookin\' dude just hit you with his drumstick!  Peter Criss wants to fight!');
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

function bruceKulick() {
    fightText = document.createTextNode('Oh I guess this guy was mostly in the band after they quit wearing makeup...Bruce Kulick squares up... ');
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

function vinnieVincent() {
    fightText = document.createTextNode('Vinnie Vincent (yeah, the guy in makeup taht no one actually knew was in the band) wants to throw down! ');
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

function enemyFight() {
    const enemyNumber = Math.floor(Math.random() * 5) // Chooses (out of 3) riddles at random
    switch (enemyNumber) {
        case 0:
            geneSimmons();
            break;
        case 1:
            paulStanley();
            break;
        case 2:
            aceFrehley();
            break;
        case 3:
            peterCriss()
            break;
        case 4:
            bruceKulick()
            break;
        case 5:
            vinnieVincent();
            break;
        default:
            console.log('Nada!')
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
        riddleScrolls();
    } else if (isEnemyInCoordinate(x, y)) {
        enemyFight();
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