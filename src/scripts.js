import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import Customers from './classes/Customers.js';
import Bookings from './classes/Bookings.js';
import Rooms from './classes/Rooms.js';

////// eventually break down the following into it's own file:
// import {customersAPI, roomsAPI, bookingsAPI,} from './apiCalls';

const customersAPI = fetch('http://localhost:3001/api/v1/customers').then(response => response.json()).catch(error => console.log(error));
//GET single customer - http://localhost:3001/api/v1/customers/<id> where <id> will be a number of a customer's id. Sample response: object of single customer's info

const roomsAPI = fetch('http://localhost:3001/api/v1/rooms').then(response => response.json()).catch(error => console.log(error));

const bookingsAPI = fetch('http://localhost:3001/api/v1/bookings').then(response => response.json()).catch(error => console.log(error));
//POST - Add new booking - required properties	{ "userID": 48, "date": "2019/09/23", "roomNumber": 4 }. Sample response: { message: 'Booking with id <id> successfully posted', newBooking: <Object with trip info just posted> }
//DELETE - Delete single booking http://localhost:3001/api/v1/bookings/<id> where <id> will be a number of a booking's id. Sample response:	{ message: Booking #<id> has been deleted }

//////end apiCall file

const updateAPI = () => {
//   return fetch('http://localhost:3001/api/v1/users', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ userID: userId, ingredientID: ingredientId })
//   }).then(response => response.json()).catch(error => console.log(error));
}
export {
  customersAPI,
  roomsAPI,
  bookingsAPI,
  updateAPI
}

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
        // console.log('rooms :', rooms)
    bookings = data[2].bookings.map(booking => new Bookings(booking))
        console.log('bookings: ', bookings)
}).catch(error => console.log(error));



var dayjs = require('dayjs')
dayjs().format()

const buttonHome = document.getElementById('buttonHome');
const buttonCurrentBookings = document.getElementById('buttonCurrentBookings');
const buttonNewBooking = document.getElementById('buttonNewBooking');
const buttonLogin = document.getElementById('buttonLogin');
const buttonBookStay = document.getElementById('buttonBookStay');
const viewHome = document.getElementById('viewHome');
const viewCustomerDashboard = document.getElementById('viewCustomerDashboard');
const viewNewBooking = document.getElementById('viewNewBooking');
const calendar = document.getElementById('calendar');
const resultsFilter = document.getElementById('resultsFilter');
const listingsHeaderMessage = document.getElementById('listingsHeaderMessage');
const availableRoomsToBook = document.getElementById('availableRoomsToBook');

const getRandomIndex = (arr) => {
    return Math.floor(Math.random() * arr.length);
};

const showViewHome = () => {
    hide([viewCustomerDashboard, viewNewBooking, resultsFilter]);
    show([viewHome]);
};

const showViewCustomerDashboard = () => {
    hide([viewHome, viewNewBooking, resultsFilter]);
    show([viewCustomerDashboard]);
    showBookings();
};

const showViewNewBooking = () => {
    hide([viewCustomerDashboard, viewHome, resultsFilter]);
    show([viewNewBooking]);
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
}

const bookStay = () => {
    console.log("stay has been booked");
}

const showResult = (item) => {
    return `Date: ${item.date}, Room Number: ${item.roomNumber}<br/>`
}

const uppercaseFirstLetter = (item) => {
    let phrase = item.split(" ").map((letter) => letter.charAt(0).toUpperCase() + letter.substring(1)).join(' ');
    return phrase;
}


const showRoom = (item, event) => {
    return `
    <section class="available-rooms-to-book">
    Room Number: ${item.number}<br/>
    Type: ${uppercaseFirstLetter(item.roomType)}<br/>
    Bed Size: ${uppercaseFirstLetter(item.bedSize)}<br/>
    Number of Beds: ${item.numBeds}<br/>
    Cost Per Night: $${item.costPerNight.toFixed(2)}<br/>
    Bidet: ${item.bidet ? "Yes" : "No"}<br/>
    <br/>
    <center><button data-user-id="${user.id}" data-picked-date="${event.target.value}" data-picked-room-number="${item.number}" class="nav-button" buttonBookStay>Book Room</button><br/></center>
    <br/>
    </section>`
}

const newBookingsAPI = () => {
    return fetch('http://localhost:3001/api/v1/bookings').then(response => response.json());
}

const showBookings = () => {
    newBookingsAPI().then(response => {
        const userBookings = document.getElementById('userBookings');
        const totalSpent = document.getElementById('totalSpent');
        totalSpent.innerHTML = '';
        userBookings.innerHTML = '';
        let result = bookings.bookings.filter(booking => booking.userID === user.id);
        console.log(result);
        result.forEach(item => {
            userBookings.innerHTML += showResult(item);
        })
        const totalCost = result.reduce((acc, item) =>{
            let matchingRoom = rooms.rooms.find(room => item.roomNumber === room.number) ;
            acc += matchingRoom.costPerNight;
            return acc;
        }, 0)
        totalSpent.innerHTML = `Total Spent: $${totalCost.toFixed(2)}`
    }).catch(error => console.log(error));
}

const selectDate = (event) => {
    let date = event.target.value.replace('-', '/').replace('-', '/')
    let result = rooms.filter(room => {
        let takenRooms = bookings.filter(booking => booking.roomNumber === room.number);
        return !takenRooms.find(room => {
            return room.date === date;
        })
    })
    if (result.length === 0) {
        listingsHeaderMessage.innerHTML = `I'm sorry, but there are no rooms available for that date. Please search another date.`

    } else {
        result.forEach(room => {
            show([resultsFilter]);
            listingsHeaderMessage.innerHTML = `Available Rooms To Book For The Selected Day:<br/>`
            availableRoomsToBook.innerHTML += showRoom(room, event);
        })
    }
}

buttonHome.addEventListener('click', showViewHome);
buttonCurrentBookings.addEventListener('click', showViewCustomerDashboard);
buttonNewBooking.addEventListener('click', showViewNewBooking);
buttonLogin.addEventListener('click', loginUser);
buttonBookStay.addEventListener('click', bookStay);
calendar.addEventListener('input', selectDate);