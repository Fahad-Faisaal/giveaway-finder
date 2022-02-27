const displayPopularGames = game => {
  
}

const loadPopularGames = async () => {
 

 const data = await response.json();

 console.log(data);
 displayPopularGames(data);
};

loadPopularGames();

// https://example.p.rapidapi.com/?rapidapi-key=***************************