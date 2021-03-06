import apiKey from "./test.js";

// "https://www.gamerpower.com/offers/1b/60995c9cecca6.jpg"

// displaying games
const displayPopularGames = game => {
  // console.log(game);
  const gameContainer = document.getElementById('game-container');

	game.forEach(game => {
    // console.log(game);
		const gameCard = document.createElement('div');
		gameCard.classList.add('game-card');

		gameCard.innerHTML = `
		  <figure style="background-image: url(${game.thumbnail});">
		  </figure>
      <h1 class="game-card-title card-text text-center">${game.title}</h1>
      <div class="details">
        <div class="platform">
          <p class="card-text">type: <span>${game.type}</span></p>
          <p class="card-text">Status <span>${game.status}</span></p>
        </div>
        <div class="user">
          <p class="card-text">Worth <span>${game.worth}</span></p>
          <p class="card-text flex-center card-user">
            <svg class="user-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/></svg>
            <span>${game.users}</span>
          </p>
        </div>
        
      </div>
      <div class="button-container flex-center">
        <button class="btn" data-gameId="${game.id}">Get Giveaway</button>
      </div>
		`

		gameContainer.appendChild(gameCard)
	})
}

// displaying giveaway
const displayGiveAway = game => {
  const giveawayDetailContainer = document.getElementById('giveaway-detail-section');
  const gameDetail = document.createElement('div');
  gameDetail.classList.add('giveaway-detail-container');

  gameDetail.innerHTML = `
    <figure class="giveaway-detail-photo">
      <img src=${game.image} alt="">
    </figure>
    <div class="detail-description">
      <h1 class="main-title">${game.title}</h1>
      <p class="giveaway-description focused-text">${game.description}</p>
      <p class="instruction">${game.instructions}</p>
      <div>
        <button id="btn-go" class="btn"><a href=${game.open_giveaway_url}>Go to Giveaway Link</a></button>
      </div>
    </div>
  `;

  giveawayDetailContainer.appendChild(gameDetail);

  document.getElementById('header').scrollIntoView({
    behavior: 'smooth',
    inline: 'start'
  })

}

// loading giveaway
document.getElementById('game-container').addEventListener('click', function(e){
  if(!e.target.closest('button')) return

  document.getElementById('giveaway-detail-section').textContent = '';

  const gameId = +e.target.dataset.gameid;
  // this.style.display = 'none';

  fetch(`https://gamerpower.p.rapidapi.com/api/giveaway?id=${gameId}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "gamerpower.p.rapidapi.com",
		"x-rapidapi-key": `${apiKey}`
	}
})
.then(response => response.json())
.then(data => displayGiveAway(data))
.catch(err => {
	alert(err)
});

});


// loading games from api
const loadPopularGames = async () => {
	const response = await fetch("https://gamerpower.p.rapidapi.com/api/giveaways?sort-by=popularity", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "gamerpower.p.rapidapi.com",
			"x-rapidapi-key": `${apiKey}`
		}
	})

 const data = await response.json();

 displayPopularGames(data);
};

loadPopularGames();

// filtering
document.getElementById('search-input').addEventListener('keyup', function(event){
  document.getElementById('giveaway-detail-section').textContent = '';

  const currKey = event.target.value;

  const games = document.querySelectorAll('.game-card-title');

  games.forEach(game => {
    // console.log(game.parentNode);
    if(!game.textContent.toLowerCase().includes(currKey.toLowerCase())) {
      game.parentNode.classList.add('d-none');
    }
    else {
      game.parentNode.classList.remove('d-none');
    }
  })
});
