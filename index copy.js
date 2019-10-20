const Telegraf = require('telegraf')
const SocksAgent = require('socks5-https-client/lib/Agent')
const socksAgent = new SocksAgent({
  socksHost: '173.249.35.163',
  socksPort: '10010',
});

require('dotenv').config()
const token = process.env.BOT_TOKEN
const bot = new Telegraf(token, {
  telegram: { agent: socksAgent }
});


// bot.start((ctx) => ctx.reply('Welcome!'))
// bot.help((ctx) => ctx.reply("Привет! Я первый бот.\n Умею выполнять следующие команды:\n 1. /hipster - отвечу тебе \n 2. Введи текст - поздароваюсь \n 3. hi - hey there"))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))
// bot.command('hipster', Telegraf.reply('λ'))

bot.on(`text`, ctx => {
  ctx.reply(`Hello`)
  let chatId = ctx.from.id
  ctx.telegram.sendMessage(chatId, 'Hello from sendMessage')
	// console.log('Update \n',ctx.update)
	// console.log('From \n',ctx.from)
})

bot.launch()