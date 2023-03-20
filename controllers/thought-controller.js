const { thought, user } = require("../models");

async function getThoughts(req, res) {
  try {
    const dbThoughtData = await thought.find().sort({ createdAt: -1 });
    res.json(dbThoughtData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get thoughts" });
  }
}

async function getSingleThought(req, res) {
  try {
    const dbThoughtData = await thought.findById(req.params.thoughtId);
    if (!dbThoughtData) {
      return res.status(404).json({ error: "No thought with this id" });
    }
    res.json(dbThoughtData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get thought" });
  }
}

async function createThought(req, res) {
  try {
    const dbThoughtData = await thought.create(req.body);
    const dbUserData = await user.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: dbThoughtData._id } },
      { new: true }
    );
    if (!dbUserData) {
      return res
        .status(404)
        .json({ error: "Thought created, no user with this id" });
    }
    res.json({ message: "Thought successfully created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create thought" });
  }
}

async function updateThought(req, res) {
  try {
    const dbThoughtData = await thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!dbThoughtData) {
      return res.status(404).json({ error: "No thought with this id" });
    }
    res.json(dbThoughtData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update thought" });
  }
}

async function deleteThought(req, res) {
  try {
    const dbThoughtData = await thought.findByIdAndDelete(req.params.thoughtId);
    if (!dbThoughtData) {
      return res.status(404).json({ error: "No thought with this id" });
    }
    const dbUserData = await user.findByIdAndUpdate(
      dbThoughtData.userId,
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );
    if (!dbUserData) {
      return res.status(404).json({ error: "No user associated with this thought" });
    }
    res.json({ message: "Thought successfully deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete thought" });
  }
}

async function addReaction(req, res) {
  try {
    const dbThoughtData = await thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    if (!dbThoughtData) {
      return res.status(404).json({ error: "No thought with this id" });
    }
    res.json(dbThoughtData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add reaction" });
  }
}

async function removeReaction(req, res) {
    try {
      const dbThoughtData = await thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!thoughtData) {
        return res
          .status(404)
          .json({ message: "No thought associated with this id" });
      }
  
      res.json(thoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
  

module.exports = thoughtController;
