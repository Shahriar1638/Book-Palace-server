// routes/userRoutes.js
const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

module.exports = function (usersCollection) {
    router.post('/adduser', async (req, res) => {
        const userInfo = req.body; 
        const { email } = userInfo;
        try {
            const existingUser = await usersCollection.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }
            await usersCollection.insertOne(  userInfo );
            res.status(200).json({ success: 'User added successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
      });

    router.get('/currentuser', async (req, res) => {
        const useremail = req.query.email;
        console.log("User Email: ", useremail);
        const user = await usersCollection.findOne({ email: useremail });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.send(user);
    });
    router.get('/allusers', async (req, res) => {
        const users = await usersCollection.find().toArray();
        res.send(users);
    });

    // Add the remaining user-related routes
    // ...

    return router;
};
