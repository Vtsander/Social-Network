const { user, thought } = require("../models");

const userController = {
  getUsers: async (req, res) => {
    try {
      const UserData = await user.find({}, "-__v");
      res.json(UserData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  getSingleUser: async (req, res) => {
    try {
      const UserData = await user
        .findById(req.params.userId, "-__v")
        .populate("friends")
        .populate("thoughts");

      if (!UserData) {
        return res.status(404).json({ message: "No user found" });
      }

      res.json(UserData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  createUser: async (req, res) => {
    try {
      const UserData = await user.create(req.body);
      res.json(UserData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const UserData = await user.findByIdAndUpdate(
        req.params.userId,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!UserData) {
        return res.status(404).json({ message: "No user found" });
      }

      res.json(UserData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const UserData = await user.findByIdAndDelete(req.params.userId);

      if (!UserData) {
        return res.status(404).json({ message: "No user found" });
      }

      await thought.deleteMany({ _id: { $in: UserData.thoughts } });
      res.json({ message: "User and associated thoughts deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  addFriend: async (req, res) => {
    try {
      const UserData = await user.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!UserData) {
        return res.status(404).json({ message: "No user found" });
      }

      res.json(UserData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  removeFriend: async (req, res) => {
    try {
      const UserData = await user.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!UserData) {
        return res.status(404).json({ message: "No user found" });
      }

      res.json(UserData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = userController;
