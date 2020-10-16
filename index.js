const express = require('express')
const fs = require('fs')
const Discord = require('discord.js')

app = express()

app.get('/', (req, res) => {
  res.end(`Campfire Utilities`)
})

app.listen(3000)
