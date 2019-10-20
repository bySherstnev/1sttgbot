const Telegraf = require('telegraf')
const SocksAgent = require('socks5-https-client/lib/Agent')
const socksAgent = new SocksAgent({
  socksHost: '35.189.121.161',
  socksPort: '4444',
});

require('dotenv').config()
const fs = require('fs')
const token = process.env.BOT_TOKEN
const bot = new Telegraf(token, {
  telegram: { agent: socksAgent }
});

bot.start(ctx => ctx.reply(`Welcome ${ctx.from.first_name}`))
bot.help(ctx => ctx.reply('Help page for basic bot'))
bot.command(['command1', 'command2'], ctx => ctx.reply('Command 👍🏻'))

let re = /^[0-9]*$/
bot.hears(re, ctx => {
  ctx.reply(`You are ${parseInt(ctx.message.text) >= 18 ? `adult` : `underage`}`)
})

bot.hears('document', ctx => ctx.replyWithDocument(
  { url: 'https://drive.google.com/open?id=1GGkv9Zk8Mcx_Zwk6py9UCYv_xARbtP2g',
    filename: 'role.pdf'
  }
))

bot.hears('123f', ctx => ctx.replyWithPhoto(
  { source: '123.png',
    filename: '123.png'
  }
))
// не работает скачивание документа и по ссылке. нужно разобраться. посмотреть replyWithDocument
//bot.on('text', ctx => {
//  ctx.reply('Hello')
//})

bot.on('photo', ctx => {
  ctx.reply('Nice Photo')
})

bot.on(['sticker', 'video'], ctx => {
  ctx.reply('i like it')
})

bot.launch()