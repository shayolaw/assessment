
const express = require('express');
const Feedback = require('./feedback');
const emailValidation = require('./emailValidation');
const router = express.Router();

router.get('/', async(req,res)=>{
    res.send("Hello bitches");
})
// Create a new feedback
router.post('/api/feedback', async (req, res) => {
  const { name, email, age, feedback,rating } = req.body;
  console.log(rating)
  if (!emailValidation(email)) {
    return res.status(400).send({ error: 'Invalid email address' });
  }

  try {
    const new_feedback = new Feedback({ name, email, age, feedback,rating } );
    await new_feedback.save();
    res.send(new_feedback);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get all feedbacks
router.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({});
    res.send(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Update a feedback
router.put('/api/feedback/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, age, feedback,rating } = req.body;

  try {
    const updated_feedback = await Feedback.findByIdAndUpdate(id, { name, email, age, feedback,rating } , { new: true });
    res.send(updated_feedback);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete a feedback
router.delete('/api/feedback/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted_feedback = await Feedback.findByIdAndDelete(id);
    res.send(deleted_feedback);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
