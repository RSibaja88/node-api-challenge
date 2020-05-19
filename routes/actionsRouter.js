const express = require('express');
const router = express.Router();
const dbA = require('../data/helpers/actionModel.js');


//action endpoints
router.get("/", (req, res) => {
    dbA.get()
    .then(act => {
        res.status(200).json(act);
    })
    .catch(err => {
        res.status(500).json({error: "Error has occured retreiving this action"}, err);
    });
});

router.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const action = await dbA.get(id);
        action ? res.status(201).send(action) : res.status(404).send("The action with the specified ID does not exist.")
    } catch {
        res.status(500).send( "The action information could not be retrieved.")
    }
})

router.put('/:id', async (req, res) => {
    try {
        const action = await dbA.update(req.params.id, req.body)
        action === 1 ? res.status(201).json(action) : res.status(404).json("The action with the specified ID does not exist.")
    } catch {
        res.status(500).json("The action information could not be modified.")
    }
})

router.delete("/:id", (req, res) => {
    dbA.remove(req.params.id)
    .then(resp => {
        res.status(200).json({message: 'project deleted', resp})
    })
    .catch(err => {
        res.status(500).json({message: 'something went wrong.', err})
    })
})


module.exports = router;
