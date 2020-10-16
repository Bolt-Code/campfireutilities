const Discord = require('discord.js')

module.exports = async(client) => {
  console.log(`Logged in as ${client.user.username}...`)

	client.user.setActivity(`LOADING...`)

	function newAct() { client.user.setActivity(`${client.users.cache.size} members!`, { type: 'WATCHING' }) }

  setTimeout(newAct, 10000)
}