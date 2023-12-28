# Cyber Attack Game Documentation


## Live Dimo
https://mo-abdelazem.github.io/cyber_attack


## Overview

"Cyber Attack" is an exciting JavaScript game where players control a defender fighter to eliminate falling cybers. The game features dynamic elements, such as red cybers with special properties, different difficulty levels, and a timer challenge.

## Features

1. **Game Start:**
   - The game will not start until the user clicks the "Start Game" button.
   - A 2-minute timer begins upon starting the game.

2. **Defender Fighter and Gun:**
   - Move the defender fighter using arrow keys.
   - Fire bullets using the spacebar.

3. **Falling Cybers:**
   - Cybers fall towards the defender fighter.

4. **Game End:**
   - The game concludes when the timer reaches zero or cybers reach the defender fighter.

5. **Moving the Gun:**
   - Use keyboard arrows to move the defender fighter left or right.

6. **Scoring:**
   - Destroy standard cybers for a score of 2.
   - Red cybers destroy surrounding cybers, granting a score of +15.

7. **Winning and Losing:**
   - Win by removing 300 cybers before the timer expires.
   - A congratulatory dialog appears upon winning before the time limit.
   - Dialog prompts the user to end the game or return to the home page upon losing.

8. **Game Levels:**
   - Two levels available: easy and hard.
   - Varying falling speeds for each level.

## File Structure

- **[game.js](./game.js):** Contains classes and functions for game logic.
- **[home.js](./home.js):** Manages the home page and user input.
- **[functions.js](./functions.js):** Additional functions used in the game.
- **[style.css](./style.css):** Stylesheet for game appearance.
- **[index.html](./index.html):** HTML structure for the home page.
- **[game.html](./game.html):** HTML structure for the game page.

## Classes

### `Enemy` Class

- **Purpose:** Represents falling cybers in the game.
- **Properties:**
  - `enemy`: HTML image element representing the cyber.
  - `score`: The score associated with destroying the cyber.
- **Methods:**
  - `moveDown()`: Moves the cyber down on the battlefield.

### `Bullet` Class

- **Purpose:** Represents bullets fired by the defender fighter.
- **Properties:**
  - `bulletElement`: HTML div element representing the bullet.
  - `speed`: The speed at which the bullet moves.
  - `idInterval`: Interval ID for controlling bullet movement.
- **Methods:**
  - `fire()`: Initiates firing by setting up the bullet element.
  - `move()`: Moves the bullet vertically on the battlefield.
  - `run()`: Manages the bullet movement within the game loop.

### `DefenderFighter` Class

- **Purpose:** Represents the player-controlled defender fighter.
- **Properties:**
  - `defenderFighter`: HTML image element representing the defender fighter.
- **Methods:**
  - `moveLeft()`: Moves the defender fighter to the left.
  - `moveRight()`: Moves the defender fighter to the right.
  - `fire()`: Initiates firing bullets from the defender fighter.

### `Game` Class

- **Purpose:** Manages the overall game logic, including scoring, timing, and game flow.
- **Properties:**
  - `timerElement`: HTML div element displaying the game timer.
  - `scoreGame`: The current score in the game.
  - `player`: HTML span element displaying the player's name.
  - `scorePoints`: HTML span element displaying the current score.
- **Methods:**
  - `startGame()`: Initiates the game, sets timers, and initializes game objects.
  - `endGame()`: Handles the end of the game, displays a dialog based on the result.
  - `createEnemyRow()`: Creates a row of enemies and adds them to the game.
  - `moveEnemyRowsDown()`: Moves existing enemy rows down.
  - `updateTimer()`: Updates the game timer.
  - `findthisIndes(arr, item)`: Helper function to find the index of an item in an array.

## Functions

### `collisionDetection(element1, element2)`

- **Purpose:** Checks for collision between two HTML elements.
- **Parameters:**
  - `element1`: The first HTML element.
  - `element2`: The second HTML element.
- **Returns:** Boolean indicating whether a collision occurred.

### `collisionNear(element1, element2)`

- **Purpose:** Checks if two elements are in close proximity.
- **Parameters:**
  - `element1`: The first HTML element.
  - `element2`: The second HTML element.
- **Returns:** Boolean indicating proximity.

### `GameOverDialog(parent, title, score, btnFunction, btnText, btnId)`

- **Purpose:** Displays a game over or congratulatory dialog.
- **Parameters:**
  - `parent`: The parent HTML element to append the dialog.
  - `title`: The title of the dialog.
  - `score`: The player's score.
  - `btnFunction`: The function to call on button click.
  - `btnText`: The text to display on the button.
  - `btnId`: The ID of the button.
  
### `playAgain()`

- **Purpose:** Reloads the page to start a new game.

### `keydownHandle(event)`

- **Purpose:** Handles keydown events, allowing the defender fighter to move left or right.

### `keyupHandle(event)`

- **Purpose:** Handles keyup events, allowing the defender fighter to fire bullets.

### `collisionDetection(Bullet, DefenderFighter)`

- **Purpose:** Checks for collision between the bullet and defender fighter.

### `collisionNear(Bullet, DefenderFighter)`

- **Purpose:** Checks if the bullet and defender fighter are in close proximity.

### `findthisIndes(array, object)`

- **Purpose:** Finds the index of an object in an array.

## Usage

1. Clone the repository.
2. Open `index.html` to access the home page.
3. Click "Start Game" to begin playing "Cyber Attack."
4. Follow the on-screen instructions to move the defender fighter, fire bullets, and achieve the highest score.
5. The game will end when the timer runs out or when cybers reach the defender fighter.

Enjoy playing "Cyber Attack"!
