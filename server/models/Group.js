const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: String,
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  subject: String,
  description: String,
  private: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Group', GroupSchema);
