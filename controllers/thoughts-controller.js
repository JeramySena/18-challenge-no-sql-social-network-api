const { Thoughts, User } = require('../models');

const thoughtsController = {
    getAllThoughts(req, res) {
      Thoughts.find({})
        .then((dbThoughtsData) => res.json(dbThoughtsData))
        .catch((err) => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    getThoughtsById({ params }, res) {
      Thoughts.findOne({ _id: params.id })
        .then((dbThoughtsData) => {
         if (!dbThoughtsData) {
            res.status(404).json({ message: "No thoughts found with this id!" });
            return;
          }
          res.json(dbThoughtsData);
        })
        .catch((err) => res.json(err));
    },
  
    createThoughts({ params, body }, res) {
        Thoughts.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then(dbThoughtsData => {
              if (!dbThoughtsData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbThoughtsData);
          })
          .catch(err => res.json(err));
      },
   
    updateThoughts({ params, body }, res) {
      Thoughts.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
      })
        .then((dbThoughtsData) => {
          if (!dbThoughtsData) {
            res.status(404).json({ message: "No thoughts found with this id!" });
            return;
          }
          res.json(dbThoughtsData);
        })
        .catch((err) => res.status(400).json(err));
    },
  
    deleteThoughts({ params }, res) {
      Thoughts.findOneAndDelete({ _id: params.id })
        .then((dbThoughtsData) => res.json(dbThoughtsData))
        .catch((err) => res.json(err));
    },
  };

module.exports = thoughtsController;
