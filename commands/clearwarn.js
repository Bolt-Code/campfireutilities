const Discord = require('discord.js')
const mongo = require('../mongo')
const punishmentsSchema = require('../schemas/punishments-schema')
const staffpermsSchema = require('../schemas/staffperms-schema')

exports.run = async(client, message, args) => {
  const hasperms = await staffpermsSchema.findOne({
    permissionName: "clearwarn"
  })
  .catch(e => false)

  const {enabledIds} = hasperms

  if(!enabledIds.includes(message.author.id)) return message.react('🔥');

  if(!args[0]) return message.channel.send('Please provide a user ID.')
  if(!args[1]) return message.channel.send('Please provide a warning ID.')

  if(args[0] === message.author.id) return message.channel.send('Abuse much')

  var user = message.mentions.users.first();

  if(args[0] = user) args[0] = user.id

  const warning = await punishmentsSchema.findOne({
    userId: args[0],
    code: args[1]
  })
  .catch(e => false)

  if(!warning) return message.channel.send('No punishment found for that user.')

  await punishmentsSchema.deleteOne({
    userId: args[0],
    code: args[1]
  })

  message.channel.send(`Successfully deleted warning with ID \`${args[1]}\` from user with ID \`${args[0]}\``)
} 