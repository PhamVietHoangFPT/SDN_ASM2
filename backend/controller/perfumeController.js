const Perfume = require('../models/perfume.model')
const Brand = require('../models/brand.model')
const mongoose = require('mongoose')
const { json } = require('express')

const getPerfume = async (req, res) => {
  const searchPerfumeName = req.query.searchPerfumeName || ""
  const searchBrand = req.query.searchBrand || ""
  const conditions = [];

  if (searchPerfumeName) {
    conditions.push({ perfumeName: { $regex: searchPerfumeName, $options: "i" } });
  }

  if (searchBrand && mongoose.isValidObjectId(searchBrand)) {
    conditions.push({ brand: new mongoose.Types.ObjectId(String(searchBrand)) });
  }

  Perfume.find(conditions.length > 0 ? { $and: conditions } : {}).populate("brand")
    .then(perfumes => {
      res.status(200).json({ perfumes })
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    });
}

const addPerfume = async (req, res) => {
  const data = {
    perfumeName: req.body.perfumeName,
    uri: req.body.uri,
    price: Number(req.body.price),
    concentration: req.body.concentration,
    description: req.body.description,
    ingredients: req.body.ingredients,
    volume: Number(req.body.volume),
    targetAudience: req.body.targetAudience,
    brand: req.body.brand
  }
  try {
    let perfume = await Perfume.findOne({ perfumeName: data.perfumeName })
    if (perfume) {
      return res.status(400).json({ message: "Perfume already exists" })
    }
    const newPerfume = new Perfume(data)
    await newPerfume.save()
    res.status(201).json({ message: "Perfume created successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getPerfumeDetail = async (req, res) => {
  const perfume = await Perfume.findById(req.params.id).populate('comment.author', 'name').populate("brand")
  if (!perfume) {
    return res.status(404).json({ message: "Perfume not found" })
  }
  res.status(200).json({ perfume })
}

const updatePerfume = async (req, res) => {
  const perfumeId = req.params.id;

  const updateData = {
    perfumeName: req.body.perfumeName,
    uri: req.body.uri,
    price: Number(req.body.price),
    volume: Number(req.body.volume),
    concentration: req.body.concentration,
    description: req.body.description,
    ingredients: req.body.ingredients,
    targetAudience: req.body.targetAudience,
    brand: req.body.brand,
  };
  try {
    const updatedPerfume = await Perfume.findByIdAndUpdate(perfumeId, updateData, { new: true })

    if (!updatedPerfume) {
      return res.status(404).json({ success: false, message: "Perfume not found" })
    }

    res.json({ success: true, message: "Perfume updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
};

const addComment = async (req, res) => {
  const memberId = req.body.authorId

  if (!memberId) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  const data = {
    content: req.body.content,
    rating: Number(req.body.rating),
    author: memberId
  }
  try {
    const perfume = await Perfume.findById(req.params.id).populate("brand")
    if (!perfume) {
      return res.status(404).json({ message: "Perfume not found" })
    }
    const comment = perfume.comment
    if (comment.some(c => c.author.toString() === memberId)) {
      return res.status(400).json({ message: "You have already commented" })
    }
    perfume.comment.push(data)
    await perfume.save()
    res.status(201).json({ message: "Comment added successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteComment = async (req, res) => {
  const memberId = req.body.authorId
  const commentId = req.body.commentId
  if (!memberId) {
    return res.status(401).send("Unauthorized")
  }
  try {
    const perfume = await Perfume.findById(req.params.id)
    if (!perfume) {
      return res.status(404).json({ message: "Perfume not found" })
    }
    const comment = perfume.comment.id(commentId)
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" })
    }
    if (comment.author.toString() !== memberId) {
      return res.status(401).json({ message: "Unauthorized" })
    }
    await Perfume.updateOne(
      { _id: req.params.id },
      { $pull: { comment: { _id: commentId } } }
    )
    res.status(200).json({ message: "Comment deleted successfully" })
  } catch (err) {
    res.status(500).send(err)
  }
}

const deletePerfume = async (req, res) => {
  const perfumeId = req.params.id;
  try {
    const perfume = await Perfume.findByIdAndDelete(perfumeId)
    if (!perfume) {
      return res.status(404).json({ success: false, message: "Perfume not found" })
    }
    res.status(200).json({ success: true, message: "Perfume deleted successfully" })
  }
  catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = {
  getPerfume,
  addPerfume,
  getPerfumeDetail,
  addComment,
  deleteComment,
  deletePerfume,
  updatePerfume,
}