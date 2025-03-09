const Member = require('../models/member.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const editProfile = async (req, res) => {
  try {
    const data = {
      email: req.body.email,
      name: req.body.name,
      YOB: req.body.yob,
      gender: req.body.gender ? "true" : "false"
    };
    const updatedMember = await Member.findOneAndUpdate(
      { email: data.email },
      { $set: data },
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ success: false, error: "Member not found" });
    }
    const token = jwt.sign(
      {
        id: updatedMember._id,
        email: updatedMember.email,
        isAdmin: updatedMember.isAdmin,
        name: updatedMember.name,
        yob: updatedMember.YOB,
        gender: updatedMember.gender
      }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
    res.status(200).json({ success: true, message: "Profile updated successfully", token: token });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: err.message });
  }
};


const editPassword = async (req, res) => {
  const email = req.body.email
  console.log(req.body)
  try {
    const { oldPassword, newPassword } = req.body
    const member = await Member.findOne({ email: email })
    if (!member) {
      return res.status(404).json({ success: false, message: "Member not found" })
    }
    if (!bcrypt.compareSync(oldPassword, member.password)) {
      return res.status(400).json({ success: false, message: "Old password is incorrect" })
    }
    const updatedMember = await Member
      .findOneAndUpdate({ email: email }, { $set: { password: bcrypt.hashSync(newPassword, 10) } }, { new: true })
    if (!updatedMember) {
      return res.status(404).json({ success: false, message: "Member not found" })
    }
    const token = jwt.sign(
      {
        id: updatedMember._id,
        email: updatedMember.email,
        isAdmin: updatedMember.isAdmin,
        name: updatedMember.name,
        yob: updatedMember.YOB,
        gender: updatedMember.gender
      }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
    res.status(200).json({ success: true, message: "Password updated successfully", token: token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { editProfile, editPassword }