// window.addEventListener('load', function () {
  // Your existing code here
  const playerName = localStorage.getItem('name_'+localStorage.getItem('LoginId'));
  const gameLevel = localStorage.getItem('level');
  const defenderSpeed = 50;
  const bulletSpeed = -5;

  document.body.id = "start_game_container";
  GameOverDialog(document.body,"Start Game",localStorage.getItem('score_'+localStorage.getItem('LoginId')),"game.startGame","Start","Start");


  let arrEnemy=[]
  let arrBullet=[]
  

  class Enemy {
    constructor(battlefield, imageSrc, score) {
      // define enemy
      this.enemy = document.createElement('img');
      this.enemy.style.position = 'absolute';
      // this.enemy.src = 'assets/images/cyber-1.png';
      this.enemy.src = imageSrc;
      this.enemy.width = '75';
      this.score = score;

      // append enemy
      battlefield.appendChild(this.enemy);
      arrEnemy.push(this);
    }
  }
  class Bullet {
    constructor(battlefield, defenderFighter) {
      this.bulletElement = document.createElement('div');
      this.speed = bulletSpeed;
      this.idInterval;
      this.battlefield = battlefield;
      this.defenderFighter = defenderFighter;
      arrBullet.push(this);
    }

    fire() {
      const defenderPosition =
        this.defenderFighter.defenderFighter.getBoundingClientRect();

      this.bulletElement.style.cssText = `
        position: absolute;
        display: inline-block;
        background-color: white;
        border-radius:50% 50% 0 0;
        height: 20px;
        width: 10px;
        top: ${defenderPosition.bottom - 100}px;
        left: ${defenderPosition.left + (defenderPosition.width - 10) / 2}px;
        transform = translateX(-50%); 
        z-index: 1;
      `;


      this.battlefield.appendChild(this.bulletElement);
      this.run();
    }

    move() {
      this.bulletElement.style.top =
        parseInt(this.bulletElement.style.top) + this.speed + 'px';
    }

    run() {
      this.idInterval = setInterval(() => {
        // Collision detection
        for(let j=0;arrBullet.length>j;++j){
          for(let i=0;arrEnemy.length>i;++i){
            if(collisionDetection(arrBullet[j].bulletElement,arrEnemy[i].enemy)){
              if(arrEnemy[i].enemy.src.endsWith("cyber-boom.png")){
                for(let j=0;arrEnemy.length>j;++j){
                if(collisionNear(arrEnemy[i].enemy,arrEnemy[j].enemy)&&i!=j){arrEnemy[j].enemy.remove();}
                }
                game.scoreGame +=15;game.catchRedAudio.play();
                arrEnemy[i].enemy.remove();
                arrEnemy.splice(i, 1);
              }else if(arrEnemy[i].enemy.src.endsWith("cyber-1.png")){
                arrEnemy[i].enemy.src="assets/images/cyber-2.png";
                game.scoreGame +=1;
              }
              else{game.scoreGame +=1;game.catchAudio.play();arrEnemy[i].enemy.remove();arrEnemy.splice(i, 1);}
              if(game.scoreGame >= 300 && game.callEnd==0){game.endGame();}
              game.scorePoints.innerText = ` ${game.scoreGame} points`;
              arrBullet[j].bulletElement.remove();


            }
          }}

        this.move();
        if (parseInt(this.bulletElement.style.top) < -100) {
          clearInterval(this.idInterval);
          this.bulletElement.remove();
          let n = findthisIndes(arrBullet,this);
          arrBullet.splice(n, 1);
          

        }
        console.log(this);
        
      }, 20);
    }
  }

  class DefenderFighter {
    constructor(battlefield) {
      this.defenderFighter = document.createElement('img');
      this.defenderFighter.style.display = 'block';
      this.defenderFighter.src = 'assets/images/spacefighter.png';
      this.defenderFighter.alt = 'Defender Fighter';
      this.battlefield = battlefield;
      this.defenderFighter.style.position = 'absolute';
      this.defenderFighter.style.bottom = '50px';
      this.defenderFighter.style.left = '50%';
      this.defenderFighter.style.transform = `translateX(${-50}%)`;
      this.battlefield.appendChild(this.defenderFighter);
    }

    moveLeft() {
      if (this.defenderFighter.offsetLeft - defenderSpeed > 0) {
        this.defenderFighter.style.left = `${
          this.defenderFighter.offsetLeft - defenderSpeed
        }px`;
      }
    }

    moveRight() {
      if (
        this.defenderFighter.offsetLeft + this.defenderFighter.offsetWidth <
        this.battlefield.offsetWidth
      ) {
        this.defenderFighter.style.left = `${
          this.defenderFighter.offsetLeft + defenderSpeed
        }px`;
      }
    }

    fire() {
      const bullet = new Bullet(this.battlefield, this);
      bullet.fire();
    }
  }

  class Game {
    constructor() {
      this.callEnd=0;
      this.timerElement = document.createElement('div');
      this.timerElement.innerText = "02:00";
      this.timerStyle =this.timerElement.style;
      this.timerStyle.position='absolute';
      this.timerStyle.left = "50%";
      this.timerStyle.top = "20px";
      this.timerStyle.transform = "translateX(-50%)"
      this.scoreGame = 0;
      // Set player name and score
      // Create player info elements
      this.player = document.createElement('span');
      this.scorePoints = document.createElement('span');
      this.scorePointsStyle =this.scorePoints.style;
      this.scorePointsStyle.position='absolute';
      this.scorePointsStyle.right = "10px";
      this.scorePointsStyle.top = "10px";
      

      this.player.innerText = `Player: ${playerName || 'Unknown'}`;
      this.player.style.position='absolute';
      this.player.style.top= "10px";
      this.scorePoints.innerText = ` ${this.scoreGame} points`;

      this.body = document.querySelector('body');
      this.body.id = 'battlefield';
      this.battlefield = document.createElement('main');
      const fieldStyle = this.battlefield.style;
      fieldStyle.position = 'relative';
      fieldStyle.margin = '0 auto';
      fieldStyle.width = '100%';
      fieldStyle.height = '100%';

      this.audio = new Audio('/sound/fire.mp3');
      this.catchAudio =new Audio('/sound/catch.wav');
      this.catchRedAudio =new Audio('/sound/red.mp3');
      this.loseAudio =new Audio('/sound/lose.wav');
      this.winAudio =new Audio('/sound/win.mp3');

      this.body.appendChild(this.battlefield);
      this.battlefield.appendChild(this.player);
      this.battlefield.appendChild(this.scorePoints);

      this.battlefield.appendChild(this.timerElement);
      this.targetTime = 2 * 60 * 1000; // 2 minutes in milliseconds

      this.defenderFighter = new DefenderFighter(this.battlefield);

      this.enemies = [];

      // fire event
      // Array to keep track of enemy rows
      this.enemyRows = [];
      this.createEnemyRow();

    }

    startGame(){
      this.createEnemyRowInterval = setInterval(() => {
        this.createEnemyRow();
      }, localStorage.getItem('Level')*1000);

      this.targetDate = new Date().getTime() + this.targetTime;
        // Update the timer every second
        this.timerInterval = setInterval(() => {
          this.updateTimer();
      }, 1000);

      // moving Fighter
      document.addEventListener('keydown', keydownHandle);
      document.addEventListener('keyup',keyupHandle); 
      
    }

    endGame(){
      this.callEnd =1;
      clearInterval(this.timerInterval);
      clearInterval(this.createEnemyRowInterval);
      document.removeEventListener('keydown', keydownHandle);
      document.removeEventListener('keyup',keyupHandle); 

      setTimeout(()=>{localStorage.setItem('score_'+localStorage.getItem('LoginId'), this.scoreGame);
      if(localStorage.getItem('score_'+localStorage.getItem('LoginId'))<300){this.loseAudio.play();GameOverDialog(this.battlefield,"Game Over",this.scoreGame,"playAgain","Play Again","endzz");}
      else{
        this.winAudio.play();
        GameOverDialog(this.battlefield,"Congratulations",this.scoreGame,"playAgain","Play Again","endzz");
      }
      },1500);
    }



    createEnemyRow() {
      const enemyWidth = 96; // Update this value based on your actual enemy width
      const spaceBetweenEnemies = 10; // Adjust this value as needed

      const numberOfEnemies = Math.floor(
        this.battlefield.offsetWidth / (enemyWidth + spaceBetweenEnemies)
      );
      // Calculate the total width occupied by enemies and spaces
      const totalRowWidth =
        numberOfEnemies * enemyWidth +
        (numberOfEnemies - 1) * spaceBetweenEnemies;
      // Calculate the starting position to center the row
      const startingPosition =
        (this.battlefield.offsetWidth - totalRowWidth) / 2;
      // Create a new row
      const enemyRow = [];
      for (let i = 0; i < numberOfEnemies; i++) {
        // Choose a random image source and score for the enemy
        let randomImageSrc;
        let randomScore;
        let boomProbability = gameLevel === 1 ? 0.1 : 0.05;

        let randomPlace = Math.floor(Math.random() * 2);
        if (i % 2 === randomPlace && Math.random() < boomProbability) {
          // For odd columns, replace with 'assets/images/cyber-boom.png' with 50% probability
          randomImageSrc = 'assets/images/cyber-boom.png';
          randomScore = getRandomScore(randomImageSrc);
        } else {
          // For even columns or when not replaced, use a random image source
          randomImageSrc = getRandomImageSource(this.gameLevel, i);
          randomScore = getRandomScore(randomImageSrc);
        }

        const enemy = new Enemy(this.battlefield, randomImageSrc, randomScore);

        // Set the position of each enemy in the row with space between enemies
        const enemyPosition =
          startingPosition + i * (enemyWidth + spaceBetweenEnemies);
        enemy.enemy.style.left = `${enemyPosition}px`;

        enemyRow.push(enemy);
      }

      // Add the new row to the beginning of the array of enemy rows
      this.enemyRows.unshift(enemyRow);
      // Move existing rows down
      this.moveEnemyRowsDown();
    }
    moveEnemyRowsDown() {
      const rowHeight = 100; // Adjust this value based on your enemy height and desired spacing
      const defenderPosition =
        this.defenderFighter.defenderFighter.getBoundingClientRect();

      // Move each existing row down
      this.enemyRows.forEach((row, index) => {
        row.forEach(enemy => {
          const currentTop = parseInt(enemy.enemy.style.top) || 0;
          const newTop = currentTop + rowHeight;
          enemy.enemy.style.top = `${newTop}px`;
          // Check for collision with DefenderFighter
          const enemyPosition = enemy.enemy.getBoundingClientRect();
          if (
            (newTop + enemyPosition.height >= defenderPosition.top &&
            enemyPosition.bottom >= defenderPosition.top )
          ) {
            this.endGame();
          }
        });
      });
    }


    updateTimer() {
      const currentDate = new Date().getTime();
      const timeDifference = this.targetDate - currentDate;
  
      if (timeDifference <= 0) {
          // Timer expired
          this.endGame();
          this.timerElement.innerText = "00:00";
          
      } else {
          // Calculate minutes and seconds
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
          // Format the seconds with leading zeros if less than 10
          const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  
          // Update the timer element in the DOM
          this.timerElement.innerText = `${minutes < 10 ? `0${minutes}`:minutes}:${formattedSeconds}`;
      }
  }
  }

  let game= new Game();




  
// }); //load

