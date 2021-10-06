const { connectDB } = require('./db')

exports.createCustomer = (req, res) => {
   if(!req.body.fName || !req.body.lName || !req.body.email) {
     res.status(401).send({ message: 'Invalid Request'})
     return
   }
   let newCustomer = {
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    repeat: (req.body.repeat) ? true : false
   }
   if(req.body.fName) newCustomer.fName = req.body.fName
   if(req.body.lName) newCustomer.lName = req.body.lName
   if(req.body.email) newCustomer.email = req.body.email
   if(req.body.repeat) newCustomer.repeat = req.body.repeat

   const db = connectDB()
   db.collection('customers').add(newCustomer)
   .then(docRef => res.status(201).send({id: docRef.id}))
   .catch(err => res.status(500).send(err))
  }

  exports.getCustomerById = (req, res) => {
    const db = connectDB()
    const { customerId } = req.params
    db.collection('customers').doc(customerId).get()
    .then(doc => {
      let customer = doc.data()
      customer.id = doc.id
      return customer
    })
    .catch(err => res.status(500).send(err))
  }