const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Server = require('../../models/Server');
// const validateServerCreation = require("../../validation/server");

router.get('/servers', (req, res) => res.json({ msg: "this is the servers route" }));

router.post('/', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateServerCreation(req.body);

    // if	(!isValid) {
    //   return res.status(400).json(errors);
    // }

    const newServer = new Server({
      name: req.body.name,
      owner: req.user.id,
      users: req.user.id
    });
    
    newServer.save().then(server => res.json(server));
});


router.get('/', passport.authenticate('jwt', { session: false }),
(req, res) => {
  // const { errors, isValid } = validateServerCreation(req.body);
  
  // if (!isValid) {
    //   return res.status(400).json(errors);
    // }
    
    Server.find({ users: req.user.id })
    .then(servers => res.json(servers));
});

router.get('/:server_id', (req, res) => {
  console.log("this is THE SERVER ID")
  console.log(req.params.server_id);
  Server.findById(req.params.server_id)
    .then(server => res.json(server))
    .catch(err => res.status(404).json({ msg: "no server found" }));
});

// router.patch('/:server_id', (req, res) => {
//   Server.find({ id: req.params.server_id })
// })

router.delete('/:server_id', (req, res) => {
  Server.remove({ _id: req.params.server_id })
    .then(() => res.json({ msg: "deleted server" }));
});

module.exports = router;
