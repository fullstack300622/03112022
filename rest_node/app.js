const express = require('express');
const app = express();
const { getAllCustomers, getCustomerById, addCustomer, updateCustomer, removeCustomer } = require('./dao/customerDAO');
const { Customer } = require('./model/Customer')

app.use(express.json())

//REST
// GET id should be passed in url, if no id return all data
// PUT id should be passed in url, if no id found add new entity, if values not pass, values should be overriten
// PATCH id should be passed in url, data in body, update specific columns
// POST add new, data in body should return id of created entity 
// DELETE id should be passed in url


app.get('/', (req, res) => {
    res.send('ok');
})

app.delete('/customer/:id', async (req, res) => {
    const id = req.params?.id;
    try {
        const data = await removeCustomer(id);        
        return res.json(data)
    } catch (error) {
        return res.json({ error: 'something went wrong' }).status(500)
    }
})

app.post('/customer', async (req, res) => {
    const { firstName, lastName, address, phoneNo, creditCardNo, userName, password } = req.body;
    const customerObject = new Customer(firstName, lastName, address, phoneNo, creditCardNo, userName, password);

    if (req.body) {
        try {
            const id = await addCustomer(customerObject);
            return res.json(id)
        } catch (error) {
            return res.json({ error })
        }
    } else {
        return res.json({ message: "No body was provided" }).status(400);
    }
})

app.patch('/customer/:id', async (req, res) => {
    const id = req.params?.id;
    const { firstName, lastName, address, phoneNo, creditCardNo, userName, password } = req.body;
    const customerObject = new Customer(firstName, lastName, address, phoneNo, creditCardNo, userName, password);
    if (id && req.body) {
        const data = await getCustomerById(id);
        if (data.length > 0) {
            const customer = data[0]; //current customer in database
            for (const key in customerObject) {
                const value = customerObject[key];
                if (value) {
                    customer[key] = value;
                }
            }
            try {
                await updateCustomer(customer, id);
                return res.json(customer.Id)
            } catch (error) {
                return res.json({ message: 'something went wrong', error }).status(500)
            }
        } else {
            return res.json({ message: 'there is no user with database' })
        }
    } else {
        return res.json({ message: 'body or id is missing' }).status(400)
    }

})


app.get('/customer', async (req, res) => {
    try {
        const customres = await getAllCustomers();
        return res.json(customres)
    } catch (error) {
        return res.json({ error: 'something went wrong' }).status(500)
    }
})


app.get('/customer/:id', async (req, res) => {
    const id = req.params?.id;
    try {
        const customres = await getCustomerById(id);
        if (customres.length > 0) {
            return res.json(customres[0])
        }
        return res.json({ message: `there is no customer with id ${id}` })
    } catch (error) {
        return res.json({ error: 'something went wrong' }).status(500)
    }
})


app.put('/customer/:id', async (req, res) => {
    const id = req.params?.id;
    const { firstName, lastName, address, phoneNo, creditCardNo, userName, password } = req.body;
    const customerObject = new Customer(firstName, lastName, address, phoneNo, creditCardNo, userName, password);
    if (id && req.body) {
        const customres = await getCustomerById(id);
        try {
            if (customres.length > 0) {
                const data = await updateCustomer(customerObject, id);
                return res.json(data);
            } else {
                const data = await addCustomer(customerObject);
                return res.json(data);
            }
        } catch (error) {
            return res.json({ message: "Something went wrong ", error }).status(500)
        }

    } else {
        return res.json({ message: 'body or id is missing' }).status(400)
    }
})

app.listen(3000, () => {
    console.log('app is listening on port 3000')
})