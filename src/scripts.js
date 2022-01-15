import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

////// eventually break down the following into it's own file:
// import {customersAPI, roomsAPI, bookingsAPI,} from './apiCalls';

const customersAPI = fetch('http://localhost:3001/api/v1/customers').then(response => response.json()).catch(error => console.log(error));
//GET all customers. Sample response: object with customers property containing an array of all customers
//GET single customer - http://localhost:3001/api/v1/customers/<id> where <id> will be a number of a customer's id. Sample response: object of single customer's info

const roomsAPI = fetch('http://localhost:3001/api/v1/rooms').then(response => response.json()).catch(error => console.log(error));
//GET all rooms. Sample response: object with rooms property containing an array of all rooms

const bookingsAPI = fetch('http://localhost:3001/api/v1/bookings').then(response => response.json()).catch(error => console.log(error));
//GET all bookings. Sample response: object with bookings property containing an array of all bookings
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

Promise.all([customersAPI, roomsAPI, bookingsAPI]).then(data => {
    customers = data[0];
    rooms = data[1];
    bookings = data[2];
    // console.log('customers: ', customers)
    console.log('rooms :', rooms)
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
const availableRoomsToBook = document.getElementById('availableRoomsToBook');

const showViewHome = () => {
    hide([viewCustomerDashboard, viewNewBooking]);
    show([viewHome]);
};

const showViewCustomerDashboard = () => {
    hide([viewHome, viewNewBooking]);
    show([viewCustomerDashboard]);
    showBookings();
};

const showViewNewBooking = () => {
    hide([viewCustomerDashboard, viewHome]);
    show([viewNewBooking]);
};

const hide = (array) => {
    array.forEach(element => element.classList.add('hidden'));
};
  
const show = (array) => {
    array.forEach(element => element.classList.remove('hidden'));
};

const loginUser = () => {
    console.log("user is logged in")
    //form may refresh page?
}

const bookStay = () => {
    console.log("stay has been booked")
}

const showResult = (item) => {
    return `Date: ${item.date}, Room Number: ${item.roomNumber}<br/>`
}

const showRoom = (item) => {
    return `Room Number: ${item.number}<br/>
    Room Type: ${item.roomTypebedSize}<br/>
    Bed Size: ${item.bedSize}<br/>
    Number of Beds: ${item.numBeds}<br/>
    Cost Per Night: ${item.costPerNight}<br/>
    Bidet: ${item.bidet}<br/>
    <br/>`
}

const newBookingsAPI = () => {
    return fetch('http://localhost:3001/api/v1/bookings').then(response => response.json());
}

const showBookings = () => {
    newBookingsAPI().then(response => {
        const userBookings = document.getElementById('userBookings')
        const totalSpent = document.getElementById('totalSpent')
        totalSpent.innerHTML = ''
        userBookings.innerHTML = ''
        let result = bookings.bookings.filter(booking => booking.userID === 1)
        console.log(result)
        result.forEach(item => {
            userBookings.innerHTML += showResult(item)
        })
        const totalCost = result.reduce((acc, item) =>{
            let matchingRoom = rooms.rooms.find(room => item.roomNumber === room.number) 
            acc += matchingRoom.costPerNight
            return acc;
        }, 0)
        totalSpent.innerHTML = `Total Spent: $${totalCost.toFixed(2)}`
        console.log(totalCost.toFixed(2))
    }).catch(error => console.log(error));
}

const selectDate = (event) => {
    let result = rooms.rooms.filter(room => {
        let takenRooms = bookings.bookings.filter(booking => booking.roomNumber === room.number)
        return !takenRooms.find(room => {
            return room.date === event.target.value
        })
    })
    result.forEach(room => {
        availableRoomsToBook.innerHTML += showRoom(room)
    })
}

buttonHome.addEventListener('click', showViewHome);
buttonCurrentBookings.addEventListener('click', showViewCustomerDashboard);
buttonNewBooking.addEventListener('click', showViewNewBooking);
buttonLogin.addEventListener('click', loginUser);
buttonBookStay.addEventListener('click', bookStay);
calendar.addEventListener('input', selectDate);