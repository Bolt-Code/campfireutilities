require('./keepalive')

const fs = require('fs')
const Discord = require('discord.js')

const client = new Discord.Client()

var prefix = `$`

client.commands = new Discord.Collection()

client.embed = {
	main: (message)=>{
		var e = new Discord.MessageEmbed()
		e.setDescription(message)
		e.setColor(`#2f3136`)

		return e
	}
}

client.on('ready', ()=>{
	console.log(`Logged in as ${client.user.username}...`)

	client.user.setActivity(`LOADING`)

	console.log(`Loading commands..`)

	var commands = fs.readdirSync(`${__dirname}/commands`).filter(file => file.endsWith('.js'))	

	commands.forEach((c)=>{
		var c = require(`./commands/${c}`)

		client.commands.set(c.name, c)

		console.log(`Loaded command ${c.name}!`)
	})

	client.user.setActivity(`${client.users.cache.size} members!`, { type: 'WATCHING' })
})

client.on('message', (message)=>{
	if(message.author.bot || message.channel.type == 'dm'){
		return
	}

	var command = message.content.split(' ')[0].replace(prefix, '').toLowerCase()

	var c = client.commands.get(command)

	if(!c){
		return
	}

	c.run(client, message)
})

client.login(process.env.TOKEN)