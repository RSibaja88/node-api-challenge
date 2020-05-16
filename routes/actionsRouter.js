const express = require('express');
const router = express.Router();
const Actions = require('../data/helpers/actionModel.js');
const middle = require("../middle");
const valActID = middle.valActId;
const valAct = middle.valAct;


//action endpoints
router.get("/", (req, res) => {
    Actions.get()
    .then(act => {
        res.status(200).json(act);
    })
    .catch(err => {
        res.status(500).json({error: "Error has occured retreiving this action"}, err);
    });
});

router.get("/id", valActID, (res,req) => {
    const { id } = req.params
    Actions.get(id)
    .then(act => {
        res.status(200).json(act);
    })
    .catch(err => {
        res.status(500).json({error: "Error has occured retreiving this action"}, err);
    })
});

router.put("/:id", valActID, valAct, (res, req) => {
    const { id } = req.params;
    Actions.update(id, req.body)
    .then(act => {
        res.status(200).json({ success: "Your changes have successfully updated", info: req.body});
    })
    .catch(err => {
        res.status(500).json({errorMessage: "Error has occured updating this action"}, err);
    })
})

router.delete("/:id", valActID, (req, res) => {
    const { id } = req.params;
    Actions.get(id)
    .then(act => {
      act
        ? Actions.remove(id).then(deleted => {
            deleted
              ? res
                  .status(200)
                  .json({ success: `Project ${id} was deleted`, info: action })
              : null;
          })
          .catch(err => {
            res.status(500).json({errorMessage: "Error has occured updating this action"}, err);
        })
        : null;
    });
  }); 

module.exports = router;
