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
      const title = document.createElement("h2");
      title.textContent = movie.title;
      const image = document.createElement("img");
      image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      card.appendChild(title);
      card.appendChild(image);
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
