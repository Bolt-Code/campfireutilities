const Discord = require('discord.js')

module.exports = async(client, error) => {
  console.log(`Error Event Fired: \n${JSON.stringify(error)}`, 'error');
}