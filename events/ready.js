const Discord = require('discord.js')
const mongo = require('../mongo')
const staffpermsSchema = require('../schemas/staffperms-schema')

module.exports = async(client) => {
  console.log(`Logged in as ${client.user.username}...`)

	client.user.setActivity(`Loading events...`)

  function newAct() {
    client.user.setActivity('Loading commands...')
  }

  function dataAct() {
    client.user.setActivity('Connecting to database...')
  }

	function finalAct() { client.user.setActivity(`${client.users.cache.size} members!`, { type: 'WATCHING' }) }

  setTimeout(newAct, 5000)
  setTimeout(dataAct, 10000)
  setTimeout(finalAct, 15000)
  await mongo()
}