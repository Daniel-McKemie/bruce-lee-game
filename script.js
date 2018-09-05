// Movement/collision detection borrowed from Eric Lewis' article:
// https://wakeful-baritone.glitch.me/


const hero = { x: 0, y: 0 };
console.log(hero)

// Brick placement
const bricks = [
    { x: 1, y: 1 },
    { x: 15, y: 11 },
    { x: 6, y: 8 }
];

// Treasure Chest placement
const chests = [
    { x: 2, y: 1 },
    { x: 11, y: 8 },
    { x: 13, y: 7 }

];

// Enemy placement
const enemy = [
    { x: 7, y: 11 }

];

// Life Count box
const lifeBox = document.getElementsByClassName('js-score')

// Triggers life counter up
function lifeCountUp() {
    let value = parseInt(lifeBox.value, 10);
    value = isNaN(value) ? 2 : value;
    value += 1
    lifeBox.value = value;
    lifeBox[0].innerHTML = value;
};

// Triggers life counter down
function lifeCountDown() {
    let value = parseInt(lifeBox.value, 10);
    value = isNaN(value) ? 2 : value;
    value -= 1
    lifeBox.value = value;
    lifeBox[0].innerHTML = value;
};

// Brick rendering
let brickElement = null;
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


// Treasure rendering
let chestElement = null;
const renderChests = function() {
    for (let i = 0; i < chests.length; i++) {
        const chest = chests[i];
        chestElement = document.createElement('div');
        chestElement.className = 'chest chest-closed';
        chestElement.style.left = (chest.x * 10).toString() + 'px';
        chestElement.style.top = (chest.y * 10).toString() + 'px';
        document.getElementsByClassName('board')[0].appendChild(chestElement);
        // CHANGE THIS FOR RESPONSIVENESS (from px to vh/vw)
    }
};
renderChests();


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

// ADJUST THIS TO CHANGE PROPER ICON
const changeChestClass = function(x, y) {
    for (let i = 0; i < chests.length; i++) {
        let chest = chests[i];
        if (chest.x == x && chest.y == y) {
            chest = chestElement;
            console.log(chestElement)
        }
    }
};

// Add many riddles by changing (* n) in riddleNumber randoms.
// Write all the riddles.
// Riddles in treasure squares
let scrollElement = null;

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

function rightAnswer() {
    alert('Correct!') // Change alert and style accordingly
    lifeCountUp();
    changeChestClass(hero.x, hero.y);
    scrollElement.style.display = 'none';


}

function wrongAnswer() {
    alert('Wrong') // Change alert and style accordingly
    scrollElement.style.display = 'none';
}

// THIS IS IMPORTANT!!!
// Detect object in plot & collision detection
const canMoveTo = function(x, y) {
    if (!isCoordinateInGrid(x, y)) {
        return false;
    } else if (isBrickInCoordinate(x, y)) {
        return false;
    } else if (isChestInCoordinate(x, y)) {
        riddleScrolls()
    }
    return true;
};

// Allows hero to move
let moveHeroTo = function(x, y) {
    const hero = document.getElementsByClassName('hero');
    hero[0].style.top = (y * 10).toString() + 'px';
    hero[0].style.left = (x * 10).toString() + 'px';
    // CHANGE THIS FOR RESPONSIVENESS (from px to vh/vw)
}

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