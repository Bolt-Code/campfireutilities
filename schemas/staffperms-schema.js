const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const staffpermsSchema = mongoose.Schema({
  permissionName: reqString,
  enabledIds: reqString,
  editIds: reqString,
})

module.exports = mongoose.model('staff-permission', staffpermsSchema)