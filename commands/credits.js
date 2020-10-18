const Discord = require('discord.js')

exports.run = (client, message, args)=>{
	/*var e = new Discord.MessageEmbed()

	e.setTitle(`Credits`)

	e.addField(`Project Leaders`, `Boltzoid#6609\nHackermon#0001`)
	e.addField(`Developers`, `Hackermon#0001 (Developer)\nseb.go#2641 (Developer)\nPiyeris#2565 (Developer)`)

	e.setColor(`#FF1654`)

	e.setFooter(`This people made the bot.`)

	message.channel.send(e)*/


  const f = new Discord.MessageEmbed()
  f.setAuthor('Awesome people who made me', client.user.displayAvatarURL({dynamic: true}))
  
   f.addFjield('Boltzoid', 'Supervisor, Founder and Head Developer', false) 

  f.addField(`Hackermon`, `Head Developer: Functionality, commands, and general development (also made the website)`, false) 

  f.addField('seb.go', 'Head Developer: Database integration, forms/sheets integration, and general development', false)
  
  f.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
  f.setTimestamp()
  f.setColor('#7289DA');
  message.channel.send(f)
}