const app = require('./app');
const path = require('path');
const connectDatabase = require('./config/database');


connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`My Server listening to the port: ${process.env.PORT} in  ${process.env.NODE_ENV} `)
})


const ticketRouter= require("./routes/ticket");
app.use("/ticket",ticketRouter);
const paymentModel = require("./models/PaymentInput")
//recieving information from frontEnd
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
  




      // Delete a payment
// Delete a payment
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await paymentModel.findByIdAndRemove(id).exec();

    // If the deletion is successful, send a success response
    res.json({ success: true, message: 'Payment deleted successfully' });
  } catch (error) {
    console.error('Error deleting payment:', error);
    // If there's an error, send an error response
    res.status(500).json({ success: false, message: 'An error occurred while deleting payment' });
  }
});

  
  app.put('/update/:id', async (req, res) => {
    const id = req.params.id
  

    // Fields to be updated
    const updateFields = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        telephone: req.body.telephone,
        country: req.body.country,
        city: req.body.city,
        address: req.body.address,
        postalCode: req.body.postalCode,
        province: req.body.province,
        status:req.body.status

    };

    try {
        const updatedPayment = await paymentModel.findByIdAndUpdate(id, updateFields, { new: true });
        if (updatedPayment) {
            res.json(updatedPayment);
        } else {
            res.status(404).json({ error: 'Payment record not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating payment record' });
    }
});
  
  
  




process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled rejection error');
    server.close(()=>{
        process.exit(1);
    })
})

process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception error');
    server.close(()=>{
        process.exit(1);
    })
})



