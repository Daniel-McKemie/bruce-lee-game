// Movement/collision detection borrowed from Eric Lewis' article:
// https://wakeful-baritone.glitch.me/

// Splashpage listener to initialize game play music
document.body.addEventListener('keydown', function(e) {
    const keyCode = e.keyCode;
    if ([37, 38, 39, 40, 32].includes(keyCode)) {
        e.preventDefault();
    }
    switch (keyCode) {
        case 32:
            splash = document.getElementsByClassName('startScreen')
            splash[0].remove()
            document.body.overflow = 'scroll'
            break;
    }
})

// Audio variables
const enemyPopupAudio = document.getElementById('popup');
const gameplayAudio = document.getElementById('gameplay');
const treasureAudio = document.getElementById('treasure');
const gameWinAudio = document.getElementById('gameWin');

function gameplayMusic() {
    gameplayAudio.currentTime = 0;
    gameplayAudio.play();
}

const hero = { x: 0, y: 0 };


// Brick placement & for loop to place
let bricks = [
    { x: 19, y: 9 },

];
for (let i = 0; i < 39; i++) {
    bricks.push({
        x: Math.floor(Math.random() * 18) + 2,
        y: Math.floor(Math.random() * 8) + 1,
    })
};


// Treasure Chest placement & for loop to place
let chests = [
    { x: 4, y: 8 },

];
for (let i = 0; i < 6; i++) {
    chests.push({
        x: Math.floor(Math.random() * 18) + 2,
        y: Math.floor(Math.random() * 8) + 1,
    })
};


// Enemy placement
const enemies = [
    { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 8 + 1), Name: 'gene' },
    { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 8 + 1), Name: 'paul' },
    { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 8 + 1), Name: 'ace' },
    { x: Math.floor(Math.random() * 18 + 1), y: Math.floor(Math.random() * 8 + 1), Name: 'peter' }

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
    heroLifeBox[0].innerHTML = `Bruce's HP: ${value}`;
    bruceLeeHP = value;
};
heroHP(60);


function enemyHP(x) {
    let value = parseInt(enemyLifeBox.value, 10);
    value = isNaN(value) ? 0 : value;
    value += x
    enemyLifeBox.value = value;
    // enemyLifeBox[0].innerHTML = value;
    kissArmyHP = value;

}


// Brick rendering
function renderBricks() {
    for (let i = 0; i < bricks.length; i++) {
        const brick = bricks[i];
        const brickElement = document.createElement('div');
        brickElement.className = 'brick';
        brickElement.style.left = (brick.x * 40).toString() + 'px';
        brickElement.style.top = (brick.y * 40).toString() + 'px';
        document.getElementsByClassName('board')[0].appendChild(brickElement);
        // CHANGE THIS FOR RESPONSIVENESS (from px to vh/vw)
    }
};
renderBricks();

// Randomize backgrounds of blocks
const instrumentImages = [
    'images/instruments/acoustic-guitar-1.png',
    'images/instruments/acoustic-guitar-2.png',
    'images/instruments/drum-kit-1.png',
    'images/instruments/drum-kit-2.png',
    'images/instruments/electric-guitar-1.png',
    'images/instruments/electric-guitar-2.png',
    'images/instruments/electric-guitar-3.png',
    'images/instruments/electric-guitar-4.png',
    'images/instruments/mic-1.png',
    'images/instruments/mic-2.png',
    'images/instruments/piano-2.png',
    'images/instruments/upright-bass.png'
];

const instrumentDivs = document.getElementsByClassName('brick');
const instrumentDivArray = Array.prototype.slice.call(instrumentDivs);

instrumentDivArray.forEach(function(div) {

    let randomNum = Math.floor(Math.random() * instrumentImages.length);

    div.style.backgroundImage = 'url(' + instrumentImages[randomNum] + ')';
});


// Treasure chest rendering
function renderChests() {
    for (let i = 0; i < chests.length; i++) {
        const chest = chests[i];
        closedChestElement = document.createElement('div');
        closedChestElement.className = 'chest chest-closed';
        closedChestElement.style.left = (chest.x * 40).toString() + 'px';
        closedChestElement.style.top = (chest.y * 40).toString() + 'px';
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
            case 'gene':
                livingEnemyElement.id = ('gene');
                break;
            case 'paul':
                livingEnemyElement.id = ('paul');
                break;
            case 'ace':
                livingEnemyElement.id = ('ace');
                break;
            case 'peter':
                livingEnemyElement.id = ('peter');
                break;
        }
        livingEnemyElement.style.left = (enemy.x * 40).toString() + 'px';
        livingEnemyElement.style.top = (enemy.y * 40).toString() + 'px';
        document.getElementsByClassName('board')[0].appendChild(livingEnemyElement);
    }
}

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
    if (x < 0 || y < 0 || x > 19 || y > 9) {
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
            document.body.addEventListener('keydown', keyPresses)
            doneChest = document.getElementsByClassName('chest chest-closed');
            doneChest[i].remove()
            chests.splice(i, 1);
            openChestElement = document.createElement('div');
            openChestElement.className = 'chest chest-open';
            openChestElement.style.left = (chest.x * 40).toString() + 'px';
            openChestElement.style.top = (chest.y * 40).toString() + 'px';
            document.getElementsByClassName('board')[0].appendChild(openChestElement);
        }
    }
}

// Changes enemy from living to dead
function changeEnemyClass(x, y) {
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        if (enemy.x == x && enemy.y == y) {
            setTimeout(function() {document.body.addEventListener('keydown', keyPresses)}, 4000)
            doneEnemy = document.getElementsByClassName('enemy enemy-living');
            doneEnemy[i].remove()
            enemies.splice(i, 1);
            deadEnemyElement = document.createElement('div');
            deadEnemyElement.className = 'enemy enemy-dead';
            deadEnemyElement.style.left = (enemy.x * 40).toString() + 'px';
            deadEnemyElement.style.top = (enemy.y * 40).toString() + 'px';
            document.getElementsByClassName('board')[0].appendChild(deadEnemyElement);
        }
    }
}

let treasureElement = document.createElement('div')
treasureElement.className = 'treasure-scroll treasure-scroll-content'
let treasureText = document.createTextNode('');


// Fill out possible treasure chest contents
function treasureChest(x, y) {
    for (let i = 0; i < chests.length; i++) {
        const chest = chests[i];
        if (chest.x == x && chest.y == y) {
            let diceRoll = Math.floor(Math.random() * 10);
            document.body.removeEventListener('keydown', keyPresses)
            switch (diceRoll) {
                case 0:
                    treasureElement.appendChild(treasureText)
                    treasureText.textContent = 'You found a salad.  Yeah, it\'s kind of weird that it\'s in a treasure chest, but it\'s still fresh!  Gain 10 HP!'
                    document.getElementsByClassName('board')[0].appendChild(treasureElement);
                    treasureAudio.currentTime = 0;
                    treasureAudio.play();
                    setTimeout(function removeTreasure() {
                        document.getElementsByClassName('board')[0].removeChild(treasureElement);
                    }, 5000)
                    heroHP(10);
                    if (bruceLeeHP <= 0) {
                        heroLoses()
                    }
                    break;
                case 1:
                    treasureElement.appendChild(treasureText)
                    treasureText.textContent = 'A surprise Chuck Norris attack!  Lose 10 HP.'
                    document.getElementsByClassName('board')[0].appendChild(treasureElement);
                    treasureAudio.currentTime = 0;
                    treasureAudio.play();
                    setTimeout(function removeTreasure() {
                        document.getElementsByClassName('board')[0].removeChild(treasureElement);
                    }, 5000)
                    heroHP(-10)
                    if (bruceLeeHP <= 0) {
                        heroLoses()
                    }
                    break;
                case 2:
                    treasureElement.appendChild(treasureText)
                    treasureText.textContent = 'O\'Hara popped out and actually got a hit on you!  Lose 5 HP.'
                    document.getElementsByClassName('board')[0].appendChild(treasureElement);
                    treasureAudio.currentTime = 0;
                    treasureAudio.play();
                    setTimeout(function removeTreasure() {
                        document.getElementsByClassName('board')[0].removeChild(treasureElement);
                    }, 5000)
                    heroHP(-5)
                    if (bruceLeeHP <= 0) {
                        heroLoses()
                    }
                    break;
                case 3:
                    treasureElement.appendChild(treasureText)
                    treasureText.textContent = 'This treasure chest leads to a hidden room with a nice bed and many amenities.  You take a rest and recharge 20 HP!'
                    document.getElementsByClassName('board')[0].appendChild(treasureElement);
                    treasureAudio.currentTime = 0;
                    treasureAudio.play();
                    setTimeout(function removeTreasure() {
                        document.getElementsByClassName('board')[0].removeChild(treasureElement);
                    }, 5000)
                    heroHP(20)
                    if (bruceLeeHP <= 0) {
                        heroLoses()
                    }
                    break;
                case 4:
                    treasureElement.appendChild(treasureText)
                    treasureText.textContent = 'Beef in oyster sauce!  Bruce\'s favorite dish!  This will surely help vanquish those wannabe glam rockers! Gain 25 HP!'
                    document.getElementsByClassName('board')[0].appendChild(treasureElement);
                    treasureAudio.currentTime = 0;
                    treasureAudio.play();
                    setTimeout(function removeTreasure() {
                        document.getElementsByClassName('board')[0].removeChild(treasureElement);
                    }, 5000)
                    heroHP(25)
                    if (bruceLeeHP <= 0) {
                        heroLoses()
                    }
                    break;
                case 5:
                    treasureElement.appendChild(treasureText)
                    treasureText.textContent = 'You got beat up by a gang of roadies!  They licked ya pretty good.  Lose 20 HP'
                    document.getElementsByClassName('board')[0].appendChild(treasureElement);
                    treasureAudio.currentTime = 0;
                    treasureAudio.play();
                    setTimeout(function removeTreasure() {
                        document.getElementsByClassName('board')[0].removeChild(treasureElement);
                    }, 5000)
                    heroHP(-20)
                    if (bruceLeeHP <= 0) {
                        heroLoses()
                    }
                    break;
                case 6:
                    treasureElement.appendChild(treasureText)
                    treasureText.textContent = 'You found some half melted chocolate bars.  Gain 5 HP.'
                    document.getElementsByClassName('board')[0].appendChild(treasureElement);
                    treasureAudio.currentTime = 0;
                    treasureAudio.play();
                    setTimeout(function removeTreasure() {
                        document.getElementsByClassName('board')[0].removeChild(treasureElement);
                    }, 5000)
                    heroHP(5)
                    if (bruceLeeHP <= 0) {
                        heroLoses()
                    }
                    break;
                case 7:
                    treasureElement.appendChild(treasureText)
                    treasureText.textContent = 'A fireball flew out of the chest!  Lose 5 HP.'
                    document.getElementsByClassName('board')[0].appendChild(treasureElement);
                    treasureAudio.currentTime = 0;
                    treasureAudio.play();
                    setTimeout(function removeTreasure() {
                        document.getElementsByClassName('board')[0].removeChild(treasureElement);
                    }, 5000)
                    heroHP(-5)
                    if (bruceLeeHP <= 0) {
                        heroLoses()
                    }
                    break;
                case 8:
                    treasureElement.appendChild(treasureText)
                    treasureText.textContent = 'You found some clean water to drink.  Gain 10 HP!'
                    document.getElementsByClassName('board')[0].appendChild(treasureElement);
                    treasureAudio.currentTime = 0;
                    treasureAudio.play();
                    setTimeout(function removeTreasure() {
                        document.getElementsByClassName('board')[0].removeChild(treasureElement);
                    }, 5000)
                    heroHP(10)
                    if (bruceLeeHP <= 0) {
                        heroLoses()
                    }
                    break;
                case 9:
                    treasureElement.appendChild(treasureText)
                    treasureText.textContent = 'A roadie jumped out of the chest and smacked you in the mouth!  Lose 10 HP.'
                    document.getElementsByClassName('board')[0].appendChild(treasureElement);
                    treasureAudio.currentTime = 0;
                    treasureAudio.play();
                    setTimeout(function removeTreasure() {
                        document.getElementsByClassName('board')[0].removeChild(treasureElement);
                    }, 5000)
                    heroHP(-10)
                    if (bruceLeeHP <= 0) {
                        heroLoses()
                    }
                    break;
            }

        }
    }
}


// Global buttons and text for hero
let fightElement = document.createElement('div')
fightElement.className = 'scroll scroll-content';
let fightText = document.createTextNode('');
const fightButton1 = document.createElement('div');
fightButton1.className = 'scroll-button';
const fightButton2 = document.createElement('div');
fightButton2.className = 'scroll-button';
const fightButton3 = document.createElement('div');
fightButton3.className = 'scroll-button';
const fightButton4 = document.createElement('div');
fightButton4.className = 'scroll-button';
const fightButton5 = document.createElement('div');
fightButton5.className = 'scroll-button';
let fightButtonText1 = document.createTextNode('');
let fightButtonText2 = document.createTextNode('');
let fightButtonText3 = document.createTextNode('');
let fightButtonText4 = document.createTextNode('');
let fightButtonText5 = document.createTextNode('');

function appendFightButtons() {
    document.body.removeEventListener('keydown', keyPresses)
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
    addEventListeners()
    setTimeout(function() { heroTurn('makeMove') }, 6000)

}

function addEventListeners() {
    fightButton1.addEventListener('click', punch)
    fightButton2.addEventListener('click', lowKick)
    fightButton3.addEventListener('click', roundHouse)
    fightButton4.addEventListener('click', dragonstomp)

}

function removeEventListeners() {
    fightButton1.removeEventListener('click', punch)
    fightButton2.removeEventListener('click', lowKick)
    fightButton3.removeEventListener('click', roundHouse)
    fightButton4.removeEventListener('click', dragonstomp)

}


// Bruce Lee moves
function punch() {
    heroTurn('Punch')
}

function lowKick() {
    heroTurn('Low Kick')
}

function roundHouse() {
    heroTurn('Roundhouse')
}

function dragonstomp() {
    heroTurn('Dragonstomp')
}

// Fight scenes
function heroTurn(move) {
    if (move == 'makeMove') {
        fightText.textContent = 'Your move!'
        fightButtonText1.textContent = 'Punch'
        fightButtonText2.textContent = 'Low Kick'
        fightButtonText3.textContent = 'Roundhouse'
        fightButtonText4.textContent = 'Dragonstomp'
    }
    // Hero's Turn
    // Fill out Listeners appropriately!!!

    if (move == 'Punch') {
        let heroDiceRoll = Math.floor(Math.random() * 6)
        switch (heroDiceRoll) {
            case 0:
            case 1:
            case 2:
            case 3:
                fightText.textContent = 'Punch landed!'
                fightButtonText1.textContent = ''
                fightButtonText2.textContent = ''
                fightButtonText3.textContent = ''
                fightButtonText4.textContent = ''
                enemyHP(-5);
                if (kissArmyHP > 0) {
                    setTimeout(function() { enemyTurn() }, 2000);
                } else {
                    changeEnemyClass(hero.x, hero.y)
                    heroWins()
                }
                break;
            case 4:
                fightText.textContent = 'You hit him hard!'
                fightButtonText1.textContent = ''
                fightButtonText2.textContent = ''
                fightButtonText3.textContent = ''
                fightButtonText4.textContent = ''
                enemyHP(-10);
                if (kissArmyHP > 0) {
                    setTimeout(function() { enemyTurn() }, 2000);
                } else {
                    changeEnemyClass(hero.x, hero.y)
                    heroWins();
                }
                break;
            case 5:
                fightText.textContent = 'You missed!'
                fightButtonText1.textContent = ''
                fightButtonText2.textContent = ''
                fightButtonText3.textContent = ''
                fightButtonText4.textContent = ''
                enemyHP(0);
                if (kissArmyHP > 0) {
                    setTimeout(function() { enemyTurn() }, 2000);
                } else {
                    changeEnemyClass(hero.x, hero.y)
                    heroWins()
                }
                break;
        }
    }


    if (move == 'Low Kick') {
        let heroDiceRoll = Math.floor(Math.random() * 6)
        switch (heroDiceRoll) {
            case 0:
            case 1:
            case 2:
                fightText.textContent = 'Kick landed!'
                fightButtonText1.textContent = ''
                fightButtonText2.textContent = ''
                fightButtonText3.textContent = ''
                fightButtonText4.textContent = ''
                enemyHP(-10);
                if (kissArmyHP > 0) {
                    setTimeout(function() { enemyTurn() }, 2000);
                } else {
                    changeEnemyClass(hero.x, hero.y)
                    heroWins()
                }
                break;
            case 3:
                fightText.textContent = 'You swept him right off his feet!'
                fightButtonText1.textContent = ''
                fightButtonText2.textContent = ''
                fightButtonText3.textContent = ''
                fightButtonText4.textContent = ''
                enemyHP(-15);
                if (kissArmyHP > 0) {
                    setTimeout(function() { enemyTurn() }, 2000);
                } else {
                    changeEnemyClass(hero.x, hero.y)
                    heroWins();
                }
                break;
            case 4:
            case 5:
                fightText.textContent = 'Kick to the wind.  You missed him!'
                fightButtonText1.textContent = ''
                fightButtonText2.textContent = ''
                fightButtonText3.textContent = ''
                fightButtonText4.textContent = ''
                enemyHP(0);
                if (kissArmyHP > 0) {
                    setTimeout(function() { enemyTurn() }, 2000);
                } else {
                    changeEnemyClass(hero.x, hero.y)
                    heroWins()
                }
                break;
        }
    }
    if (move == 'Roundhouse') {
        let heroDiceRoll = Math.floor(Math.random() * 6)
        switch (heroDiceRoll) {
            case 0:
            case 1:
                fightText.textContent = 'Spun around and knocked him right in the teeth!'
                fightButtonText1.textContent = ''
                fightButtonText2.textContent = ''
                fightButtonText3.textContent = ''
                fightButtonText4.textContent = ''
                enemyHP(-15);
                if (kissArmyHP > 0) {
                    setTimeout(function() { enemyTurn() }, 2000);
                } else {
                    changeEnemyClass(hero.x, hero.y)
                    heroWins()
                }
                break;
            case 2:
                fightText.textContent = 'Double roundhouse!  He didn\'t even know which way to fall!'
                fightButtonText1.textContent = ''
                fightButtonText2.textContent = ''
                fightButtonText3.textContent = ''
                fightButtonText4.textContent = ''
                enemyHP(-25);
                if (kissArmyHP > 0) {
                    setTimeout(function() { enemyTurn() }, 2000);
                } else {
                    changeEnemyClass(hero.x, hero.y)
                    heroWins();
                }
                break;
            case 3:
            case 4:
            case 5:
                fightText.textContent = 'You whipped around but got nothin\' but air.'
                fightButtonText1.textContent = ''
                fightButtonText2.textContent = ''
                fightButtonText3.textContent = ''
                fightButtonText4.textContent = ''
                enemyHP(0);
                if (kissArmyHP > 0) {
                    setTimeout(function() { enemyTurn() }, 2000);
                } else {
                    changeEnemyClass(hero.x, hero.y)
                    heroWins()
                }
                break;
        }
    }
    if (move == 'Dragonstomp') {
        let heroDiceRoll = Math.floor(Math.random() * 6)
        switch (heroDiceRoll) {
            case 0:
                fightText.textContent = 'DRAGONSTOMP!'
                fightButtonText1.textContent = ''
                fightButtonText2.textContent = ''
                fightButtonText3.textContent = ''
                fightButtonText4.textContent = ''
                enemyHP(-1000);
                if (kissArmyHP > 0) {
                    setTimeout(function() { enemyTurn() }, 2000);
                } else {
                    changeEnemyClass(hero.x, hero.y)
                    heroWins()
                }
                break;
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                fightText.textContent = 'Didn\'t get the stomp down this time.'
                fightButtonText1.textContent = ''
                fightButtonText2.textContent = ''
                fightButtonText3.textContent = ''
                fightButtonText4.textContent = ''
                enemyHP(0);
                if (kissArmyHP > 0) {
                    setTimeout(function() { enemyTurn() }, 2000);
                } else {
                    changeEnemyClass(hero.x, hero.y)
                    heroWins()
                }
                break;
        }
    }
}

function enemyTurn() {
    let diceRoll = Math.floor(Math.random() * 10)
    switch (diceRoll) {
        case 0:
            fightText.textContent = 'You got smacked!'
            heroHP(-5);
            if (bruceLeeHP <= 0) {
                heroLoses()
            } else {
                setTimeout(function() { heroTurn('makeMove') }, 2000)
            }
            break;
        case 1:
            fightText.textContent = 'He poked you right in the eye!'
            heroHP(-10);
            if (bruceLeeHP <= 0) {
                heroLoses()
            } else {
                setTimeout(function() { heroTurn('makeMove') }, 2000)
            }
            break;
        case 2:
            fightText.textContent = 'You got hit with a guitar across the head.  Hard!'
            heroHP(-15);
            if (bruceLeeHP <= 0) {
                heroLoses()
            } else {
                setTimeout(function() { heroTurn('makeMove') }, 2000)
            }
            break;
        case 3:
            fightText.textContent = 'He smacked a drumstick right on your elbow.  Ouch!'
            heroHP(-15);
            if (bruceLeeHP <= 0) {
                heroLoses()
            } else {
                setTimeout(function() { heroTurn('makeMove') }, 2000)
            }
            break;
        case 4:
            fightText.textContent = 'The band called the roadies!  Hit you from all directions!'
            heroHP(-20);
            if (bruceLeeHP <= 0) {
                heroLoses()
            } else {
                setTimeout(function() { heroTurn('makeMove') }, 2000)
            }
            break;
        case 5:
            fightText.textContent = 'You got punched in the teeth!'
            heroHP(-5);
            if (bruceLeeHP <= 0) {
                heroLoses()
            } else {
                setTimeout(function() { heroTurn('makeMove') }, 2000)
            }
            break;
        case 6:
            fightText.textContent = 'You got kicked in the teeth!'
            heroHP(-10);
            if (bruceLeeHP <= 0) {
                heroLoses()
            } else {
                setTimeout(function() { heroTurn('makeMove') }, 2000)
            }
            break;
        case 7:
            fightText.textContent = 'He whiffed the hit!'
            heroHP(0);
            if (bruceLeeHP <= 0) {
                heroLoses()
            } else {
                setTimeout(function() { heroTurn('makeMove') }, 2000)
            }
            break;
        case 8:
            fightText.textContent = 'He missed!'
            heroHP(0);
            if (bruceLeeHP <= 0) {
                heroLoses()
            } else {
                setTimeout(function() { heroTurn('makeMove') }, 2000)
            }
            break;
        case 9:
            fightText.textContent = 'You dodged his hit in classic Bruce Lee fashion!'
            heroHP(0);
            if (bruceLeeHP <= 0) {
                heroLoses()
            } else {
                setTimeout(function() { heroTurn('makeMove') }, 2000)
            }
            break;
    }
}

// Win or lose battle
function heroWins() {
    removeEventListeners();
    fightText.textContent = 'Great work!  Another one down!  Watch out for random roadies!  They can get nasty.  Let\'s go smash another!'
    setTimeout(function() { fightElement.remove() }, 4000)
    setTimeout(function() { fightText.textContent = '' }, 4000)
    enemyCount()
    enemyHP(0)
}

function heroLoses() {
    fightText.textContent = 'You died!  Let\'s try again!'
    setTimeout(function() { location.reload() }, 3000);
}

function enemyCount() {
    if (enemies.length == 0) {
        appendFightButtons()
        fightText.textContent = 'Congratulations!  You defeated the Kiss Army!'
        gameplayAudio.pause();
        gameWinAudio.play();
        gameWinAudio.volume = 0.4
        setTimeout(function() { location.reload() }, 10500);
    }
}
// function heroLoses() {
//     fightText.textContent = 'You died!  Let\'s try again!'
//     setTimeout(function() { location.reload() }, 2000);
// }

// Initiates and sets up fight scene
function enemyFight(x, y) {
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        if (enemy.x == x && enemy.y == y) {
            switch (enemy.Name) {
                case 'gene':
                    enemyHP(40);
                    fightText = document.createTextNode('The grand and noble leader, with an always fledgling reality TV career, is mad because you are making fun of his band.  Get ready to battle!!!');
                    appendFightButtons()
                    enemyPopupAudio.currentTime = 0;
                    enemyPopupAudio.play();
                    setTimeout(heroTurn, 8000)
                    break;
                case 'paul':
                    enemyHP(30);
                    fightText = document.createTextNode('Paul Stanley descended upon you like a star falling from the sky!');
                    appendFightButtons()
                    enemyPopupAudio.currentTime = 0;
                    enemyPopupAudio.play();
                    setTimeout(heroTurn, 8000)
                    break;
                case 'ace':
                    enemyHP(20);
                    fightText = document.createTextNode('That\'s not Sting...That\'s Ace Frehley! And he\'s ready to rumble!');
                    appendFightButtons()
                    enemyPopupAudio.currentTime = 0;
                    enemyPopupAudio.play();
                    setTimeout(heroTurn, 8000)
                    break;
                case 'peter':
                    enemyHP(10);
                    fightText = document.createTextNode('This weird cat lookin\' dude just threw a drumstick at you!  Peter Criss wants to fight!');
                    appendFightButtons()
                    enemyPopupAudio.currentTime = 0;
                    enemyPopupAudio.play();
                    setTimeout(heroTurn, 8000)
                    break;

            }
        }
    }
}

// Allows hero to move
const moveHeroTo = function(x, y) {
    const hero = document.getElementsByClassName('hero');
    hero[0].style.top = (y * 40).toString() + 'px';
    hero[0].style.left = (x * 40).toString() + 'px';
    // CHANGE THIS FOR RESPONSIVENESS (from px to vh/vw)
    if (isChestInCoordinate(x, y)) {
        treasureChest(x, y);
        setTimeout(function() { changeChestClass(x, y) }, 5000);
    }
    if (isEnemyInCoordinate(x, y)) {
        enemyFight(x, y);

    }
}


// Detect object in plot & collision detection
const canMoveTo = function(x, y) {
    if (!isCoordinateInGrid(x, y)) {
        return false;
    } else if (isBrickInCoordinate(x, y)) {
        return false;
    } else if (isChestInCoordinate(x, y)) {
        treasureChest();
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

document.body.addEventListener('keydown', keyPresses)

function keyPresses(e) {
    const keyCode = e.keyCode;
    if ([37, 38, 39, 40, 32].includes(keyCode)) {
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
        case 32:
            gameplayMusic();
            gameplayAudio.volume = 0.4;
            break;
    }
}