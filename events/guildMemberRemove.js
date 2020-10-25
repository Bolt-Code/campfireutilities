const Discord = require('discord.js')
const userSchema = require('../schemas/user-schema')
const mongo = require('../mongo.js')

module.exports = async(client, member) => {
  if(!member.guild.id === '759385366531932160') return;
  
  await userSchema.findOneAndDelete({
    userId: member.id,
  })

  var d = new Date()
  var day = d.getDate()
  var year = d.getFullYear()
  var month = d.getMonth() + 1
  var hour = d.getHours()
  var minute = d.getMinutes()
  var time = `${month}/${day}/${year} ${hour}:${minute}`
  const logchannel = member.guild.channels.cache.get('766808200837726208')
  logchannel.send(`<:leave:768880800174702612> **${member.user.tag}** left at \`${time}\` (${member.user.id})`)
}