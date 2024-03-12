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
      const likeButton = document.createElement("button");
      likeButton.innerHTML = '<img src="../assets/images/like.png">';
      likeButton.addEventListener("click", () => {
        // Code to handle liking the movie goes here
        console.log(`You liked ${movie.title}`);
      });
      const commentButton = document.createElement("button");
      commentButton.innerHTML = '<img src="../assets/images/comment.png">';
      commentButton.addEventListener("click", () => {
        // Code to handle commenting on the movie goes here
        console.log(`You commented on ${movie.title}`);
      });

      const favoriteButton = document.createElement("button");
      favoriteButton.innerHTML = '<img src="../assets/images/favorite.png">';
      favoriteButton.addEventListener("click", () => {
        // Code to handle favoriting the movie goes here
        console.log(`You favorited ${movie.title}`);
      });

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
