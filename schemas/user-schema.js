const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const userSchema = mongoose.Schema({
  userId: reqString,
  regCode: reqString,
  registered: {type: Boolean, required: true},
  groupNum: {type: Number, required: true, default: 0},
  sentConfMsg: {type: Boolean, required: true}
})

module.exports = mongoose.model('user', userSchema)