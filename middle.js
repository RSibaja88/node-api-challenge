const Projects = require('./data/helpers/projectModel.js');
const Actions = require('./data/helpers/actionModel.js');

const logger = (res, req, next) => {
    const method = req.method;
    const endpoint = req.originalUrl;
    const date = new Date();
        console.log(`You made a ${method} request to ${endpoint} on ${date}`);
    next();
};

const valActId = (req, res, next) => {
    const { id } = req.params;
    Actions.get(id)
      .then(action => {
        action ? req.action : res.status(404).json({ message: 'That Action Does Not Exist' })
      })
      .catch(err => {
        res.status(500).json({ error: 'Error has occured', err })
      })
      next();
  }

  const valAct = (req, res, next) => {
    const { description, notes } = req.body;
    Object.entries(req.body).length === 0
      ? res.status(404).json({ message: 'No Action Data' }) 
      : !description || !notes 
      ? res.status(400).json({ message: 'Input incomplete. Please add the description and notes' }) 
    : next();
  }

  const valProId = (req, res, next) => {
    const { id } = req.params;
    Projects.get(id)
      .then(project => {
        project
          ? req.project
          : res.status(404).json({ message: "Cannot find reqested Project" });
      })
      .catch(err => {
        res.status(500).json({ error: "ERROR", err });
      });
    next();
  };

  const valPro = (req, res, next) => {
    const { name, description } = req.body;
    Object.entries(req.body).length === 0 
    ? res.status(404).json({ message: 'No Project found' })
    : !name || !description 
    ? res.status(400).json({ error: 'Missing required input, add a name and description' })
  : next();
}

module.exports = {
    logger, 
    valAct,
    valActId,
    valProId,
    valPro
}



