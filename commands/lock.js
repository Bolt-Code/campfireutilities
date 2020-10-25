const Discord = require('discord.js')

exports.run = async(client, message, args) =>{

  var accessdenied = new Discord.MessageEmbed()
  .setTitle('Error')
  .setColor('#FF1654')
  .setDescription('You do not meet the requirements to run this command, `manage_roles`.');


  if(!message.member.hasPermission('manage_roles'.toUpperCase())) return message.channel.send(accessdenied)


  var rc = message.guild.roles.cache.get('759397768497332246')

  if(!rc){
    return message.channel.send(` \` Couldn't find 'Registered Camper Role', does it exist?\` `)
  }

  message.channel.updateOverwrite(rc.id, {
    SEND_MESSAGES: false
  })

  message.channel.send(`This channel has been locked by ${message.author.tag}! You are **NOT** muted. \n\nDo **NOT** DM any staff member asking why you can't send messages in this channel. More information will be sent in this channel.`)
}