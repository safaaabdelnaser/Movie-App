document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "872bffeff09e295fe03b076121c769fc";
  const baseUrl = "https://api.themoviedb.org/3";

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

  function displayMovies(movies) {
    const moviesContainer = document.getElementById("movies-container");
    moviesContainer.innerHTML = "";

    movies.forEach((movie) => {
      const card = document.createElement("div");
      card.classList.add("card");
      const title = document.createElement("p");
      title.textContent = movie.title;
      const image = document.createElement("img");
      image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      // buttons
      const likeButton = document.createElement("button");
      const likeIcon = document.createElement("img");
      likeIcon.src = "../assets/images/unlike.png";
      likeButton.appendChild(likeIcon);
      // comment button
      const commentButton = document.createElement("button");
      commentButton.innerHTML = '<img src="../assets/images/comment.png">';
      commentButton.addEventListener("click", () => {
        console.log(`You commented on ${movie.title}`);
      });

      // favorite button
      const favoriteButton = document.createElement("button");
      const favoriteIcon = document.createElement("img");
      favoriteIcon.src = "../assets/images/favorite.png";
      favoriteButton.appendChild(favoriteIcon);
      // Check if the movie is already in favorites
      function isMovieFavorite(movieId) {
        const favoriteMovies =
          JSON.parse(localStorage.getItem("favoriteMovies")) || [];
        return favoriteMovies.some(
          (favoriteMovie) => favoriteMovie.id === movieId
        );
      }

      // Toggle favorite status
      function toggleFavorite(movie) {
        const movieId = movie.id;
        const favoriteMovies =
          JSON.parse(localStorage.getItem("favoriteMovies")) || [];
        const isAlreadyFavorite = isMovieFavorite(movieId);

        if (!isAlreadyFavorite) {
          // Add movie to favorites
          favoriteMovies.push(movie);
          localStorage.setItem(
            "favoriteMovies",
            JSON.stringify(favoriteMovies)
          );
          console.log(`You favorited ${movie.title}`);
          favoriteIcon.src = "../assets/images/favoriteFull.png";
        } else {
          // Remove movie from favorites
          const updatedFavorites = favoriteMovies.filter(
            (favoriteMovie) => favoriteMovie.id !== movieId
          );
          localStorage.setItem(
            "favoriteMovies",
            JSON.stringify(updatedFavorites)
          );
          console.log(`You unfavorited ${movie.title}`);
          favoriteIcon.src = "../assets/images/favorite.png";
        }
      }

      // Event listener for clicking the favorite button
      favoriteButton.addEventListener("click", () => {
        toggleFavorite(movie);
      });
      // Check and update favorite icon status on page load
      if (isMovieFavorite(movie.id)) {
        favoriteIcon.src = "../assets/images/favoriteFull.png";
      }
      card.appendChild(title);
      card.appendChild(image);
      card.appendChild(likeButton);
      card.appendChild(commentButton);
      card.appendChild(favoriteButton);
      moviesContainer.appendChild(card);
    });
  }
  fetchMovies("all");

  // Event listener for filter selection
  document
    .getElementById("filterSelect")
    .addEventListener("change", function () {
      const selectedCategory = this.value;
      if (selectedCategory === "all") {
        fetchMovies("popular");
      } else {
        fetchMovies(selectedCategory);
      }
    });
});
