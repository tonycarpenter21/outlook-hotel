import chai from 'chai';
import Customers from '../src/classes/customers.js';
import Bookings from '../src/classes/Bookings.js';
import Rooms from '../src/classes/Rooms.js';
import sampleCustomerData from '../src/testData/customersDataSample';
import sampleBookingData from '../src/testData/bookingsDataSample';
import sampleRoomData from '../src/testData/roomsDataSample';
const expect = chai.expect;

describe('Customers', function() {
  let customer;
  let rooms = sampleRoomData.map(room => new Rooms(room));
  let bookings = sampleBookingData.map(booking => new Bookings(booking));
  beforeEach(() => {
    customer = new Customers(sampleCustomerData[0]);
  });

  it('should be an instance of Customers', () => {
    expect(customer).to.be.an.instanceof(Customers)
  });

  it('should be a function', () => {
    expect(Customers).to.be.a('function');
  });

  it('customer id should be a number', () => {
    expect(customer.id).to.be.a('number');
  });

  it('customer name should be a string', () => {
    expect(customer.name).to.be.a('string');
  });

  it('Calculate total spent by user method', () => {
    let result = bookings.filter(booking => booking.userID === customer.id);
    expect(customer.totalCost(result, rooms)).to.equal(172.09);
  });

});