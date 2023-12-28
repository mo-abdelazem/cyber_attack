# Cyber Attack Game


## Live Demo
https://mo-abdelazem.github.io/cyber_attack


## Overview

"Cyber Attack" is an exciting JavaScript game where players control a defender fighter to eliminate falling boxes and achieve the highest score. The game features dynamic elements, such as red boxes with special properties, different difficulty levels, and a timer challenge.

## Features

- **Game Start:**
  - Click the start button to begin the game.
  - A 2-minute timer initiates upon starting the game.

- **Defender Fighter and Gun:**
  - Move the defender fighter using arrow keys.
  - Fire bullets using the spacebar.

- **Falling Boxes:**
  - Boxes fall towards the defender fighter.

- **Game End:**
  - The game concludes when the timer reaches zero or boxes reach the defender fighter.

- **Scoring:**
  - Destroy standard boxes for a score of 2.
  - Red boxes destroy surrounding boxes, granting a score of +15.

- **Winning and Losing:**
  - Win by removing 300 boxes before the timer expires.
  - Congratulatory dialog upon winning before the time limit.
  - Dialog prompts the user to end the game or return to the home page upon losing.

- **Game Levels:**
  - Two levels available: easy and hard.
  - Varying falling speeds for each level.

## File Structure

- **game.js:** Contains classes and functions for game logic.
- **home.js:** Manages the home page and user input.
- **functions.js:** Additional functions used in the game.
- **style.css:** Stylesheet for game appearance.
- **index.html:** HTML structure for the home page.
- **game.html:** HTML structure for the game page.

## How to Run

1. Open `index.html` in a web browser to access the home page.
2. Enter a valid name and select the game level.
3. Click the "Start Game" button to initiate the game.

## Development

- For local development, clone the repository:
  ```bash
  git clone https://github.com/mo-abdelazem/cyber-attack-game.git
