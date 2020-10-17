require('./keepalive')

const fs = require('fs')
const Discord = require('discord.js')

const client = new Discord.Client()

client.defaultColor = `#FF0000`

client.embed = {
	main: (message)=>{
		var e = new Discord.MessageEmbed()
		e.setDescription(message)
		e.setColor(`#2f3136`)

		return e
	}
}

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    const event = require(`./events/${file}`)

    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client))
  })
})

client.login(process.env.TOKEN)