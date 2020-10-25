const Discord = require('discord.js')
const mongo = require('../mongo')
const staffpermsSchema = require('../schemas/staffperms-schema')
const fs = require('fs')

exports.run = async(client, message, args) => {
    const devperms = await staffpermsSchema.findOne({
    permissionName: "dev"
  })
  .catch(e => false)

  const {enabledIds} = devperms

  if(!enabledIds.includes(message.author.id)) return message.react('🔥');

  if(args[0]) {
    const reload = new Discord.MessageEmbed()
    .setColor('#FF1654')
    .setDescription(`Successfully reloaded file 🧯: \`${args[0]}.js\``)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
    .setAuthor('Reload Successful', client.user.displayAvatarURL())
    .setTimestamp();

    const failed = new Discord.MessageEmbed()
    .setColor('#FF1654')
    .setDescription(`Unable to reload file: \`${args[0]}.js\``)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
    .setAuthor('Reload Failed', client.user.displayAvatarURL())
    .setTimestamp();

    try {
        delete require.cache[require.resolve(`./${args[0]}.js`)];
    } catch (err) {
        return message.channel.send(failed)
    }

    message.channel.send(reload) 
  } else {
    var i = 0
    fs.readdir('./commands', (err, files) => {
      files.forEach(file => {
        delete require.cache[require.resolve(`./${file}`)];
        i++
      })
    })
    const allreload = new Discord.MessageEmbed()
    .setColor('#FF1654')
    .setDescription(`Successfully reloaded all files 🧯`)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
    .setAuthor('Reload Successful', client.user.displayAvatarURL())
    .setTimestamp();

    message.channel.send(allreload)
  }
}