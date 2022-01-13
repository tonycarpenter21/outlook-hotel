// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here.');

const buttonHome = document.getElementById('buttonHome');
const buttonCurrentBookings = document.getElementById('buttonCurrentBookings');
const buttonNewBooking = document.getElementById('buttonNewBooking');
const buttonLogin = document.getElementById('buttonLogin');
const buttonBookStay = document.getElementById('buttonBookStay');
const viewHome = document.getElementById('viewHome');
const viewCustomerDashboard = document.getElementById('viewCustomerDashboard');
const viewNewBooking = document.getElementById('viewNewBooking')

const showViewHome = () => {
    hide([viewCustomerDashboard, viewNewBooking]);
    show([viewHome]);
};

const showViewCustomerDashboard = () => {
    hide([viewHome, viewNewBooking]);
    show([viewCustomerDashboard]);
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

buttonHome.addEventListener('click', showViewHome);
buttonCurrentBookings.addEventListener('click', showViewCustomerDashboard);
buttonNewBooking.addEventListener('click', showViewNewBooking);
buttonLogin.addEventListener('click', loginUser);
buttonBookStay.addEventListener('click', bookStay);
