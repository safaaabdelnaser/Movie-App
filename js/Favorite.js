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
      card.classList.add("card");
      const title = document.createElement("span");
      title.textContent = movie.title;
      const favoriteButton = document.createElement("button");
      const favoriteIcon = document.createElement("img");
      favoriteIcon.src = "../assets/images/favoriteFull.png";
      favoriteButton.appendChild(favoriteIcon);

      const image = document.createElement("img");
      image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      card.appendChild(title);
      card.appendChild(favoriteButton);
      card.appendChild(image);
      favoriteMoviesContainer.appendChild(card);
    });
  }
});
