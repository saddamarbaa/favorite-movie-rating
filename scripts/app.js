/** @format */

// Selectors

const addMovieModal = document.getElementById("add-modal");
const StartAddMovieButton = document.getElementById("add-movie");
const backDrop = document.getElementById("backdrop");
const cancleAddMovieButton = document.getElementById("btn--passive");

// Functions

const toggleBackdrop = () => backDrop.classList.toggle("visible");

const toggleMovieModal = () => {
	addMovieModal.classList.toggle("visible");
	toggleBackdrop();
};

const backDropClickHandler = () => toggleMovieModal();

const cancleAddmovie = () => toggleMovieModal();

// EventListener

backDrop.addEventListener("click", backDropClickHandler);
StartAddMovieButton.addEventListener("click", toggleMovieModal);
cancleAddMovieButton.addEventListener("click", cancleAddmovie);
