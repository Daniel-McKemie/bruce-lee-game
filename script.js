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
const lifeBox = document.getElementsByClassName('js-score')

// Triggers life counter up
function lifeCountUp(x) {
    let value = parseInt(lifeBox.value, 10);
    value = isNaN(value) ? 2 : value;
    value += x
    lifeBox.value = value;
    lifeBox[0].innerHTML = value;
};

// Triggers life counter down
function lifeCountDown(x) {
    let value = parseInt(lifeBox.value, 10);
    value = isNaN(value) ? 2 : value;
    value -= x
    lifeBox.value = value;
    lifeBox[0].innerHTML = value;
};

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

function preventChestLayering(x,y) {
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
let scrollElement = null;
const scrollButton1 = document.createElement('div');
scrollButton1.className = 'scroll-button';
const scrollButton2 = document.createElement('div');
scrollButton2.className = 'scroll-button';
const scrollButton3 = document.createElement('div');
scrollButton3.className = 'scroll-button';
const scrollButton4 = document.createElement('div');
scrollButton4.className = 'scroll-button';
const scrollText = null;
const fightButtonText1 = null;
const fightButtonText2 = null;
const fightButtonText3 = null;
const fightButtonText4 = null;

function riddleScrolls() {
    scrollElement = document.createElement('div');
    scrollElement.className = 'scroll scroll-content';
    const scrollButton1 = document.createElement('div');
    scrollButton1.className = 'scroll-button';
    const scrollButton2 = document.createElement('div');
    scrollButton2.className = 'scroll-button';
    const scrollButton3 = document.createElement('div');
    scrollButton3.className = 'scroll-button';
    const scrollButton4 = document.createElement('div');
    scrollButton4.className = 'scroll-button';
    let scrollText = null;
    let scrollButtonText1 = null;
    let scrollButtonText2 = null;
    let scrollButtonText3 = null;
    let scrollButtonText4 = null;
    const riddleNumber = Math.floor(Math.random() * 3) // Chooses (out of 3) riddles at random
    switch (riddleNumber) {
        case 0:
            scrollText = document.createTextNode('A riddle!');
            scrollButtonText1 = document.createTextNode('Option A');
            scrollButtonText2 = document.createTextNode('Option B');
            scrollButtonText3 = document.createTextNode('Option C');
            scrollButtonText4 = document.createTextNode('Option D');
            scrollButton1.addEventListener('click', rightAnswer) // One of these listeners sends to the correct answer
            scrollButton2.addEventListener('click', wrongAnswer) // The rest sent to wrong answer
            scrollButton3.addEventListener('click', wrongAnswer) // Assign these buttons accordingly
            scrollButton4.addEventListener('click', wrongAnswer) // To the proper function
            break;
        case 1:
            scrollText = document.createTextNode('A riddle 2!');
            scrollButtonText1 = document.createTextNode('Option A');
            scrollButtonText2 = document.createTextNode('Option B');
            scrollButtonText3 = document.createTextNode('Option C');
            scrollButtonText4 = document.createTextNode('Option D');
            scrollButton1.addEventListener('click', rightAnswer) // One of these listeners sends to the correct answer
            scrollButton2.addEventListener('click', wrongAnswer) // The rest sent to wrong answer
            scrollButton3.addEventListener('click', wrongAnswer) // Assign these buttons accordingly
            scrollButton4.addEventListener('click', wrongAnswer) // To the proper function
            break;
        case 2:
            scrollText = document.createTextNode('A riddle 3!');
            scrollButtonText1 = document.createTextNode('Option A');
            scrollButtonText2 = document.createTextNode('Option B');
            scrollButtonText3 = document.createTextNode('Option C');
            scrollButtonText4 = document.createTextNode('Option D');
            scrollButton1.addEventListener('click', rightAnswer) // One of these listeners sends to the correct answer
            scrollButton2.addEventListener('click', wrongAnswer) // The rest sent to wrong answer
            scrollButton3.addEventListener('click', wrongAnswer) // Assign these buttons accordingly
            scrollButton4.addEventListener('click', wrongAnswer) // To the proper function
            break;
        default:
            console.log('Nada!')
    }
    scrollElement.appendChild(scrollText);
    document.getElementsByClassName('board')[0].appendChild(scrollElement);
    scrollButton1.appendChild(scrollButtonText1);
    scrollElement.appendChild(scrollButton1);
    scrollButton2.appendChild(scrollButtonText2);
    scrollElement.appendChild(scrollButton2);
    scrollButton3.appendChild(scrollButtonText3);
    scrollElement.appendChild(scrollButton3);
    scrollButton4.appendChild(scrollButtonText4);
    scrollElement.appendChild(scrollButton4);

}

// Right answer for riddle
function rightAnswer() {
    console.log('Correct!') // Change alert and style accordingly
    lifeCountUp();
    changeChestClass(hero.x, hero.y)
    scrollElement.style.display = 'none';

}

// Wrong answer for riddle
function wrongAnswer() {
    console.log('Wrong') // Change alert and style accordingly
    changeChestClass(hero.x, hero.y)
    scrollElement.style.display = 'none';
}

// Fighting scenes
function geneSimmons() {
    
}

function paulStanley() {

}

function aceFrehley() {

}

function peterCriss() {

}

function spaceman() {

}

function vinnieVincent() {

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

function enemyFight() {
    scrollElement = document.createElement('div');
    scrollElement.className = 'scroll scroll-content';
    const scrollButton1 = document.createElement('div');
    scrollButton1.className = 'scroll-button';
    const scrollButton2 = document.createElement('div');
    scrollButton2.className = 'scroll-button';
    const scrollButton3 = document.createElement('div');
    scrollButton3.className = 'scroll-button';
    const scrollButton4 = document.createElement('div');
    scrollButton4.className = 'scroll-button';
    let scrollText = null;
    let scrollButtonText1 = document.createTextNode('Punch');
    let scrollButtonText2 = document.createTextNode('Low Kick');
    let scrollButtonText3 = document.createTextNode('Roundhouse');
    let scrollButtonText4 = document.createTextNode('Dragonstomp ');
    const enemyNumber = Math.floor(Math.random() * 3) // Chooses (out of 3) riddles at random
    switch (enemyNumber) {
        case 0:
            scrollText = document.createTextNode('Gene Simmons wants to throw down!');
            scrollButton1.addEventListener('click', punch) 
            scrollButton2.addEventListener('click', lowKick) 
            scrollButton3.addEventListener('click', roundHouse) 
            scrollButton4.addEventListener('click', dragonStomp)
            break;
        case 1:
            scrollText = document.createTextNode('Paul Stanley');
            scrollButton1.addEventListener('click', punch) // One of these listeners sends to the correct answer
            scrollButton2.addEventListener('click', lowKick) // The rest sent to wrong answer
            scrollButton3.addEventListener('click', roundHouse) // Assign these buttons accordingly
            scrollButton4.addEventListener('click', dragonStomp) // To the proper function
            break;
        case 2:
            scrollText = document.createTextNode('Ace Frehley');
            scrollButton1.addEventListener('click', punch) // One of these listeners sends to the correct answer
            scrollButton2.addEventListener('click', lowKick) // The rest sent to wrong answer
            scrollButton3.addEventListener('click', roundHouse) // Assign these buttons accordingly
            scrollButton4.addEventListener('click', dragonStomp) // To the proper function
            break;
        case 3:
            scrollText = document.createTextNode('Peter Criss');
            scrollButton1.addEventListener('click', punch) // One of these listeners sends to the correct answer
            scrollButton2.addEventListener('click', lowKick) // The rest sent to wrong answer
            scrollButton3.addEventListener('click', roundHouse) // Assign these buttons accordingly
            scrollButton4.addEventListener('click', dragonStomp) // To the proper function
            break;
        case 4:
            scrollText = document.createTextNode('Spaceman');
            scrollButton1.addEventListener('click', punch) // One of these listeners sends to the correct answer
            scrollButton2.addEventListener('click', lowKick) // The rest sent to wrong answer
            scrollButton3.addEventListener('click', roundHouse) // Assign these buttons accordingly
            scrollButton4.addEventListener('click', dragonStomp) // To the proper function
            break;
        case 5:
            scrollText = document.createTextNode('Vinnie Vincent');
            scrollButton1.addEventListener('click', punch) // One of these listeners sends to the correct answer
            scrollButton2.addEventListener('click', lowKick) // The rest sent to wrong answer
            scrollButton3.addEventListener('click', roundHouse) // Assign these buttons accordingly
            scrollButton4.addEventListener('click', dragonStomp) // To the proper function
            break;
        default:
            console.log('Nada!')
    }
    scrollElement.appendChild(scrollText);
    document.getElementsByClassName('board')[0].appendChild(scrollElement);
    scrollButton1.appendChild(scrollButtonText1);
    scrollElement.appendChild(scrollButton1);
    scrollButton2.appendChild(scrollButtonText2);
    scrollElement.appendChild(scrollButton2);
    scrollButton3.appendChild(scrollButtonText3);
    scrollElement.appendChild(scrollButton3);
    scrollButton4.appendChild(scrollButtonText4);
    scrollElement.appendChild(scrollButton4);
}

// Allows hero to move
const moveHeroTo = function(x, y) {
    const hero = document.getElementsByClassName('hero');
    hero[0].style.top = (y * 10).toString() + 'px';
    hero[0].style.left = (x * 10).toString() + 'px';
    // CHANGE THIS FOR RESPONSIVENESS (from px to vh/vw)
    if (isChestInCoordinate(x, y)) {
        changeChestClass(x, y);
    } if (isEnemyInCoordinate(x,y)) {
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