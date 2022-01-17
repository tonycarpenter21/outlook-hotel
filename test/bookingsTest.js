import chai from 'chai';
import Bookings from '../src/classes/bookings.js';
import sampleBookingData from '../src/testData/bookingsDataSample';
const expect = chai.expect;

describe('Bookings', function() {
  let booking;
  beforeEach(() => {
    booking = new Bookings(sampleBookingData[0]);
  });

  it('should be an instance of bookings', () => {
    expect(booking).to.be.an.instanceof(Bookings)
  });

  it('should be a function', () => {
    expect(Bookings).to.be.a('function');
  });

  it('booking id should be a string', () => {
    expect(booking.id).to.be.a('string');
  });

  it('userID should be a number', () => {
    expect(booking.userID).to.be.a('number');
  });

  it('userID should greater than 0', () => {
    expect(booking.userID).to.be.greaterThan(0);
  });

  it('date should be a string', () => {
    expect(booking.date).to.be.a('string');
  });

  it('roomNumber should be a number', () => {
    expect(booking.roomNumber).to.be.a('number');
  });

  it('roomServiceCharges should be a array', () => {
    expect(booking.roomServiceCharges).to.be.a('array');
  });

  it('roomServiceCharges should be empty', () => {
    expect(booking.roomServiceCharges.length).to.equal(0);
  });

});