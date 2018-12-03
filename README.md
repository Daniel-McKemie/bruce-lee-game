# Daniel McKemie - Bruce Lee vs. The Kiss Army
https://daniel-mckemie.github.io/bruce-lee-game/


## Description:
A grid based RPG game where the player controls Bruce Lee, who goes around fighting members of the band Kiss.  The game board consists of instruments that block your maneuvering around the board, treasure chests that hold hidden secrets that help or harm Bruce Lee, members of the band Kiss, who are enemies that need to be defeated in order to win the game.  The game board's contents are randomly generated each time the game is loaded.

Bruce Lee has four moves to battle his opponent, each one deals a different range of damage, and differs from the chances of striking.


## Instructions for game play:
Move Bruce Lee around moving the arrow keys.  Treasure chests unlock hidden secrets that could harm or hurt you.  When approached by an enemy, click on the move you would like to make, in classic RPG fashion!


### Technologies used:
The primary elements of the game were created in Javascript; added, removed, and manipulated in the DOM as needed.  I wanted to have a more dynamic program, as opposed to building stationary elements in HTML, and manipulating them later; the static elements (such as instructions, etc.), are written into the HTML.  The game board and its elements are all randomly generated and placed on the board with each rendering of the game.

I used CSS animations to manipulate the modals coming into the screen upon landing on a treasure chest or enemy.  When in battle, event listeners were placed on the appropriate buttons, which trigger turns back and forth between the player and computer, with each round dealing a certain amount of damage to the other, until one player is out of life.


### Approach and problems:
It was important to me to have a high functioning game demonstrating the technologies learned up to this point, and express my own interests in these technologies.  One interest of mine is the use of randomness in generating the game board.  The placement of all the elements and what is inside the elements (in this case, treasure chest or background-image of an instrument), to be randomly generated was a goal.  While it doesn't produce highly interesting results in its own right, the technology and approach implemented is something that I feel could be used in my work later down the road, and now I have a sound grasp (and reference), on how this method works.  Furthermore, I felt that I was successful in creating a game that was constructed and manipulated primarily through the DOM, instead of focusing on creating these elements in the HTML document.

The biggest problem that I faced, that went unsolved up until the very end, was having multiple enemies on the board during one round.  The problem showed itself as multiple triggers of layered event listeners in the battle screen buttons, after fighting more than one enemy.  There was an issue with the rendering and removal of event listeners, and it was causing a major flaw in the battle mode.  This is the one problem that took most of my time.  I eventually had to move on, and have the game exist as a single enemy stage.  At the end of the process, I discovered that event listeners could not be removed if they were calling an anonymous function within itself.  I separated all of the functionality, and that allowed for adding and separating properly.

The final issue, is that the game is not as responsive as I would like.  It was my original goal to create a game that was mobile friendly, however this proved to be much more complicated after the construction of my collision detection methods in the game.  It's very reliant on the pixel size of the board, the grid, and the elements within that grid.  This also poses issues in responsiveness on the desktop, because it realigns the entire board, causing the grid to be reassigned, which confuses the collision detection.

With that being said, I was able to construct responsiveness for every other element in the game, EXCEPT for the board itself.  The backgrounds, texts, and splashpage, are all responsive using flexbox.

