/** @format */

// Selectors
const addMovieModal = document.getElementById("add-modal");
const StartAddMovieButton = document.getElementById("add-movie");
const backDrop = document.getElementById("backdrop");
const cancleAddMovieButton = document.getElementById("btn--passive");
const confirmAddMovieButton = cancleAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

// Functions
const updateUI = () => {
	if (movies.length === 0) entryTextSection.style.display = "block";
	else entryTextSection.style.display = "none";
};

const toggleBackdrop = () => backDrop.classList.toggle("visible");
const closeMovieModal = () => addMovieModal.classList.remove("visible");

const showMovieModal = () => {
	addMovieModal.classList.add("visible");
	toggleBackdrop();
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
	const newMovieElement = document.createElement("li");
	newMovieElement.className = "movie-element";

	newMovieElement.innerHTML = `
	<div class = "movie-element__image">
		<img src="${imageUrl}" alt="${title}">
	 </div>

	 <div class = "movie-element__info">
	  <h2> ${title}</h2>
	  <p> ${rating}/5stars </p>
	  </div>
	`;

	// Add EventListener
	newMovieElement.addEventListener(
		"click",
		startDeleteMovieHandler.bind(null, id),
	);
	const listRoot = document.getElementById("movie-list");
	listRoot.append(newMovieElement);
};

// Remove movie from array
const deleteMovieHandler = (movieId) => {
	let movieIndex = 0;
	for (const movie of movies) {
		if (movie.id === movieId) {
			break;
		}
		movieIndex++;
	}

	// Remove movie from array
	movies.splice(movieIndex, 1);
	const listRoot = document.getElementById("movie-list");
	listRoot.children[movieIndex].remove();
	// listRoot.removeChild(listRoot.children[movieIndex]);
	closeMovieModal();

	updateUI();
};

const startDeleteMovieHandler = (movieId) => {
	deleteMovieModal.classList.add("visible");
	toggleBackdrop();
	const cancelDeletionButton = deleteMovieModal.querySelector(".btn--passive");
	let confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");
	confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
	confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");
	// confirmDeletionButton.removeEventListener('click', deleteMovieHandler.bind(null, movieId)); // will not work :(
	cancelDeletionButton.removeEventListener("click", closeMovieDeletionModal);
	cancelDeletionButton.addEventListener("click", closeMovieDeletionModal);
	confirmDeletionButton.addEventListener(
		"click",
		deleteMovieHandler.bind(null, movieId),
	);
};

const closeMovieDeletionModal = () => {
	toggleBackdrop();
	deleteMovieModal.classList.remove("visible");
};

const backDropClickHandler = () => {
	closeMovieModal();
	closeMovieDeletionModal();
	clearMovieInput();
};

const cancleAddmovieHandler = () => {
	closeMovieModal();
	toggleBackdrop();
	clearMovieInput();
};

// Add movies
const addMovieHandler = () => {
	let titleValue = userInputs[0].value;
	const imageUrlValue = userInputs[1].value;
	const ratingValue = userInputs[2].value;

	// trim Remove whitespace from both sides of a string
	if (
		titleValue.trim() === "" ||
		imageUrlValue.trim() === "" ||
		ratingValue.trim() === "" ||
		+ratingValue < 1 ||
		+ratingValue > 5
	) {
		alert("Please enter valid values (rating between 1 and 5");
		return;
	}

	const newMovie = {
		id: Math.random().toString,
		title: titleValue,
		image: imageUrlValue,
		rating: ratingValue,
	};

	movies.push(newMovie);
	console.log(movies);
	closeMovieModal();
	toggleBackdrop();
	clearMovieInput();
	renderNewMovieElement(
		newMovie.id,
		newMovie.title,
		newMovie.image,
		newMovie.rating,
	);
	updateUI();
};

// Clear input value
const clearMovieInput = () => {
	for (const input of userInputs) {
		input.value = "";
	}
};

// EventListeners
backDrop.addEventListener("click", backDropClickHandler);
StartAddMovieButton.addEventListener("click", showMovieModal);
cancleAddMovieButton.addEventListener("click", cancleAddmovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
