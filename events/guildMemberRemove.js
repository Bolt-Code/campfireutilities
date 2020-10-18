const Discord = require('discord.js')
const userSchema = require('../schemas/user-schema')
const mongo = require('../mongo.js')

module.exports = async(client, member) => {
  await userSchema.findOneAndDelete({
    userId: member.id,
  })
}