const { CustomerSchema } = require('./schema');

const addCustomer = (custid, name, address, city, number) => new Promise((resolve, reject) => {
  CustomerSchema.create([{
    CustomerId: custid, Name: name, Address: address, City: city, Contact: number,
  }])
    .then((msg) => {
      resolve(msg);
    })
    .catch((err) => {
      reject(err);
    });
});

const getCustomerIds = async () => {
  try {
    const customerids = await CustomerSchema.distinct('CustomerId');
    return customerids;
  } catch (err) {
    throw new Error('It is not select Id for DropDown List', err);
  }
};

const filterCustomer = async (custid) => {
  try {
    const customerDetail = await CustomerSchema.findOne({ CustomerId: custid });
    return customerDetail;
  } catch (err) {
    throw new Error('customer filter failed', err);
  }
};

const updateCustomer = async (custid, name, address, PhnoneNumber, city) => {
  try {
    const queryResult = await CustomerSchema.updateOne({ CustomerId: custid }, {
      $set: {
        Name: name, Address: address, Contact: PhnoneNumber, City: city,
      },
    });
    return queryResult;
  } catch (err) {
    throw new Error('Error');
  }
};

// getcustomerlocation
const getCustomerLocation = async () => {
  try {
    const cities = await CustomerSchema.distinct('City');
    return cities;
  } catch (err) {
    throw new Error('failed');
  }
};

// Customer Contact

const getCustomerContact = async (City) => {
  try {
    const details = await CustomerSchema.find({ City }, { Name: 1, Contact: 1, _id: 0 });
    return details;
  } catch (err) {
    throw new Error('Error');
  }
};

const countCustomerLocation = async (City) => {
  try {
    const count = await CustomerSchema.count({ City });
    return count;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  addCustomer,
  getCustomerLocation,
  getCustomerIds,
  filterCustomer,
  updateCustomer,
  getCustomerContact,
  countCustomerLocation,
};
