const Member = require('../models/member.model')

const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find({}).select("-password");
    res.status(200).json(members);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
}

module.exports = { getAllMembers }