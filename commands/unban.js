const Discord = require('discord.js')

exports.run = async(client, message, args) => {

  var accessdenied = new Discord.MessageEmbed()
  .setTitle('Error')
  .setColor('#FF1654')
  .setDescription('You do not meet the requirements to run this command, `ban_members`.');

  var noid = new Discord.MessageEmbed()
  .setTitle('Error')
  .setColor('#FF1654')
  .setDescription('Please specify the user ID to unban');

  var notbanned = new Discord.MessageEmbed()
  .setTitle('Error')
  .setColor('#FF1654')
  .setDescription('This user is not on the ban list!')

  if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(accessdenied)

  var userID = args[0]
  if(!userID) return message.channel.send(noid)

  try {
    banlist = await message.guild.fetchBan(userID);
  } catch(e) {
    return message.channel.send(notbanned)
  }

  message.guild.members.unban(`${userID}`)

  var unbanned = new Discord.MessageEmbed()
  .setColor('#4BCC85') 
  .setDescription(`<a:success:769189756051390471> <@!${userID}> has been **unbanned**`)

  message.channel.send(unbanned)
}