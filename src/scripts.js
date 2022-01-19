import './css/base.scss';
import './images/IMG_3938.jpg'
import Customers from './classes/Customers.js';
import Bookings from './classes/Bookings.js';
import Rooms from './classes/Rooms.js';
import {customersAPI, roomsAPI, bookingsAPI, updateBookingsAPI} from './apiCalls';
import {resultsFilter, availableRoomsToBook, buttonHome, buttonCurrentBookings, buttonNewBooking, showViewHome, showViewNewBooking, generateResult, showViewSuccessfullyBookedRoom, showCustomerDashboard, showLoginErrorMessage, clearUserBookingResults, displayTotalSpent, clearAvailableRoomsToBook, showListingsMessageAndAvailableRoomsToBookView, showErrorListingsMessage, showListingsMessageAndAvailableRoomsToBook, generateBookedRoomOverview} from './domUpdates';

let customers;
let rooms;
let bookings;

Promise.all([customersAPI, roomsAPI, bookingsAPI]).then(data => {
  customers = data[0].customers.map(customer => new Customers(customer))
  rooms = data[1].rooms.map(room => new Rooms(room))
  bookings = data[2].bookings.map(booking => new Bookings(booking))
}).catch(error => console.log(error));

const buttonLogin = document.getElementById('buttonLogin');
const calendar = document.getElementById('calendar');
let user;
let currentDate = new Date().toJSON().slice(0, 10);
document.getElementById('calendar').setAttribute('value', currentDate);
document.getElementById('calendar').setAttribute('min', currentDate)


const loginUser = () => {
  let usernameInput = document.getElementById('username').value;
  let passwordInput = document.getElementById('password').value;
  let customerPhrase = usernameInput.substring(0, 8);
  let customerNumber = parseInt(usernameInput.substring(8, 10))
  if (customerPhrase === 'customer' && customerNumber > 0 && customerNumber < 51 && passwordInput === 'overlook2021') {
    user = customers[customerNumber - 1]
    showViewCustomerDashboard();
  } else {
    showLoginErrorMessage();
  }
};

const bookRoom = (event) => {
  let userId = parseInt(event.target.dataset.userId, 10);
  let pickedDate = event.target.dataset.pickedDate.replace('-', '/').replace('-', '/');
  let pickedRoomNumber = parseInt(event.target.dataset.pickedRoomNumber, 10);
  updateBookingsAPI(userId, pickedDate, pickedRoomNumber).then(data => {
    bookings.push(new Bookings(data.newBooking))
    showViewSuccessfullyBookedRoom();
    generateBookedRoomOverview(pickedRoomNumber, pickedDate);
    const buttonSeeCurrentBookings = document.getElementById('buttonSeeCurrentBookings');
    const buttonCreateAnotherNewBooking = document.getElementById('buttonCreateAnotherNewBooking');
    buttonSeeCurrentBookings.addEventListener('click', showViewCustomerDashboard);
    buttonCreateAnotherNewBooking.addEventListener('click', showViewNewBooking);
  });
};

const showViewCustomerDashboard = () => {
  showCustomerDashboard();
  showBookings();
};

const newBookingsAPI = () => {
  return fetch('http://localhost:3001/api/v1/bookings').then(response => response.json());
};

const showBookings = () => {
  newBookingsAPI().then(response => {
    bookings = response.bookings.map(booking => new Bookings(booking))
    let userBookings = document.getElementById('userBookings');
    let totalSpent = document.getElementById('totalSpent');
    clearUserBookingResults();
    let result = bookings.filter(booking => booking.userID === user.id);
    result.sort((a, b) => a.date.localeCompare(b.date))
    result.forEach(item => {
      generateResult(item);
    })
    let totalUserCost = user.totalCost(result, rooms)
    displayTotalSpent(totalUserCost);
  }).catch(error => console.log(error));
}

const selectDate = () => {
  let pickedUserDate = document.getElementById('calendar').value;
  let date = pickedUserDate.replace('-', '/').replace('-', '/');
  let resultsFilter = document.getElementById('resultsFilter');
  let filterSelector = resultsFilter.querySelector('input:checked');
  clearAvailableRoomsToBook();
  let result = rooms.filter(room => {
    let takenRooms = bookings.filter(booking => booking.roomNumber === room.number);
    return !takenRooms.find(room => {
      return room.date === date;
    });
  });
  if (filterSelector.value) {
    result = result.filter(room => {
      return room.roomType === filterSelector.value
    });
  }
  showListingsMessageAndAvailableRoomsToBookView();
  if (result.length === 0) {
    showErrorListingsMessage();
  } else {
    result.forEach(room => {
      showListingsMessageAndAvailableRoomsToBook(room, date, user);
    });
  }
};

buttonHome.addEventListener('click', showViewHome);
buttonCurrentBookings.addEventListener('click', showViewCustomerDashboard);
buttonNewBooking.addEventListener('click', showViewNewBooking);
buttonLogin.addEventListener('click', loginUser);
calendar.addEventListener('input', selectDate);
resultsFilter.addEventListener('input', selectDate);
availableRoomsToBook.addEventListener('click', bookRoom)
