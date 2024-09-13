// routes/userRoutes.js
const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

module.exports = function (usersCollection, bookCollection, pendingCollection,forumPostCollection) {
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

    router.get('/allbooks', async (req, res) => {
        const books = await bookCollection.find().toArray();
        res.send(books);
    });

    router.get('/allpendingbooks', async (req, res) => {
        const pending = await pendingCollection.find().toArray();
        res.send(pending);
    });



    router.post('/addbook', async (req, res) => {
        const book = req.body;
        await bookCollection.insertOne(book);
        res.status(200).json({ success: 'Book added successfully' });
    });
    router.delete('/deletependingbook/:id', async (req, res) => {
        const { id } = req.params;
        await pendingCollection.deleteOne({ _id: new ObjectId(id) });
        res.status(200).json({ success: 'Pending book deleted' });
    });


    router.patch('/updatependingbook/:id', async (req, res) => {
        const { id } = req.params;
        const updatedBook = req.body;
        await pendingCollection.updateOne({ _id: new ObjectId(id) }, { $set: { status: updatedBook.status } });
        res.status(200).json({ success: 'Book updated successfully' });
    });


    router.get('/allforumposts', async (req, res) => {
        const posts = await forumPostCollection.find().toArray();
        res.send(posts);
    });

    router.post('/addpendingbooks', async (req, res) => {
        const post = req.body;
        await pendingCollection.insertOne(post);
        res.status(200).json({ success: 'Post added successfully' });
    });
    // Add the remaining user-related routes
    // ...

    return router;
};
