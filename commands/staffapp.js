const Discord = require('discord.js')
const mongo = require('../mongo')
const staffappSchema = require('../schemas/staffapp-schema')
const staffpermsSchema = require('../schemas/staffperms-schema')

exports.run = async(client, message, args) => {
  const viewperms = await staffpermsSchema.findOne({
    permissionName: "apps"
  })
  .catch(e => false)

  const {enabledIds} = viewperms

  if(!enabledIds.includes(message.author.id)) return message.react('🔥');

  if(args[0] === 'lookup') {
    if(args[1] === 'id') {
      let result = await staffappSchema.findOne({
        userId: args[2]
      })
      .catch(e => false)

      if(!result) return message.channel.send('No data found for that user ID.')

      const {userId, userCode, sentConfMsg, status, timezone, age, score} = result

      const x = new Discord.MessageEmbed()
      .addField('User ID', userId, true)
      .addField('User', `<@!${userId}>`, true)
      .addField('Code', userCode, false)
      .addField('Status', status, false)
      .addField('Timezone', timezone, true)
      .addField('Age', age, false)
      .addField('Score', score, true)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()
      .setColor('#FF1654');

      message.channel.send(x)
    }
    if(args[1] === 'code') {
      let result = await staffappSchema.findOne({
        userCode: args[2]
      })
      .catch(e => false)

      if(!result) return message.channel.send('No data found for that user code.')

      const {userId, userCode, sentConfMsg, status, timezone, age, score} = result

      const x = new Discord.MessageEmbed()
      .addField('User ID', userId, true)
      .addField('User', `<@!${userId}>`, true)
      .addField('Code', userCode, false)
      .addField('Status', status, false)
      .addField('Timezone', timezone, true)
      .addField('Age', age, false)
      .addField('Score', score, true)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()
      .setColor('#FF1654');

      message.channel.send(x)
    }
  }
}
