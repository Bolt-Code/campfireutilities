const Discord = require('discord.js')

exports.run = async(client, message, args) => {
    var ms = 0

    var i = setInterval(()=>{
      ms++
    }, 01)

		
    message.channel.send(client.embed.main(`🏓 Calculating...`)).then((m)=>{
      clearInterval(i)

			var e = new Discord.MessageEmbed()
			e.setTitle(`🏓 Pong! 🏓`)
			e.setDescription(`Bot Latency: ${ms}ms\nAPI Latency: ${client.ws.ping}ms`)
			e.setColor(client.defaultColor)
      m.edit(e)
  })
}