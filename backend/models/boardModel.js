const mongoose = require('mongoose');

const boardSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    cells: {
      type: [String],
      required: [true, 'Please add cells content'],
    },
    tags: { type: [String] },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    activeCells: [],
    private: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Board', boardSchema);
