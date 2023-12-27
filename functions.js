
// Function to validate input
function isValidInput(value) {
  return value.trim() !== ''; // Check if the input is not empty after trimming whitespace
}
// Helper function to get a random image source for the enemy
function getRandomImageSource() {
  const imageSources = [
    'assets/images/cyber-1.png',
    'assets/images/cyber-2.png',
    // 'assets/images/cyber-boom.png',
  ]; // Add your image sources

  const randomIndex = Math.floor(Math.random() * imageSources.length);
  return imageSources[randomIndex];
}

// Helper function to get a random score for the enemy


function getRandomScore(imageSrc) {
  switch (imageSrc) {
    case 'assets/images/cyber-2.png':
      return 1;
    case 'assets/images/cyber-1.png':
      return 2;
    case 'assets/images/cyber-boom.png':
      return 15;
    default:
      return 0; // Default score for unknown image sources
  }
}


function GameOverDialog(container,title,body,buttonFunction,buttonLabel,status){
  let GameOverDialog = `
          <button type="button" class="${status} btn btn-primary btn_Over d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop${status}">
            
          </button>
          
          <!-- Modal -->
          <div class="modal fade" id="staticBackdrop${status}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5 text-black" id="staticBackdropLabel">${title}</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <!-- Display the score dynamically -->
                  <p class="text-black">Your Score: <span id="scoreValue">${body}</span> points</p>
                </div>
                <div class="modal-footer">
                  <!-- Add a "Play Again" button that reloads the page -->
                  <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="${buttonFunction}()">${buttonLabel}</button>
                </div>
              </div>
            </div>
          </div>`;

          let div = document.createElement("div");
          div.innerHTML=GameOverDialog;
          container.append(div);
          document.querySelector(`.${status}`).click();
}








function playAgain() {
  // Reload the page to start a new game
  location.reload();
}



function keydownHandle(event){

    switch (event.code) {
      case 'ArrowLeft':
        game.defenderFighter.moveLeft();
        break;
      case 'ArrowRight':
        game.defenderFighter.moveRight();
        break;
      default:
        break;
    }
}



function keyupHandle(event){

    if (event.code === 'Space') {
      game.audio.play()
      game.defenderFighter.fire();
    }
}

let collisionDetection=function(Bulletin,DefenderFighterin){
  let Bullet = Bulletin.getBoundingClientRect();//{left , right , button,top}
  let DefenderFighter = DefenderFighterin.getBoundingClientRect();//{left , right , button ,top}
  return (
    DefenderFighter.left < Bullet.right &&
    DefenderFighter.right > Bullet.left && 
    DefenderFighter.top < Bullet.bottom &&
    DefenderFighter.bottom > Bullet.top
      )? true : false;}

let collisionNear=function(Bulletin,DefenderFighterin){
  let Bullet = Bulletin.getBoundingClientRect();//{left , right , button,top}
  let DefenderFighter = DefenderFighterin.getBoundingClientRect();//{left , right , button ,top}
  return(Math.abs(DefenderFighter.x - Bullet.x) <150 && Math.abs(DefenderFighter.y - Bullet.y) <150)? true :false;}

  


let findthisIndes = function(array,object){
  for(let i;array.length>i;++i){
    if(array[i]==object){return i}
  }
}
