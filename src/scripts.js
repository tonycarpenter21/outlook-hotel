import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import Customers from './classes/Customers.js';
import Bookings from './classes/Bookings.js';
import Rooms from './classes/Rooms.js';
import {customersAPI, roomsAPI, bookingsAPI, updateBookingsAPI} from './apiCalls';

let customers;
let rooms;
let bookings;
let user;

Promise.all([customersAPI, roomsAPI, bookingsAPI]).then(data => {
  customers = data[0].customers.map(customer => new Customers(customer))
  // console.log('customers: ', customers)
  user = customers[getRandomIndex(customers)];
  // console.log("user: ", user)
  rooms = data[1].rooms.map(room => new Rooms(room))
//   console.log('rooms :', rooms)
  bookings = data[2].bookings.map(booking => new Bookings(booking))
  // console.log('bookings: ', bookings)
}).catch(error => console.log(error));

const buttonHome = document.getElementById('buttonHome');
const buttonCurrentBookings = document.getElementById('buttonCurrentBookings');
const buttonNewBooking = document.getElementById('buttonNewBooking');
const buttonLogin = document.getElementById('buttonLogin');
const viewHome = document.getElementById('viewHome');
const viewCustomerDashboard = document.getElementById('viewCustomerDashboard');
const viewNewBooking = document.getElementById('viewNewBooking');
const viewSuccessfullyBookedRoom = document.getElementById('viewSuccessfullyBookedRoom');
let calendar = document.getElementById('calendar');
const resultsFilter = document.getElementById('resultsFilter');
const listingsHeaderMessage = document.getElementById('listingsHeaderMessage');
const availableRoomsToBook = document.getElementById('availableRoomsToBook');
const bookedRoomOverview = document.getElementById('bookedRoomOverview');
let currentDate = new Date().toJSON().slice(0,10);
document.getElementById('calendar').setAttribute('value', currentDate);
document.getElementById('calendar').setAttribute('min', currentDate)

const getRandomIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

const showViewHome = () => {
  hide([viewCustomerDashboard, viewNewBooking, resultsFilter, viewSuccessfullyBookedRoom, buttonHome, buttonCurrentBookings, buttonNewBooking]);
  show([viewHome]);
};
//buttonHome, buttonCurrentBookings, buttonNewBooking
const showViewCustomerDashboard = () => {
  hide([viewHome, viewNewBooking, resultsFilter, viewSuccessfullyBookedRoom, buttonCurrentBookings]);
  show([viewCustomerDashboard, buttonHome, buttonNewBooking]);
  showBookings();
};

const showViewNewBooking = () => {
  hide([listingsHeaderMessage, availableRoomsToBook, viewCustomerDashboard, viewHome, resultsFilter, viewSuccessfullyBookedRoom, buttonNewBooking]);
  show([viewNewBooking, buttonHome, buttonCurrentBookings, ]);
};

const showViewSuccessfullyBookedRoom = () => {
  hide([viewNewBooking, viewCustomerDashboard, viewHome, resultsFilter, buttonHome, buttonCurrentBookings, buttonNewBooking]);
  show([viewSuccessfullyBookedRoom, buttonHome, buttonCurrentBookings, buttonNewBooking]);
};

const hide = (array) => {
  array.forEach(element => element.classList.add('hidden'));
};
  
const show = (array) => {
  array.forEach(element => element.classList.remove('hidden'));
};

const loginUser = () => {
  console.log("user is logged in");
  //form may refresh page?
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

const bookRoom = (event) => {
  let userId = parseInt(event.target.dataset.userId, 10);
  let pickedDate = event.target.dataset.pickedDate.replace('-', '/').replace('-', '/');
  let pickedRoomNumber = parseInt(event.target.dataset.pickedRoomNumber, 10);
  updateBookingsAPI(userId, pickedDate, pickedRoomNumber).then(data => {
    bookings.push(new Bookings(data.newBooking))
    showViewSuccessfullyBookedRoom();
    bookedRoomOverview.innerHTML = ``
    bookedRoomOverview.innerHTML = showBookingDetails(pickedRoomNumber, pickedDate)
    const buttonSeeCurrentBookings = document.getElementById('buttonSeeCurrentBookings');
    const buttonCreateAnotherNewBooking = document.getElementById('buttonCreateAnotherNewBooking');
    buttonSeeCurrentBookings.addEventListener('click', showViewCustomerDashboard);
    buttonCreateAnotherNewBooking.addEventListener('click', showViewNewBooking);
  });
};

const showResult = (item) => {
  return `<section class="currently-booked-room"> Date: ${item.date}<br/>
    Room Number: ${item.roomNumber}</section>`;
};

const uppercaseFirstLetter = (item) => {
  let phrase = item.split(" ").map((letter) => letter.charAt(0).toUpperCase() + letter.substring(1)).join(' ');
  return phrase;
};

const showRoom = (item, date) => {
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

const newBookingsAPI = () => {
  return fetch('http://localhost:3001/api/v1/bookings').then(response => response.json());
};

const showBookings = () => {
  newBookingsAPI().then(response => {
    bookings = response.bookings.map(booking => new Bookings(booking))
    const userBookings = document.getElementById('userBookings');
    const totalSpent = document.getElementById('totalSpent');
    totalSpent.innerHTML = '';
    userBookings.innerHTML = '';
    let result = bookings.filter(booking => booking.userID === user.id);
    console.log(result);
    result.forEach(item => {
      userBookings.innerHTML += showResult(item);
    })
    const totalCost = result.reduce((acc, item) =>{
      let matchingRoom = rooms.find(room => item.roomNumber === room.number);
      acc += matchingRoom.costPerNight;
      return acc;
    }, 0)
    totalSpent.innerHTML = `Total Spent: $${totalCost.toFixed(2)}`
  }).catch(error => console.log(error));
}

const selectDate = () => {
  let pickedUserDate = document.getElementById('calendar').value;
  let date = pickedUserDate.replace('-', '/').replace('-', '/');
  let resultsFilter = document.getElementById('resultsFilter');
  let filterSelector = resultsFilter.querySelector('input:checked');
  availableRoomsToBook.innerHTML = '';
  let result = rooms.filter(room => {
    let takenRooms = bookings.filter(booking => booking.roomNumber === room.number);
    return !takenRooms.find(room => {
      return room.date === date;
    });
  });
  if (filterSelector.value) {
    result = result.filter(room => {
      console.log(room.roomType)
      console.log(filterSelector.value)
      return room.roomType === filterSelector.value
    });
  }
  show([listingsHeaderMessage, availableRoomsToBook])
  if (result.length === 0) {
    listingsHeaderMessage.innerHTML = `I'm sorry, but there are no rooms available for that date. Please search another date.`
    availableRoomsToBook.innerHTML = '';
  } else {
    result.forEach(room => {
      show([resultsFilter]);
      listingsHeaderMessage.innerHTML = `Available Rooms To Book For The Selected Day:<br/>`
      availableRoomsToBook.innerHTML += showRoom(room, date);
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
