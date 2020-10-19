const Discord = require('discord.js')
const prefix = process.env.PREFIX
const staffappSchema = require('../schemas/staffapp-schema')
const userSchema = require('../schemas/user-schema')
const mongo = require('../mongo.js')

const fs = require('fs')

module.exports = async(client, message) => {

  if(message.author.bot){
		return
	}

  if(message.content.includes('<@&759762099278184479>')) {
    message.channel.send('**WARNING:** You are about to ping the entire staff team. Only continue if no staff member is online or available to help. Abusing this will result in a mute or ban. To continue, type \`confirm\`.')

    const filter = m => m.content.toLowerCase().includes('confirm') && m.author.id === message.author.id

    message.channel.awaitMessages(filter, { max: 1, time: 20000 })
    .then(collected => collected.first().channel.send(`**<@&767568808516780073> »** ${message.author} has requested to ping all staff. Please resolve the user's issue.\nIf this request was abusive, use \`${prefix}report [user ID/mention] [reason]\``))
    .catch(collected => message.channel.send(`Request has been cancelled. (Requested by ${message.author})`));
  }

  if(message.content == 'potato'){
    message.react('🥔')
  }
  
  if(!message.content.startsWith(prefix)) return;

  if(message.channel.type == 'dm') {
    if(message.content.startsWith(`${prefix}apply`)) {
      //STAFF APP FORM CODE

      const applied = await staffappSchema.findOne({
        userId: message.author.id,
      }).catch(e => false)

      if(applied) {
        const {userCode} = applied
        message.author.send(`You already have an open application. Your current code is: \`${userCode}\`\nForm Link: <https://forms.gle/PcirLbK4juQcbPxW9>`)
        return;
      }

      async function makecode() {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 20; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        message.author.send(`Ready to apply for staff? Here is your code: \`${result}\`\nForm Link: <https://forms.gle/PcirLbK4juQcbPxW9>\n**NOTE:** The code you were given is a one-time use code. Anyone who has access to that code can submit applications under your name. Do not share your code with anyone. Good luck!`)

        await new staffappSchema({
          userId: message.author.id,
          userCode: result,
          sentConfMsg: false,
        }).save()
      }
      makecode()
    }

    //REGISTRATION FORM CODE

    if(message.content.startsWith(`${prefix}register`)) {
      const registered2 = await userSchema.findOne({
        userId: message.author.id,
      }).catch(e => false)

    if(registered2) {
      const {regCode, registered} = registered2
      if(!registered) {
        message.author.send(`You already have an open registration form. Your current code is: \`${regCode}\`\nForm Link: <https://forms.gle/Uo98KMC2NuS4Lmth8>`)
        return;
      } else {
        message.author.send('Your registration has already been completed.')
        return;
      }
    }

    async function regcode() {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < 20; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      message.author.send(`Forced registration. Here is your code: \`${result}\`\nForm Link: <https://forms.gle/Uo98KMC2NuS4Lmth8>\n**NOTE:** Anyone who has access to that code can register under your name. Do not share your code with anyone.`)

      await userSchema.findOneAndUpdate({
        userId: message.author.id,
      },{
        userId: message.author.id,
        regCode: result,
        registered: false,
        groupNum: 0,
        sentConfMsg: false,
      },{
        new: true,
        upsert: true,
      })
    }

  regcode()

    }
  } else {
    try {
      const args = message.content.split(/ +/g)
      const cmd = args.shift().slice(prefix.length).toLowerCase();

      var file = require(`../commands/${cmd}.js`)
      file.run(client, message, args)
    } catch (e) {
      return;
    }
  }
}