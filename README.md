# project1-proposal
Daniel McKemie - Project 1 Proposal

Objective:
My game will be a combination of a 2D tile based game and RPG. The main character will explore the dungeon, trying to rescue the princess from the primary villain. Along the way, the hero will solve riddles to gain extra life, and fight enemies to get one step closer to rescuing the princess.
The game board is a 12x20 grid, with three stages. Each stage contains a serious of treasure chests that the hero may open. The treasure chests contain either damaging items that take away their life, or a riddle scroll, that gives them the opportunity to gain a life by answering the question correctly. Whether the treasure chest contains a damaging element, or a riddle scroll, is chosen at random.
Upon reaching the enemy boss, the battle will proceed in RPG style fashion. The JS code for these battles will be the same model as dice rolling in classic table RPG games. For example:
Hero has three moves: Attack
Cast Spell
Throw Object
The structure is this: let heroHP = 30;
let enemyHP = 30;
if (move == ‘attack’) {
let roll == Math.floor(Math.random() * 3) if(roll == 1) {
alert(‘Missed!’) checkHeroHP() checkEnemyHP()
} if(roll == 2) { enemyHP -= 5;
alert(‘You damaged the enemy!’) checkHeroHP() checkEnemyHP()
} if(roll == 3) { enemyHP -= 8;
alert(‘You damaged the enemy!’); checkHeroHP()
checkEnemyHP()
and so on...(but will actually be written with a switch statement)
The hero and enemy change moves, until one is defeated. Once the enemy is defeated. The hero will proceed to the next level with a higher HP count, with harder riddles, and a stronger second enemy. On the third stage, the hero wins if they defeat the enemy.