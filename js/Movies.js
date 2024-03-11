const apiKey = "872bffeff09e295fe03b076121c769fc";

// Fetch movies from TheMovieDB API
fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
  .then((response) => response.json())
  .then((data) => {
    const moviesContainer = document.getElementById("movies-container");
    console.log(data);
    // Iterate over the results and create cards for each movie
    data.results.forEach((movie) => {
      const card = document.createElement("div");
      card.classList.add("card");
      const title = document.createElement("h2");
      title.textContent = movie.title;
      const overview = document.createElement("p");
      overview.textContent = movie.overview;
      card.appendChild(title);
      card.appendChild(overview);
      moviesContainer.appendChild(card);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
