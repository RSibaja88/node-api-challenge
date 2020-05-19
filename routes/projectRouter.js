const express = require('express');
const router = express.Router();
const dbP = require('../data/helpers/projectModel.js');




//project endpoints
router.get("/", (req, res) => {
    dbP.get()
    .then(pro => {
        res.status(200).json(pro);
    })
    .catch(err => {
        res.status(500).json({error: "Error has occured retreiving this project"}, err);
    });
});

router.post("/", (req, res) => {
    const {name, description} = req.body;
    if(!name || !description) {
        res.status(400).send("Please provide title and contents for project.")
    } else {
        dbP.insert(req.body)
        .then(project => {
            res.status(201).send(project);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("There was an error while saving your changes to db")
        })
    }
})

router.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const project = await dbP.get(id);
        project ? res.status(201).send(project) : res.status(404).send("The project with the specified ID does not exist.")
    } catch {
        res.status(500).send( "The project information could not be retrieved.")
    }
})

router.put('/:id', async (req, res) => {
    try {
        const project = await dbP.update(req.params.id, req.body)
        project === 1 ? res.status(201).json(project) : res.status(404).json("The project with the specified ID does not exist.")
    } catch {
        res.status(500).json("The project information could not be modified.")
    }
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    dbP.remove(id)
    .then(project => {
        if (project) {
            res.status(200).send("Project has been deleted.")
        } else {
            res
                .status(404)
                .send("The project with the specified ID does not exist.")
        }
    })
    .catch(error => {
        console.log(error);
        res
            .status(500)
            .send("The project couldnt be recovered.")
    })
})

router.get('/:id/actions',(req,res) => {
    dbP.getProjectActions(req.params.id)
        .then(resp => {
            if(resp){
                res.status(200).json({resp})
            } else {
                res.status(404).json({message: 'no actions found'})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'something went wrong.', err})
        })
})

module.exports = router; 