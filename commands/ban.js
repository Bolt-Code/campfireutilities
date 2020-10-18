const Discord = require('discord.js')

exports.run = async(client, message, args) =>{

  var accessdenied = new Discord.MessageEmbed()
  .setTitle('Error')
  .setColor('#FF1654')
  .setDescription('You do not meet the requirements to run this command, `ban_members`.');

  var nouser = new Discord.MessageEmbed()
  .setTitle('Error')
  .setColor('#FF1654')
  .setDescription('Please specify a user to ban');

  var cantkickmod = new Discord.MessageEmbed()
  .setTitle('Error')
  .setColor('#FF1654')
  .setDescription('You cannot ban this user, because their role is higher than Camp Group Leader.');

  if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(accessdenied)

  var user = message.mentions.users.first();
  if(!user) return message.channel.send(nouser)

  if(user.id === message.author.id) return message.channel.send('This command isn\'t broken, but why would you want to ban yourself?')

  var member;

  try {
    member = await message.guild.members.fetch(user)
  } catch(err) {
    member = null;
  }

  if(message.member.roles.highest.position ==  message.guild.member(user.id).roles.highest.position || message.member.roles.highest.position < message.guild.member(user.id).roles.highest.position) {
    
    var cannotkick = new Discord.MessageEmbed()
    .setTitle('Error')
    .setColor('#FF1654')
    .setDescription('You cannot ban this user because your highest role is either the same or lower as them.')

    message.channel.send(cannotkick)
    return;
  }

  if(member) {
    if(member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(cantkickmod)
  }

  var date = new Date();
    date = date.getMonth() + '/' + date.getDay() + '/' + date.getFullYear();

  var kickmsgdm = new Discord.MessageEmbed()
  .setTitle('You were banned from CampFire')
  .setColor('#FF1654')
  .addField('Reason', reason)
  .addField('Date', date)
  .addField('Problem?', 'Please report any false or abusive punishments to our Camp Superintendent.',false)
  .setTimestamp();

  var kickmsg = new Discord.MessageEmbed()
  .setColor('#4BCC85') 
  .setDescription(`<a:ok:767131603851804672> Successfully kicked **${user.username}**`)

  try {
        user.send(kickmsgdm);
    } catch(err) {
    }

  member.ban( { reason: reason });

  message.channel.send(kickmsg)

}