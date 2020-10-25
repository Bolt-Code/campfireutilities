const Discord = require('discord.js')
const mongo = require('../mongo')
const staffpermsSchema = require('../schemas/staffperms-schema')

exports.run = async(client, message, args) => {

  const lockperms = await staffpermsSchema.findOne({
    permissionName: "lockdown"
  })
  .catch(e => false)

  const {enabledIds} = evperms

  if(!enabledIds.includes(message.author.id)) return message.react('🔥');

  const whitelisted = ['CHANNEL IDS GO HERE']

  randInt = Math.floor(Math.random() * 100)
  randInt2 = Math.floor(Math.random() * 100)
  answer = eval(randInt + randInt2)

  message.channel.send(`**WARNING:** You are about to lock the entire server. Only continue if no other higher staff member is available. To continue, reply with the answer to \`${randInt} + ${randInt2}\``)

  const filter = m => m.content.trim().startsWith(answer) && m.author.id === message.author.id

  message.channel.awaitMessages(filter, { max: 1, time: 30000 })
  .then(collected => collected.first().channel.send(`Please wait while I lock all channels. Do not run this command again.`))
  .catch(collected => message.channel.send(`Request has been cancelled.`));

  var rc = message.guild.roles.cache.get('759397768497332246')

  if(!rc){
    return message.channel.send(` \` Couldn't find 'Registered Camper Role', does it exist?\` `)
  }

  await message.guild.channels.cache.forEach((channel) => {
    if(whitelisted.includes(channel.id)) return;
      channel.updateOverwrite(rc.id, { SEND_MESSAGES: false
    })
    channel.send('The server is on **lockdown**. You are **NOT** muted. Check [main channel] for more information.')
  })

  message.channel.send('Successfully locked all channels in the server. ')
}