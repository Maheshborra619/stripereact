const cors = require("cors");
const express = require("express");
//todo add a stripe key
const stripe = require("stripe")("pk_test_51Bw2izFA1lEY7doH4dcqgIVxzQwQJkxkX8vurcCGqcsjIaTfAT8LV4CaK77BDXNs6Jnej5Q8g4ePe4yCm2QT2diq00PWjHzTdd")
const uuid = require("uuid");


const app = express();


//middleware
app.use(express.json())
app.use(cors())


//routers
app.get("/",(req,res) =>{
   res.send("Hello mahesh")
})

app.post('/stripepayment',(req,res)=>{

  const {product, token} = req.body;
  console.log("PRODUCT",product);
  console.log("PRice",product.price);

  const idempotencyKey = uuid();

  return stripe.customers.create({
      email:token.email,
      source:token.id
  }).then(customer =>{
      stripe.charges.create({
          amount:product.price *100,
          currency:'usd',
          customer:customer.id,
          receipt_email:token.email,
          description:`purchase of product.name`,
          shipping:{
              name:token.name,
              address:{
                  country:token.card.address_country
              }
          }
      },{idempotencyKey})
  })
  .then(result => res.status(200).json(result))
  .catch(err => console.log(err));
})


//listen
app.listen(8000,()=>{
    console.log("LISTENING AT PORT 8000");
})

