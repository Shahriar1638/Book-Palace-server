const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt'); 
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 3000;




app.use(cors());
app.use(express.json());



// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uwwtyq1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri_24141181 = `${process.env.DB_URL}`;  

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client_one = new MongoClient(uri_24141181, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    

    const usersCollection = client_one.db("BookpalaceDB").collection("userInfos");

    const userRoutes = require('./Routes/PersonOne')(usersCollection);
    
    app.use('/24141181', userRoutes);

    // app.post('/adduser', async (req, res) => {
    //   const userInfo = req.body; 
    //   const { email } = userInfo;
    //   try {
    //       const existingUser = await usersCollection.findOne({ email });
    //       if (existingUser) {
    //           return res.status(400).json({ error: 'User already exists' });
    //       }
    //       await usersCollection.insertOne(  userInfo );
    //       res.status(200).json({ success: 'User added successfully' });
    //   } catch (err) {
    //       console.error(err);
    //       res.status(500).json({ error: 'Server error' });
    //   }
    // });

    

  
  // Send a ping to confirm a successful connection
  await client_one.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Server is running')
})

app.listen(port, () => {
    console.log(`Current active port: ${port}`);
})