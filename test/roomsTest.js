import chai from 'chai';
import Rooms from '../src/classes/rooms.js';
import sampleRoomData from '../src/testData/roomsDataSample';
const expect = chai.expect;

describe('Rooms', function() {
  let room;
  beforeEach(() => {
    room = new Rooms(sampleRoomData[0]);
  });

  it('should be an instance of Rooms', () => {
    expect(room).to.be.an.instanceof(Rooms)
  });

  it('should be a function', () => {
    expect(Rooms).to.be.a('function');
  });

  it('room number should be a number', () => {
    expect(room.number).to.be.a('number');
  });

  it('room type should be a string', () => {
    expect(room.roomType).to.be.a('string');
  });

  it('bidet should be a boolean', () => {
    expect(room.bidet).to.be.a('boolean');
    expect(room.bidet).to.equal(true);
  });

  it('bed size should be a string', () => {
    expect(room.bedSize).to.be.a('string');
  });

  it('numBeds should be a number', () => {
    expect(room.numBeds).to.be.a('number');
  });

  it('costPerNight should be a number', () => {
    expect(room.costPerNight).to.be.a('number');
  });

});