document.addEventListener("DOMContentLoaded", function () {
  const favoriteMoviesContainer = document.getElementById("movies-container");
  // Retrieve favorite movies from local storage
  const favoriteMovies =
    JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  // Display favorite movies
  displayFavoriteMovies(favoriteMovies);
  function displayFavoriteMovies(movies) {
    favoriteMoviesContainer.innerHTML = "";
    movies.forEach((movie) => {
      const card = document.createElement("div");
      const buttonsContainer = document.createElement("div");
      buttonsContainer.classList.add("card-buttons");
      card.classList.add("card");
      const title = document.createElement("span");
      title.textContent = movie.title;

      // Create favorite button
      const favoriteButton = document.createElement("button");
      const favoriteIcon = document.createElement("img");
      favoriteIcon.src = "../assets/images/favoriteFull.png";
      favoriteButton.appendChild(favoriteIcon);

      // Add click event to remove favorite
      favoriteButton.addEventListener("click", () => {
        removeFavoriteMovie(movie);
      });

      const image = document.createElement("img");
      image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      card.appendChild(buttonsContainer);
      card.appendChild(title);
      buttonsContainer.appendChild(favoriteButton);
      card.appendChild(image);
      favoriteMoviesContainer.appendChild(card);
    });
  }

  // Function to remove a favorite movie
  function removeFavoriteMovie(movieToRemove) {
    let favoriteMovies =
      JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    favoriteMovies = favoriteMovies.filter(
      (movie) => movie.id !== movieToRemove.id
    );
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
    // Redisplay favorite movies
    displayFavoriteMovies(favoriteMovies);
  }
});
