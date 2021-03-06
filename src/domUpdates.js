const viewHome = document.getElementById('viewHome');
const viewCustomerDashboard = document.getElementById('viewCustomerDashboard');
const viewNewBooking = document.getElementById('viewNewBooking');
const viewSuccessfullyBookedRoom = document.getElementById('viewSuccessfullyBookedRoom');
const resultsFilter = document.getElementById('resultsFilter');
const buttonHome = document.getElementById('buttonHome');
const buttonCurrentBookings = document.getElementById('buttonCurrentBookings');
const buttonNewBooking = document.getElementById('buttonNewBooking');
const bookedRoomOverview = document.getElementById('bookedRoomOverview');
const loginErrorMessage = document.getElementById('loginErrorMessage');
const errorSpacer = document.getElementById('errorSpacer');
const listingsHeaderMessage = document.getElementById('listingsHeaderMessage');
const availableRoomsToBook = document.getElementById('availableRoomsToBook');
let userBookings = document.getElementById('userBookings');
let totalSpent = document.getElementById('totalSpent');

const hide = (array) => {
  array.forEach(element => element.classList.add('hidden'));
};
  
const show = (array) => {
  array.forEach(element => element.classList.remove('hidden'));
};

const showViewHome = () => {
  hide([viewCustomerDashboard, viewNewBooking, resultsFilter, viewSuccessfullyBookedRoom, buttonHome, buttonCurrentBookings, buttonNewBooking]);
  show([viewHome, errorSpacer]);
};

const showCustomerDashboard = () => {
  hide([viewHome, viewNewBooking, resultsFilter, viewSuccessfullyBookedRoom, buttonCurrentBookings, loginErrorMessage]);
  show([viewCustomerDashboard, buttonHome, buttonNewBooking]);
};

const showViewNewBooking = () => {
  hide([listingsHeaderMessage, availableRoomsToBook, viewCustomerDashboard, viewHome, resultsFilter, viewSuccessfullyBookedRoom, buttonNewBooking]);
  show([viewNewBooking, buttonHome, buttonCurrentBookings, ]);
};

const showViewSuccessfullyBookedRoom = () => {
  hide([viewNewBooking, viewCustomerDashboard, viewHome, resultsFilter, buttonHome, buttonCurrentBookings, buttonNewBooking]);
  show([viewSuccessfullyBookedRoom, buttonHome, buttonCurrentBookings, buttonNewBooking]);
  bookedRoomOverview.innerHTML = ``
};

const generateBookedRoomOverview = (pickedRoomNumber, pickedDate) => {
  bookedRoomOverview.innerHTML = showBookingDetails(pickedRoomNumber, pickedDate);
}

const uppercaseFirstLetter = (item) => {
  let phrase = item.split(" ").map((letter) => letter.charAt(0).toUpperCase() + letter.substring(1)).join(' ');
  return phrase;
};

const generateResult = (item) => {
  userBookings.innerHTML += showResult(item);
}; 

const showBookingDetails = (pickedRoomNumber, pickedDate) => {
  return `<h1>Congrats on booking your stay!</h1>
    <h2>Room Details:</h2>
    <section class="booked-room-details">
        Room Number: ${pickedRoomNumber}<br/>
        Booked Date: ${pickedDate}
    </section>
    <div class="bookingDetailsNavigation">
        <button class="nav-button" id="buttonSeeCurrentBookings">See All Current Bookings</button>
        <button class="nav-button" id="buttonCreateAnotherNewBooking">Create Another Booking</button>
    </div>`
};

const showResult = (item) => {
  return `<section class="currently-booked-room"> Date: ${item.date}<br/>
    Room Number: ${item.roomNumber}</section>`;
};

const showLoginErrorMessage = () => {
  show([loginErrorMessage]);
  hide([errorSpacer])
};

const clearUserBookingResults = () => {
  totalSpent.innerHTML = '';
  userBookings.innerHTML = '';
};

const displayTotalSpent = (totalCost) => {
  totalSpent.innerHTML = `Total Spent: $${totalCost.toFixed(2)}`
};

const clearAvailableRoomsToBook = () => {
  availableRoomsToBook.innerHTML = '';
};

const showRoom = (item, date, user) => {
  return `
    <section class="available-rooms-to-book">
    Room Number: ${item.number}<br/>
    Type: ${uppercaseFirstLetter(item.roomType)}<br/>
    Bed Size: ${uppercaseFirstLetter(item.bedSize)}<br/>
    Number of Beds: ${item.numBeds}<br/>
    Cost Per Night: $${item.costPerNight.toFixed(2)}<br/>
    Bidet: ${item.bidet ? "Yes" : "No"}<br/>
    <button data-user-id="${user.id}" data-picked-date="${date}" data-picked-room-number="${item.number}" class="nav-button" buttonBookStay>Book Room</button>
    </section>`
};

const showListingsMessageAndAvailableRoomsToBookView = () => {
  show([listingsHeaderMessage, availableRoomsToBook])
};

const showErrorListingsMessage = () => {
  listingsHeaderMessage.innerHTML = `I'm sorry, but there are no rooms available for that date. Please search another date.`
  availableRoomsToBook.innerHTML = '';
};

const showListingsMessageAndAvailableRoomsToBook = (room, date, user) => {
  show([resultsFilter]);
  listingsHeaderMessage.innerHTML = `Available Rooms To Book For The Selected Day:<br/>`
  availableRoomsToBook.innerHTML += showRoom(room, date, user);
};

export {
  resultsFilter,
  viewHome,
  viewCustomerDashboard,
  viewNewBooking,
  viewSuccessfullyBookedRoom,
  buttonHome,
  buttonCurrentBookings,
  buttonNewBooking,
  bookedRoomOverview,
  loginErrorMessage,
  errorSpacer,
  listingsHeaderMessage,
  availableRoomsToBook,
  userBookings,
  totalSpent,
  hide,
  show,
  showViewHome,
  showViewNewBooking,
  generateResult,
  showViewSuccessfullyBookedRoom,
  generateBookedRoomOverview,
  showBookingDetails,
  showResult,
  showCustomerDashboard,
  showLoginErrorMessage,
  clearUserBookingResults,
  displayTotalSpent,
  clearAvailableRoomsToBook,
  showListingsMessageAndAvailableRoomsToBookView,
  showErrorListingsMessage,
  showListingsMessageAndAvailableRoomsToBook,
  showRoom,
  uppercaseFirstLetter
};