const Discord = require('discord.js')
const ms = require('ms')

exports.run = async(client, message, args) => {
    var ms = 0

    var i = setInterval(()=>{
      ms++
    }, 01)

		
    message.channel.send(client.embed.main(`🏓 Calculating...`)).then((m)=>{
      clearInterval(i)

			var e = new Discord.MessageEmbed()
			e.setTitle(`🏓 Pong! 🏓`)
      e.addField('Bot Latency', `${ms}ms`, true)
      e.addField('API Latency', `${client.ws.ping}ms`, true)
      //e.addField('Bot Uptime', `${ms(client.uptime, { long: true })}`, false)
			e.setColor(client.defaultColor)
      m.edit(e)
  })
}