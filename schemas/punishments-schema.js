const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const punishmentsSchema = mongoose.Schema({
  userId: reqString,
  authorId: reqString,
  code: reqString,
  type: reqString,
  date: reqString,
  reason: reqString,
})

module.exports = mongoose.model('punishment', punishmentsSchema)