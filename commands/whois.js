const Discord = require('discord.js')
const moment = require('moment')

exports.run = async(client, message, args) => {
  try {

    if (args[0]) {
      var user = args[0].replace('<', '').replace('>', '').replace('@', '').replace('!', '')

      var member = message.guild.member(user)

      if(!member){
        return message.reply(`I cannot find information about someone that is not in the server.`)
      }
      var user = client.users.cache.get(member.id)

      var e = new Discord.MessageEmbed()
      e.addField(`Username`, user.tag, true)
      e.addField(`ID`, user.id, true)
      e.addField(`Nickname`, member.displayName, true)
      e.addField('Bot?', user.bot, false)
      e.addField(`Account Created`, moment(user.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a'), false)
      e.addField(`Member Joined`, moment(member.joinedAt).format('dddd, MMMM Do YYYY, h:mm:ss a'), false)
      e.setColor(member.displayHexColor)
      e.setThumbnail(user.displayAvatarURL({dynamic: true}))
      e.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
      e.setTimestamp();

      return message.channel.send(e)
    } else {
      var member = message.member
      var user = client.users.cache.get(member.id)

      var e = new Discord.MessageEmbed()
      e.addField(`Username`, user.tag, true)
      e.addField(`ID`, user.id, true)
      e.addField(`Nickname`, member.displayName, true)
      e.addField('Bot?', user.bot, false)
      e.addField(`Created`, moment(user.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a'), false)
      e.addField(`Joined`, moment(member.joinedAt).format('dddd, MMMM Do YYYY, h:mm:ss a'), false)
      e.setColor(member.displayHexColor)
      e.setThumbnail(user.displayAvatarURL({dynamic: true}))
      e.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
      e.setTimestamp();

      return message.channel.send(e)
    } 
  } catch (err) {
            console.log(`There was an error!\nError: ${err.stack}`);
            message.channel.send(
                `**ERROR!** There was an error trying to run this command:\n\`${err.message}\``,
            )
    }
}