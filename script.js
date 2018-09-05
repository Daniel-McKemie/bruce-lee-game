// Movement/collision detection borrowed from Eric Lewis' article:
// https://wakeful-baritone.glitch.me/


const hero = { x: 0, y: 0 };

// Brick placement
const bricks = [
    { x: 1, y: 1 },
    { x: 15, y: 11 },
    { x: 6, y: 8 }
];

// Treasure Chest placement
const chests = [
    { x: 4, y: 5 },
    { x: 11, y: 8 },
    { x: 13, y: 7 }

];

// Enemy placement
const enemy = [
    { x: 7, y: 11 }

];

// Brick rendering
for (let i = 0; i < bricks.length; i++) {
    const brick = bricks[i];
    const brickElement = document.createElement('div');
    brickElement.className = 'brick';
    brickElement.style.left = (brick.x * 10).toString() + 'px';
    brickElement.style.top = (brick.y * 10).toString() + 'px';
    document.getElementsByClassName('board')[0].appendChild(brickElement);
    // CHANGE THIS FOR RESPONSIVENESS (from px to vh/vw)
};

// Treasure rendering
for (let i = 0; i < chests.length; i++) {
    const chest = chests[i];
    const chestElement = document.createElement('div');
    chestElement.className = 'chest';
    chestElement.style.left = (chest.x * 10).toString() + 'px';
    chestElement.style.top = (chest.y * 10).toString() + 'px';
    document.getElementsByClassName('board')[0].appendChild(chestElement);
    // CHANGE THIS FOR RESPONSIVENESS (from px to vh/vw)
};


// Allows hero to move
let moveHeroTo = function(x, y) {
    const hero = document.getElementsByClassName('hero');
    hero[0].style.top = (y * 10).toString() + 'px';
    hero[0].style.left = (x * 10).toString() + 'px';
    // CHANGE THIS FOR RESPONSIVENESS (from px to vh/vw)
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

// Collision prevention & detect object in plot
const canMoveTo = function(x, y) {
    if (!isCoordinateInGrid(x, y)) {
        return false;
    } else if (isBrickInCoordinate(x, y)) {
        return false;
    } else if (isChestInCoordinate(x, y)) {
        console.log('Treasure!')
    }
    return true;
};

const removeChestAt = function(x, y) {
    for (let i = 0; i < chests.length; i++) {
        const chest = chests[i];
        if (chest.x == x && chest.y == y) {
            chests.splice(i, 1)
        }
    }
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