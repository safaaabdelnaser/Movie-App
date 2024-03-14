document.addEventListener("DOMContentLoaded", function () {
  const favoriteMoviesContainer = document.getElementById("movies-container");
  const noFavoriteImage = document.getElementById("nofavorite-image");

  // Retrieve favorite movies from local storage
  let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];

  // Display favorite movies
  displayFavoriteMovies(favoriteMovies);

  function displayFavoriteMovies(movies) {
    favoriteMoviesContainer.innerHTML = "";

    if (movies.length === 0) {
      noFavoriteImage.style.display = "block";
    } else {
      noFavoriteImage.style.display = "none";
    }

    movies.forEach((movie) => {
      const card = createCardElement(movie);
      favoriteMoviesContainer.appendChild(card);
    });
  }

  function createCardElement(movie) {
    const card = document.createElement("div");
    card.classList.add("card");

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("card-buttons");
    card.appendChild(buttonsContainer);

    const title = document.createElement("span");
    title.textContent = movie.title;
    card.appendChild(title);

    const favoriteButton = createFavoriteButton(movie);
    buttonsContainer.appendChild(favoriteButton);

    const image = createImageElement(movie);
    card.appendChild(image);

    return card;
  }

  function createFavoriteButton(movie) {
    const favoriteButton = document.createElement("button");

    const favoriteIcon = document.createElement("img");
    favoriteIcon.src = "../assets/images/favoriteFull.png";
    favoriteButton.appendChild(favoriteIcon);

    favoriteButton.addEventListener("click", () => {
      removeFavoriteMovie(movie);
    });

    return favoriteButton;
  }

  function createImageElement(movie) {
    const image = document.createElement("img");
    image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    return image;
  }

  function removeFavoriteMovie(movieToRemove) {
    favoriteMovies = favoriteMovies.filter(
      (movie) => movie.id !== movieToRemove.id
    );
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
    displayFavoriteMovies(favoriteMovies);

    if (favoriteMovies.length === 0) {
      noFavoriteImage.style.display = "block";
    }
  }
});
