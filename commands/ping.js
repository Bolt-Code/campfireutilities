const Discord = require('discord.js')
const ms = require('ms')

exports.run = async(client, message, args) => {
			var e = new Discord.MessageEmbed()
			e.setTitle(`🏓 Pong! 🏓`)
      e.addField('Bot Latency', `69ms`, true)
      e.addField('API Latency', `${client.ws.ping}ms`, true)
      //e.addField('Bot Uptime', `${ms(client.uptime, { long: true })}`, false)
			e.setColor('#7289DA')
      message.channel.send(e) 
}