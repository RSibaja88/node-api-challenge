const express = require('express');
const router = express.Router();
const Projects = require('../data/helpers/projectModel.js');
const Actions = require('../data/helpers/actionModel.js');
const middle = require("../middle");
const valProID = middle.valProId;
const valPro = middle.valPro;
const valActID = middle.valActId;
const valAct = middle.valAct;



//projects endpoints
router.get("/", (req, res) => {
    Projects.get()
    .then(pro => {
        res.status(200).json(pro);
    })
    .catch(err => {
        res.status(500).json({error: "Error has occured retreiving this project"}, err);
    });
});

router.get("/id", valProID, (res,req) => {
    const { id } = req.params
    Projects.get(id)
    .then(pro => {
        res.status(200).json(pro);
    })
    .catch(err => {
        res.status(500).json({error: "Error has occured retreiving this project"}, err);
    })
});

router.put("/:id", valProID, valPro, (res, req) => {
    const { id } = req.params;
    Projects.update(id, req.body)
    .then(pro => {
        res.status(200).json({ success: "Your changes have successfully updated", info: req.body});
    })
    .catch(err => {
        res.status(500).json({errorMessage: "Error has occured updating this project"}, err);
    })
})

router.delete("/:id", valProID, (req, res) => {
    const { id } = req.params;
    Projects.get(id)
    .then(pro => {
      pro
        ? Projects.remove(id).then(deleted => {
            deleted
              ? res
                  .status(200)
                  .json({ success: `Project ${id} was deleted`, info: project })
              : null;
          })
          .catch(err => {
            res.status(500).json({errorMessage: "Error has occured updating this project"}, err);
        })
        : null;
    });
  }); 

  router.get("/:id", valProID, valActID, (res,req) => {
    const { id } = req.params
    Projects.getProjectActions(id)
    .then(data => {
        data ? res.status(200).json(data) : null
    })
    .catch(err => {
        res.status(500).json({error: "Error has occured retreiving this action"}, err);
    })
});

module.exports = router; 