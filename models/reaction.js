const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const dateFormat = require("../utils/dateFormat");

const reactionSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId },
  reactionBody: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

reactionSchema.pre("save", function () {
  if (!this._id) {
    this._id = new mongoose.Types.ObjectId();
  }
});

reactionSchema.set("toJSON", { getters: true, virtuals: false, versionKey: false });

const Reaction = mongoose.model("Reaction", reactionSchema);

module.exports = Reaction;
