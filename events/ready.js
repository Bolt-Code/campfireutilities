const Discord = require('discord.js')
const mongo = require('../mongo')
const staffpermsSchema = require('../schemas/staffperms-schema')
const axios = require('axios')

module.exports = async(client) => {
  console.log(`Logged in as ${client.user.username}...`)

	client.user.setActivity(`Loading...`)

	function finalAct() { client.user.setActivity(`${client.users.cache.size} members!`, { type: 'WATCHING' }) }

  setTimeout(finalAct, 5000)
  await mongo()

  /*const server = client.guilds.cache.get('759385366531932160')
  server.channels.cache.forEach((channel) => {
    if(channel.type === 'category') return;
    console.log(channel.name)
  })*/
}