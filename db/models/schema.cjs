const mongoose = require('mongoose');
const schema = mongoose.Schema;

const weatherSchema = schema(
  {
    city: {
      type: String,
    },
  },
  { timestamps: true }
);

const weather = mongoose.model("search", weatherSchema);

module.exports = weather; 