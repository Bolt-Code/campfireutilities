const Discord = require('discord.js')
const mongo = require('../mongo')

module.exports = async(client) => {
  console.log(`Logged in as ${client.user.username}...`)

	client.user.setActivity(`Loading all files...`)

	function newAct() { client.user.setActivity(`${client.users.cache.size} members!`, { type: 'WATCHING' }) }

  setTimeout(newAct, 10000)
  await mongo()
}