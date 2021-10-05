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

exports.getProductById = (req, res) => {
  const db = connectDB()
  const { productId } = req.params
  db.collection('clothes').doc(productId).get()
  .then(doc => {
    let item = doc.data()
    item.id = doc.id
    res.send(item)
  })
  .catch(err => res.status(500).send(err))
}

// createProduct
exports.createProduct = (req, res) => {
  // check that all required fields are present
  if(!req.body.sku || !req.body.type || !req.body.price) {
    res.status(401).send({ message: 'Invalid request' })
    return 
  }
  // construct new clothing from the body
  let newItem = { 
    sku: req.body.sku,
    type: req.body.type,
    price: Number(req.body.price.toFixed(2)),
    graphic: (req.body.graphic) ? true : false
  }
  if(req.body.sizes) newItem.sizes = req.body.sizes
  if(req.body.brand) newItem.brand = req.body.brand
  if(req.body.color) newItem.color = req.body.color
  if(req.body.style) newItem.style = req.body.style
  
  const db = connectDB()
  db.collection('clothes').add(newItem)
  .then(docRef => res.status(201).send({ id: docRef.id }))
  .catch(err => res.status(500).send(err))
}

// updateProduct
exports.updateProduct = (req, res) => {
  const { productId } = req.params
  let newUpdates = {}
  if(req.body.sizes) newUpdates.sizes = req.body.sizes
  if(req.body.brand) newUpdates.brand = req.body.brand
  if(req.body.color) newUpdates.color = req.body.color
  if(req.body.style) newUpdates.style = req.body.style
  if(req.body.sku) newUpdates.sku = req.body.sku
  if(req.body.type) newUpdates.type = req.body.type
  if(req.body.price) newUpdates.price = Number(req.body.price.toFixed(2))
  if(req.body.graphic.toString()) newUpdates.graphic = req.body.graphic
  
  const db = connectDB()
  db.collection('clothes').doc(productId).update(newUpdates)
    .then(() => res.status(202).send({message: "Updated!"}))
    .catch(err => res.status(500).send(err))
}

// deleteProduct
exports.deleteProduct = (req, res) => {
  const { productId } = req.params
  const db = connectDB()
  db.collection('clothes').doc(productId).delete()
    .then(() => res.status(202).send({ message: 'Deleted!'}))
    .catch(err => res.status(500).send(err))
}