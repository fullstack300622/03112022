const { knex } = require('../db/db')

class CustomerDAO {
    getAllCustomers = async () => {
        const data = await knex('customers').select("*");
        return data;
    }

    getCustomerById = async (id) => {
        const data = await knex('customers').select("*").where('Id', "=", id);
        return data;
    }

    addCustomer = async (customer) => {
        const data = await knex('customers').insert(customer);
        return data;
    }

    updateCustomer = async (customer, id) => {
        const data = await knex('customers').update(customer).where('id', "=", id);
        return data
    }

    removeCustomer = async (id) => {
        const data = knex('customers').delete().where('id', "=", id);
        return data
    }



}

module.exports = new CustomerDAO();