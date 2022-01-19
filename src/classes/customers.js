class Customers {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
  }
  totalCost(result, rooms) {
    let cost = result.reduce((acc, item) =>{
      let matchingRoom = rooms.find(room => item.roomNumber === room.number);
      acc += matchingRoom.costPerNight;
      return acc;
    }, 0)
    return cost;
  }
}

export default Customers;