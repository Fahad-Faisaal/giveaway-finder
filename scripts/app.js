import apiKey from "./test.js";

const displayPopularGames = game => {
  const gameContainer = document.getElementById('game-container');

	game.forEach(game => {
		const gameCard = document.createElement('div');
		gameCard.classList.add('game-card');

		gameCard.innerHTML = `
		  <figure style="background-image: url('https://www.gamerpower.com/offers/1/5ec4fdb8dbe80.jpg');">
		  </figure>
      <div class="details flex-center">
        <div class="platform flex-between gap-24">
          <p class="card-text">Platform: <span>PC</span></p>
          <p class="card-text">Status <span>Active</span></p>
        </div>
        <div class="user flex-between gap-24">
          <p class="card-text">Worth <span>$23</span></p>
          <p class="card-text flex-center card-user">
            <svg class="user-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/></svg>
            <span>2345</span>
          </p>
        </div>
        <div>
          <button class="btn">Get Giveaway</button>
        </div>
      </div>
		`

		gameContainer.appendChild(gameCard)
	})
}



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
