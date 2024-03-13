document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "872bffeff09e295fe03b076121c769fc";
  const baseUrl = "https://api.themoviedb.org/3";
  const moviesContainer = document.getElementById("movies-container");

  // function to display the movies by category
  function fetchMovies(category) {
    let endpoint = "/movie/popular";
    if (category !== "all") {
      endpoint = `/movie/${category}`;
    }
    const url = `${baseUrl}${endpoint}?api_key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        displayMovies(data.results);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }
  // function to display movies
  function displayMovies(movies) {
    moviesContainer.innerHTML = "";
    movies.forEach((movie) => {
      const card = createMovieCard(movie);
      moviesContainer.appendChild(card);
    });
  }
  // function to createMovieCard
  function createMovieCard(movie) {
    const card = document.createElement("div");
    card.classList.add("card");
    const title = document.createElement("p");
    title.textContent = movie.title;

    const image = document.createElement("img");
    image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    const buttonsContainer = createButtonsContainer(movie);

    card.appendChild(title);
    card.appendChild(image);
    card.appendChild(buttonsContainer);
    return card;
  }

  // function create Container of Buttons
  function createButtonsContainer(movie) {
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("card-buttons");

    const likeButton = createButton(
      "../assets/images/unlike.png",
      () => toggleLike(movie),
      `Like ${movie.title}`
    );

    const commentButton = createButton(
      "../assets/images/comment.png",
      () => commentOnMovie(movie),
      `Comment on ${movie.title}`
    );

    const favoriteButton = createFavoriteButton(movie);
    buttonsContainer.appendChild(likeButton);
    buttonsContainer.appendChild(commentButton);
    buttonsContainer.appendChild(favoriteButton);

    return buttonsContainer;
  }

  // create 3 buttons(like, comment, favorite)
  function createButton(iconSrc, clickHandl, title) {
    const button = document.createElement("button");
    button.innerHTML = `<img src="${iconSrc}" alt="${title}">`;
    button.addEventListener("click", clickHandl);
    button.title = title;
    return button;
  }

  // favorite button
  function createFavoriteButton(movie) {
    const isFavorite = isMovieFavorite(movie.id);
    const favoriteIconSrc = isFavorite
      ? "../assets/images/favoriteFull.png"
      : "../assets/images/favorite.png";

    const favoriteButton = createButton(
      favoriteIconSrc,
      () => toggleFavorite(movie),
      isFavorite ? `Unfavorite ${movie.title}` : `Favorite ${movie.title}`
    );

    return favoriteButton;
  }

  function toggleLike(movie) {
    const likeButton = event.target.parentNode;
    const likeIcon = likeButton.querySelector("img");

    if (likeIcon.src.endsWith("unlike.png")) {
      likeIcon.src = "../assets/images/like1.png";
      console.log(`You liked ${movie.title}`);
    } else {
      likeIcon.src = "../assets/images/unlike.png";
      console.log(`You unliked ${movie.title}`);
    }
  }

  function commentOnMovie(movie) {
    console.log(`You commented on ${movie.title}`);
  }

  // function to check if the movie is already in the list of movies
  function isMovieFavorite(movieId) {
    const favoriteMovies =
      JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    return favoriteMovies.some((favoriteMovie) => favoriteMovie.id === movieId);
  }
  // function to toggle the movie favorite
  function toggleFavorite(movie) {
    const favoriteButton = event.currentTarget;
    const favoriteIcon = favoriteButton.querySelector("img");
    const isFavorite = isMovieFavorite(movie.id);

    if (!isFavorite) {
      const favoriteMovies =
        JSON.parse(localStorage.getItem("favoriteMovies")) || [];
      favoriteMovies.push(movie);
      localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
      console.log(`You favorited ${movie.title}`);
    } else {
      const favoriteMovies =
        JSON.parse(localStorage.getItem("favoriteMovies")) || [];
      const updatedFavorites = favoriteMovies.filter(
        (favoriteMovie) => favoriteMovie.id !== movie.id
      );
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
      console.log(`You unfavorited ${movie.title}`);
    }

    favoriteIcon.src = isFavorite
      ? "../assets/images/favorite.png"
      : "../assets/images/favoriteFull.png";
  }

  // to load the movies by category
  document
    .getElementById("filterSelect")
    .addEventListener("change", function () {
      const selectedCategory = this.value;
      fetchMovies(selectedCategory);
    });

  fetchMovies("all");
});
