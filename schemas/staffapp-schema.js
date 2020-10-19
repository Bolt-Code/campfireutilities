const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const staffappSchema = mongoose.Schema({
  userId: reqString,
  userCode: reqString,
  sentConfMsg: {type: Boolean, required: true,},
  status: reqString,
})

module.exports = mongoose.model('staff-application', staffappSchema)