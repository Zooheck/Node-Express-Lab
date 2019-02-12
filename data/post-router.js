const express = require('express');

const Funcs = require('./db.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Funcs.find();
        res.status(200).json(posts)
    } catch(err) {
        console.log(err)
        res.status(500).json({
            error: "The posts information could not be retrieved."
        })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Funcs.findById(req.params.id);

        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
        })
        }
    }
    catch(err) {
        console.log(err)
        res.status(500).json({
            message: "The post with the specified ID does not exist."
        })
    }
});

router.post('/', async (req, res) => {
    try {
        const post = await Funcs.insert(req.body);
        if (!post) {
            return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        } else {
            res.status(201).json(post)
        }

    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            errorMessage: "Please provide title and contents for the post."
    })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const count = await Funcs.remove(req.params.id)
        if (count > 0) {
            res.status(200).json({ message: "This post has been deleted"})
        } else {
            res.status(404).json({ message: "Could not find post with this ID."})
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "The post with the specified ID does not exist."
        })
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.contents) {
            return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
        const post = await Funcs.update(req.params.id, req.body)

        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: 'This post could not be found.'})
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Error updating the post'
        })
    }
});
module.exports = router;