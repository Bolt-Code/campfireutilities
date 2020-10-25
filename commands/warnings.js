const Discord = require('discord.js')
const mongo = require('../mongo')
const punishmentsSchema = require('../schemas/punishments-schema')
const staffpermsSchema = require('../schemas/staffperms-schema')

exports.run = async(client, message, args) =>{
  const staff = await staffpermsSchema.findOne({
    permissionName: "staff"
  })
  .catch(e => false)

  const {enabledIds} = staff

  //var lookupuser = message.author

  if(enabledIds.includes(message.author.id)) {
    if(!args[0]) {
      var result = await punishmentsSchema.find({
        userId: message.author.id,
      })
      .catch(e => false)

      if(result.length < 1) return message.channel.send('No punishments? Hmm... I might have to add some.')
    } else {
      var i = 0
      message.mentions.users.forEach(() => {
        i++
        console.log(1)
      })
      if(i < 1) {
        var person = args[0]
      } else {
        var person = message.mentions.members.first().id
      }
      var result = await punishmentsSchema.find({
        userId: person
      })
      .catch(e => false)

      if(result.length < 1) return message.channel.send('No punishments were found. If the user isn\'t in the server anymore, use their ID instead.')
    }
    
    /*ping = message.mentions.users.first()
    if(!ping) {
      lookupuser = message.author
    } else {
      lookupuser = ping
    }*/
  }

  /*const result = await punishmentsSchema.find({
    userId: lookupuser.id,
  })
  .catch(e => false)

  if(result.length < 1) return message.channel.send('No punishments? Hmm... I might have to add some.')*/

  if(result.length > 25) return message.channel.send('Wowza! You have a lot of warnings... Please contact **seb.go#2641** to get a full list of your warnings.')

  const p = new Discord.MessageEmbed()
  //p.setAuthor(`${lookupuser.tag}`, lookupuser.displayAvatarURL({dynamic: true}))
  //p.setDescription(`All punishments for ${lookupuser}`)

  result.forEach(result => {
    const {authorId, code, type, date, reason} = result

    p.addField(`${type} (ID: ${code})`, `Reason: ${reason}\nDate: \`${date}\``, false)
  })

  p.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
  p.setTimestamp()
  p.setColor('#FF1654');

  message.channel.send(p)
}