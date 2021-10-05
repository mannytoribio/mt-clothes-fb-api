const { connectDB } = require('./db')

// getAllproducts
exports.getAllProducts = (req, res) => {
  const db = connectDB()
  db.collection('clothes').get()
  .then(collection => {
    const clothes = collection.docs.map(doc => {
      let item = doc.data()
      item.id = doc.id
      return item
    })
    res.send(clothes)
    // below is the same but with more returns needs to be documented when we do something like this and should be consistent
    // res.send({
    //   status: '200',
    //   results: clothes.length,
    //   success: true,
    //   message: 'Clothing collection returned',
    //   data: clothes
    // })
  })
  .catch(err => res.status(500).send(err))
}

// getProductByID
exports.getProductById = (req, res) => {
  // connect to database
  const db = connectDB()
  // get productId from req.params
  const { productId } = req.params
  // get document from collection
  db.collection('clothes').doc(productId).get()
  .then(doc => {
    let item = doc.data()
    item.id = doc.id
    res.send(item)
  })
  .catch(err => res.status(500).send(err))
  // return document
}

// createProduct


// updateProduct


// deleteProduct