const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const fs = require('fs')
const router = express.Router();

const paymentModel = require("../models/PaymentInput")
//recieving information from frontEnd
app.use(express.json());
app.use(cors());





//insert
app.post("/insert", async (req, res) => {

  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const telephone = req.body.telephone
  const country = req.body.country
  const city = req.body.city
  const address = req.body.address
  const postalCode = req.body.postalCode
  const province = req.body.province
  const transactionDate = new Date();

  // Get the date in yyyy-MM-dd format
  const year = transactionDate.getFullYear();
  const month = String(transactionDate.getMonth() + 1).padStart(2, '0');
  const day = String(transactionDate.getDate()).padStart(2, '0');

  // Get the time in HH.mm format
  const hours = String(transactionDate.getHours()).padStart(2, '0');
  const minutes = String(transactionDate.getMinutes()).padStart(2, '0');

  // Combine date and time in the desired format
  const formattedDateAndTime = `${year}-${month}-${day} ${hours}.${minutes}`;
  // asign date and time
  //assign to database field
  const pays = new paymentModel({

    FirstName: firstName,
    LastName: lastName,
    Mail: email,
    Telephone: telephone,
    Country: country,
    City: city,
    Address: address,
    PostalCode: postalCode,
    Province: province,
    Time: formattedDateAndTime

  })
  try {
    await pays.save();
    res.send("inserted data")
  }
  catch (err) {
    console.log(err)

  }
})


//read 
app.get("/read", async (req, res) => {
  try {
    const result = await paymentModel.find({});
    res.json(result);
  } catch (err) {
    console.error(err);
    //res.status(500).json({ error: "Error reading data" });
  }
});

//delete 
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id
  await paymentModel.findByIdAndRemove(id).exec();
  res.send('deleted')
});

module.exports = router;


