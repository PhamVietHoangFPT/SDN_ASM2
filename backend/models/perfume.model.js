const mongoose = require('mongoose')
const commentSchema = require('./comment.model')

const perfumeSchema = new mongoose.Schema(
  {
    perfumeName: { type: String, required: true },
    uri: { type: String, required: true }, // URL hình ảnh
    price: { type: Number, required: true },
    concentration: { type: String, required: true }, // Extrait, EDP, EDT, ...
    description: { type: String, required: true },
    ingredients: { type: String, required: true },
    volume: { type: Number, required: true },
    targetAudience: { type: String, required: true }, // male, female, unisex
    comment: [commentSchema],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brands',
      required: true,
    },
  },
  { timestamps: true }
)

const Perfume = mongoose.model('Perfumes', perfumeSchema)
module.exports = Perfume