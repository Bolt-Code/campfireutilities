const Discord = require('discord.js')
const util = require('util')
const staffpermsSchema = require('../schemas/staffperms-schema')
const prefix = process.env.PREFIX


exports.run = async(client, message, args) => {
  
    const sessionstarted = new Discord.MessageEmbed()
    .setColor('#09fff2')
    .setDescription(`A new session has been opened for **${message.author.username}**\n\nYou can end this session by typing \`.end\`, and can make the bot ignore a message by running \`.ignore [msg]\``)

    const evperms = await staffpermsSchema.findOne({
    permissionName: "eval"
  })
  .catch(e => false)

  const {enabledIds} = evperms

  if(!enabledIds.includes(message.author.id)) return message.react('🔥');

    message.channel.send(sessionstarted)
    let filter = m => m.author.id === message.author.id
    let collector = new Discord.MessageCollector(message.channel, filter, { time: 300000 })
    collector.on('collect', (message, col) => {
        if(message.content.startsWith(`.end`)) {
            collector.stop();
            message.channel.send(`Session ended for **${message.author.tag}**!`)
            return;
        }

        if(message.content.startsWith('$run')) {
            collector.stop();
            message.channel.send('The old session has been ended, because a new one was created!')
            return;
        }

        if(message.content.startsWith(`.ignore`)) return;

        if(message.content.startsWith('client.token')) return message.channel.send('Woah buddy, this command was blocked because it is leaking sensitive information.')

        if(message.content.includes('message.member.ban()')) return message.channel.send('I don\'t believe you want to do that...')

        if(message.content.includes('message.member.kick()')) return message.channel.send('I don\'t believe you want to do that...')

        let output;

        try {
          output = eval(message.content)
          const outputembed = new Discord.MessageEmbed().setColor('#FF1654')
          .setDescription(`🔥 Input:\`\`\`js\n${message.content}\`\`\`\n🧯 Output:\`\`\`\n${output}\`\`\``)

          message.channel.send(outputembed)
        } catch (err){
            return message.channel.send(`\`${err}\``)
        }

        if(typeof output != 'string') output = util.inspect(output);


        })

        collector.on('end', () => {
            return;
        })
    }