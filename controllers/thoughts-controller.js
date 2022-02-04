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
      Thoughts.findOne({ _id: params.thoughtsId })
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
            console.log(_id)
            return User.findOneAndUpdate(
              { _id: body.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then(dbUserData => {
              if (!dbUserData) {
                console.log (dbUserData)
                return res.status(404).json({ message: 'No user found with this id!' });
              
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },

      addReaction({ params, body }, res) {
        Thoughts.findByIdAndUpdate(
              { _id: params.thoughtsId },
              { $push: { reactions: body } },
              { new: true, runValidators: true }
            )
          .then(dbThoughtsData => {
              if (!dbThoughtsData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbThoughtsData);
          })
          .catch(err => res.json(err));
      },
      
      removeReaction({ params }, res) {
        Thoughts.findByIdAndUpdate(
          { _id: params.thoughtsId },
          { $pull: { reactions: { reactionId: params.reactionId } } },
          { new: true }
        )
        .then((dbThoughtsData) => res.json(dbThoughtsData))
        .catch((err) => res.json(err));
      },
   
    updateThoughts({ params, body }, res) {
      Thoughts.findOneAndUpdate(
        { _id: params.id }, body,
        {
        new: true,
        runValidators: true
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
      Thoughts.findOneAndDelete({ _id: params.userId })
        .then((dbThoughtsData) => res.json(dbThoughtsData))
        .catch((err) => res.json(err));
    },
  };

module.exports = thoughtsController;
