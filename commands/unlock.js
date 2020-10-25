const Discord = require('discord.js')

exports.run = async(client, message, args) =>{

  var accessdenied = new Discord.MessageEmbed()
  .setTitle('Error')
  .setColor('#FF1654')
  .setDescription('You do not meet the requirements to run this command, `manage_roles`.');


  if(!message.member.hasPermission('manage_roles'.toUpperCase())) return message.channel.send(accessdenied)


  var rc = message.guild.roles.cache.get('759397768497332246')

  if(!rc){
    return message.channel.send(` \` Couldn't find 'Registered Camper Role', does it exists?\` `)
  }

  message.channel.updateOverwrite(rc.id, {
    SEND_MESSAGES: true
  })

  message.channel.send(`This channel has been unlocked by ${message.author.tag}! You may now talk.`)
}