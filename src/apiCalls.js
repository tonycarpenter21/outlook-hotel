const customersAPI = fetch('http://localhost:3001/api/v1/customers').then(response => errorCheck(response)).catch(error => console.log(error));

const roomsAPI = fetch('http://localhost:3001/api/v1/rooms').then(response => errorCheck(response)).catch(error => console.log(error));

const bookingsAPI = fetch('http://localhost:3001/api/v1/bookings').then(response => errorCheck(response)).catch(error => console.log(error));

const updateBookingsAPI = (userId, pickedDate, pickedRoomNumber) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userID: userId, date: pickedDate, roomNumber: pickedRoomNumber })
  }).then(response => errorCheck(response)).catch(error => console.log(error));
}

const errorCheck = (response) => {
  if (!response.ok) {
    throw new Error('An error has occurred.');
  } else {
    return response.json();
  }
}

export {
  customersAPI,
  roomsAPI,
  bookingsAPI,
  updateBookingsAPI
};