const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts
    } = require('../../controllers/thoughts-controller');

router
  .route('/')
  .get(getAllThoughts)
  .post(createThoughts);

router
  .route('/:thoughtsId')
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

module.exports = router;
