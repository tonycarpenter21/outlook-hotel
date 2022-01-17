import chai from 'chai';
import Customers from '../src/classes/customers.js';
import sampleCustomerData from '../src/testData/customersDataSample';
const expect = chai.expect;

describe('Customers', function() {
  let customer;
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

});