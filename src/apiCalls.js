const customersAPI = fetch('http://localhost:3001/api/v1/customers').then(response => response.json()).catch(error => console.log(error));
//GET single customer - http://localhost:3001/api/v1/customers/<id> where <id> will be a number of a customer's id. Sample response: object of single customer's info

const roomsAPI = fetch('http://localhost:3001/api/v1/rooms').then(response => response.json()).catch(error => console.log(error));

const bookingsAPI = fetch('http://localhost:3001/api/v1/bookings').then(response => response.json()).catch(error => console.log(error));
//POST - Add new booking - required properties	{ "userID": 48, "date": "2019/09/23", "roomNumber": 4 }. Sample response: { message: 'Booking with id <id> successfully posted', newBooking: <Object with trip info just posted> }
//DELETE - Delete single booking http://localhost:3001/api/v1/bookings/<id> where <id> will be a number of a booking's id. Sample response:	{ message: Booking #<id> has been deleted }

const updateBookingsAPI = (userId, pickedDate, pickedRoomNumber) => {
    return fetch('http://localhost:3001/api/v1/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userID: userId, date: pickedDate, roomNumber: pickedRoomNumber })
    }).then(response => response.json()).catch(error => console.log(error));
}

export {
    customersAPI,
    roomsAPI,
    bookingsAPI,
    updateBookingsAPI
  };