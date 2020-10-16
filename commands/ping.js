const Discord = require('discord.js')

module.exports = {
  name: 'ping',
  topic: 'info',
  description: 'How long does it take for the bot to send a message?',
  run: (client, message)=>{
    var ms = 0

    var i = setInterval(()=>{
      ms++
    }, 01)

		
    message.channel.send(client.embed.main(`🏓 Pinging...`)).then((m)=>{
      clearInterval(i)

			var e = new Discord.MessageEmbed()

			e.setTitle(`🏓 Pong! 🏓`)

			e.setDescription(`💓 Heartbeat is ${ms}ms\nAPI latency is ${client.ws.ping}ms`)

			e.setColor(`#2f3136`)

      m.edit(e)
    })
  }
}