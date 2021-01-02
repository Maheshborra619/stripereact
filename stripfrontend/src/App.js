import React,{ useState } from 'react';
import './App.css';
import StripeCheckOut from "react-stripe-checkout"
// import { response } from 'express';

function App() {
  const [product,setProduct] = useState({
    name:"React form FB",
    price:10,
    productBy:"facebook"
  });


  const makePayment = (token) =>{
    const body = {
      token,
      product
    }
    const headers = {
      "Content-type":"application/json"
    }

    return fetch(`http://localhost:8000/stripepayment`,{
      method:"POST",
      headers,
      body: JSON.stringify(body)
    }).then(response =>{
      console.log("RESPONSE",response);
      const {status} = response;
      console.log("STATUS",status);
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="App">
      <header className="App-header">
        
      
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckOut 
         stripeKey={process.env.REACT_APP_KEY}
         token={makePayment}
         name="Created By Mahesh"
         amount={product.price *100}
        >

       <button className="btn-large pink">Click here to buy! {product.price}</button>
          </StripeCheckOut>
      </header>
    </div>
  );
}

export default App;
