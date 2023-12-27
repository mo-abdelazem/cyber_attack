window.addEventListener('load', function () {
  const playerName = document.querySelector('#summoner_name');
  const gameLevel = document.querySelector('#game_level');
  const startBtn = document.querySelector('#start_game_btn');

  if (this.localStorage.length == 0) {
    localStorage.setItem('LoginId', '1');
    localStorage.setItem('Level', gameLevel.value);
  }

  let searchlocalStorage = function (name) {
    for (let i = 0; localStorage.length > i; i++) {
      if (name.value == localStorage.getItem('name_' + i)) {
        localStorage.setItem('LoginId', i);
        localStorage.setItem('Level', gameLevel.value);
        return true;
      }
    }
    return false;
  };

  // Start game button click event
  startBtn.addEventListener('click', function () {
    // Validate input values
    if (isValidInput(playerName.value) && isValidInput(gameLevel.value)) {
      if (!searchlocalStorage(playerName)) {
        // Save input values in local storage
        let id = localStorage.length / 2;
        localStorage.setItem('name_' + id, playerName.value);
        localStorage.setItem('score_' + id, 0);
        localStorage.setItem('LoginId', id);
        localStorage.setItem('Level', gameLevel.value);
      }

      // Navigate to index.html
      window.location.href = 'game.html';
    } else {
      // alert('Please enter valid values for name and game level.');
      document.querySelector('.alert').classList.remove('d-none');
    }
  }); // stact game btn

  playerName.addEventListener('keydown', function () {
    document.querySelector('.alert').classList.add('d-none');
  });
}); //load
