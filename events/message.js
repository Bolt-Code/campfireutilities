const Discord = require('discord.js')
const prefix = process.env.PREFIX

module.exports = async(client, message) => {
  if(message.author.bot || message.channel.type == 'dm'){
		return
	}
  if(!message.content.startsWith(process.env.PREFIX)) return

	try {
    const args = message.content.split(/ +/g)
    const cmd = args.shift().slice(prefix.length).toLowerCase();
                
    var file = require(`../commands/${cmd}.js`)
    file.run(client, message, args)
  } catch (e) {
    return;
  }
}