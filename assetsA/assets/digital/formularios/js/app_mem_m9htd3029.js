
// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card]

// deck of all cards in game
const deck = document.getElementById("card-deck");

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

// stars list
let starsList = document.querySelectorAll(".stars li");

// close icon in modal
let closeicon = document.querySelector(".close");

// declare modal
let modal = document.getElementById("popup1")


// array for opened cards
var openedCards = [];


// @description shuffles cards
// @param {array}
// @returns shuffledarray
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};


// @description shuffles cards when page is refreshed / loads
document.body.onload = startGame();


// @description function to start a new play
function startGame(){
	// shuffle deck
	cards = shuffle(cards);
	// remove all exisiting classes from each card
	for (var i = 0; i < cards.length; i++){
		deck.innerHTML = "";
		[].forEach.call(cards, function(item) {
			deck.appendChild(item);
		});
		cards[i].classList.remove("show", "open", "match", "disabled");
	}
	// reset moves
	moves = 0;
	counter.textContent = moves;
	// reset rating
	for (var i= 0; i < stars.length; i++){
		stars[i].style.color = "#FFD700";
		stars[i].style.visibility = "visible";
	}
	//reset timer
	second = 0;
	minute = 0;
	hour = 0;
	var timer = document.querySelector(".timer");
	var timer2 = document.querySelector(".timer2");
	timer.innerHTML = "00";
	timer2.innerHTML = "00";
	clearInterval(interval);
}


// @description toggles open and show class to display cards
var displayCard = function (){
	this.classList.toggle("open");
	this.classList.toggle("show");
	this.classList.toggle("disabled");
};


// @description add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
	openedCards.push(this);
	var len = openedCards.length;
	moveCounter(); // start timer
	if(len === 2){
		if(openedCards[0].type === openedCards[1].type){
			matched();
		} else {
			unmatched();
		}
	}
};


// @description when cards match
function matched(){
	openedCards[0].classList.add("match", "disabled");
	openedCards[1].classList.add("match", "disabled");
	openedCards[0].classList.remove("show", "open", "no-event");
	openedCards[1].classList.remove("show", "open", "no-event");
	openedCards = [];
}


// description when cards don't match
function unmatched(){
	openedCards[0].classList.add("unmatched");
	openedCards[1].classList.add("unmatched");
	disable();
	setTimeout(function(){
		openedCards[0].classList.remove("show", "open", "no-event","unmatched");
		openedCards[1].classList.remove("show", "open", "no-event","unmatched");
		enable();
		openedCards = [];
	},1100);
}


// @description disable cards temporarily
function disable(){
	Array.prototype.filter.call(cards, function(card){
		card.classList.add('disabled');
	});
}


// @description enable cards and disable matched cards
function enable(){
	Array.prototype.filter.call(cards, function(card){
		card.classList.remove('disabled');
		for(var i = 0; i < matchedCard.length; i++){
			matchedCard[i].classList.add("disabled");
		}
	});
}


// @description count player's moves
function moveCounter(){
	moves++;
	counter.innerHTML = moves;
	//start timer on first click
	if(moves == 1){
		// consume ws, send email and phone: response token
		var emailAddress = document.getElementById("EMAIL_ADDRESS_").value; // email value
		var mobileNumber = document.getElementById("MOBILE_NUMBER_").value; // mobile number value
		
		
		const url = "https://us-central1-micrositiosapps-1e021.cloudfunctions.net/getToken"; // web service url
		const data = {email: emailAddress, phone: mobileNumber}; // post data
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers:{
				'Content-Type': 'application/json',
				mode: 'cors'

			}
		})
		.then(response => response.text())
		.then(data => {
			var obj = JSON.parse(data); // get token parse
			document.getElementById("token").value = obj.token;
			
		})
		.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
		second = 0;
		minute = 0;
		hour = 0;
		startTimer();
	}
	// setting rates based on moves
	if (moves > 8 && moves < 12){
		for( i= 0; i < 3; i++){
			if(i > 1){
				stars[i].style.visibility = "collapse";
			}
		}
	}
	else if (moves > 13){
		for( i= 0; i < 3; i++){
			if(i > 0){
				stars[i].style.visibility = "collapse";
			}
		}
	}
}
// @description game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var timer2 = document.querySelector(".timer2");
var interval;
function startTimer(){
	interval = setInterval(function(){
		timer.innerHTML = minute;
		timer2.innerHTML = second;
		second++;
		if(second == 60){
			minute++;
			second=0;
		}
		if(minute == 60){
			hour++;
			minute = 0;
		}
		if(minute == 5){
			minute = 0;
			startGame();
			document.querySelector("#memoramaId").style.display = "none";
			document.querySelector(".timeAlert").style.display = "block";
		}
	},1000);
}
// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations(){
	if (matchedCard.length == 12){
		clearInterval(interval);
		finalTime = timer.innerHTML;
		finalTime2 = timer2.innerHTML;

		modal.style.display = "block"; // show congratulations
		document.getElementById("memoramaId").style.display = "none"; // hide memorama
		var emailAddress = document.getElementById("EMAIL_ADDRESS_").value; // email value
		var token = document.getElementById("token").value;
		
		
		const url = "https://us-central1-micrositiosapps-1e021.cloudfunctions.net/sorteo"; // web service url
		const data = {email: emailAddress}; // post data
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers:{
				'Accept': 'application/json',
				mode: 'cors',
				'Content-Type': 'application/json',
				'Bearer': token
			}
		})
		.then(response => response.text())
		.then(contents => console.log(contents))
		.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

		// var starRating = document.querySelector(".stars").innerHTML;
		var timeFinal = 0;
		timeFinal = parseInt(finalTime * 60)+parseInt(finalTime2);
		
	};
}
// @description close icon on modal
function closeModal(){
	closeicon.addEventListener("click", function(e){
		modal.classList.remove("show");
		startGame();
	});
}
// @desciption for user to play Again
function playAgain(){
	location.reload();
}
// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
	card = cards[i];
	card.addEventListener("click", displayCard);
	card.addEventListener("click", cardOpen);
	card.addEventListener("click",congratulations);
};
// form validations
function letsplay() {
var inputEmail = document.getElementById("EMAIL_ADDRESS_").value;
var inputPhone = document.getElementById("MOBILE_NUMBER_").value;
var emailAlert = document.getElementsByClassName("email-warning")[0];
var phoneAlert = document.getElementsByClassName("mobile-warning")[0];
// validation if email empty
if(inputEmail == "") {
emailAlert.innerHTML = "El correo es requerido";
}
// validation if phone empty
if(inputPhone == "") {
phoneAlert.innerHTML = "El celular es requerido";
}
// validation phone length
if(inputPhone.length < 10) {
phoneAlert.innerHTML = "El celular es requerido a 10 dígitos";
}
var expr = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if (!expr.test(inputEmail)) {
emailAlert.innerHTML = "Debe ingresar un correo válido";
}

// proccede to play
if(inputEmail !== "" && inputPhone !== "" && inputPhone.length == 10 && expr.test(inputEmail)) {
var content = document.getElementsByClassName("content-3")[0];
var memorama = document.getElementById("memoramaId");
content.style.display = "none";
memorama.style.display = "block";
}
}
// validate phone only numbers
var validNumber = new RegExp(/^\d*\d*$/);
var lastValid = document.getElementById("MOBILE_NUMBER_").value;
function validateNumber(elem) {
	var phoneAlert = document.getElementsByClassName("mobile-warning")[0];
	if (validNumber.test(elem.value)) {
		lastValid = elem.value;
		phoneAlert.innerHTML = '';
	} else {
		elem.value = lastValid;
	}
}
// validate email with regex
function validateEmail() {
	var email = document.getElementById("EMAIL_ADDRESS_").value;
	var lblError = document.getElementsByClassName("email-warning")[0];
	lblError.innerHTML = "";
	var expr = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!expr.test(email)) {
		lblError.innerHTML = "Debe ingresar un correo válido";
	}
}
