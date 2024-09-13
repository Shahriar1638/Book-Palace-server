// const express = require('express');
const { ObjectId } = require('mongodb');
// const router = express.Router();

module.exports = (usersCollection, bookCollection, pendingCollection, forumPostCollection) => {
    const router = require('express').Router();

    router.get('/allposts', async (req, res) => {
        const posts = await forumPostCollection.find().toArray();
        res.send(posts);
    });

    router.patch('/commentpost/:id', async (req, res) => {
        const { id } = req.params;
        const commentData = req.body;
        await forumPostCollection.updateOne({ _id: new ObjectId(id) }, { $push: { comments: commentData } });
        res.status(200).json({ success: 'Comment added successfully' });
    });

    router.patch('/reportpost/:id', async (req, res) => {
        const { id } = req.params;
        const { reportData } = req.body;
        await forumPostCollection.updateOne({ _id: new ObjectId(id) }, { $push: { comments: reportData } });
        res.status(200).json({ success: 'report submitted successfully' });
    });

    router.post('/addpost', async (req, res) => {
        const post = req.body;
        await forumPostCollection.insertOne(post);
        res.status(200).json({ success: 'Post added successfully' });
    });

    return router;
};
