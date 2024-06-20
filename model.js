const mongoose = require("mongoose");

mongoose.connect(process.env.DBPASSWORD);

const pizza_schema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: false,
    },
    top_1: {
      type: String,
      required: false,
    },
    top_2: {
      type: Number,
      required: false,
    },
    top_3: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const pizza = mongoose.model("Pizza", pizza_schema);

module.exports = {
  pizza: pizza,
};
