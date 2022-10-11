const Model = require('./model');
const express = require('express');
const router = express.Router();

router.post('/post', async (request, response) => {
    const data = new Model({
        id: request.body.id,
        name: request.body.name,
        completed: request.body.completed
    })
    try {
        const dataToSave = await data.save();
        response.status(200).json(dataToSave);
    } catch (error) {
        response.statusMessage(400).json({
            message: error.message
        });
    }
    // response.send('Post API');  <<  causing "Error can't set headers"
})

router.get('/getAll', async (request, response) => {
    try {
        const data = await Model.find();
        response.status(200).json(data);
    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
})

router.get('/getOne/:id', async (request, response) => {
    try {
        // const data = await Model.findById(request.params.id);
        const data = await Model.findOne({ id: request.params.id })
        response.status(200).json(data);
    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
})

// router.patch('/update/:id', async (request, response) => {
router.post('/update', async (request, response) => {
    try {
        const body = request.body;
        const options = { new: false };
        const result = await Model.findOneAndUpdate({ id: body.id }, { name: body.name, completed: body.completed }, options)
        response.status(201).json(result);
    } catch (error) {
        response.status(400).json({
            message: error.message
        });
    }
})

// router.delete('/delete/:id', async (request, response) => {
router.post('/delete', async (request, response) => {
    try {
        // const data = await Model.findOne({ id: request.params.id })
        const body = request.body
        const data = await Model.findOneAndDelete(body)
        response.status(201).json(`Document with ${data.name} has been deleted.`);
    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
})

module.exports = router;