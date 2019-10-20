const Telegraf = require('telegraf')
const SocksAgent = require('socks5-https-client/lib/Agent')
const socksAgent = new SocksAgent({
  socksHost: '166.62.33.118',
  socksPort: '22780',
});

require('dotenv').config()
const fs = require('fs')
const token = process.env.BOT_TOKEN
const bot = new Telegraf(token, {
  telegram: { agent: socksAgent }
});

bot.hears('photo', ctx => ctx.replyWithPhoto(
  { source: fs.readFileSync('tmp/thi.jpg'),
    filename: 'thi.jpg'
  }
))

bot.hears('lol', ctx => ctx.replyWithPhoto(
  { url: 'https://hi-canada.org/sn_uploads/campagne/Olivier_thumb.jpg',
    filename: 'lol.jpg'
  }
))

bot.launch()