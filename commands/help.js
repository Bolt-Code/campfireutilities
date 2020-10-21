const fs = require('fs')
const Discord = require('discord.js')
const prefix = process.env.PREFIX

exports.run = (client, message, args)=>{
	var e = new Discord.MessageEmbed()

	e.setTitle(`❓Commands - Campfire Utilites❓`)

	var commands = fs.readdirSync(`/home/runner/campfireutilities/commands`).filter(file => file.endsWith('.js'))

	var d = ``

	commands.forEach((c)=>{
		var name = c.split('.')[0]

		d += `${prefix}${name}\n`
	})

	e.setDescription(` \`\`\`${d}\`\`\`  `)

	e.setColor(`#FF1654`)
	e.setFooter(`Requested by ${message.author.tag}`)

	message.channel.send(e)
}