const Telegraf = require('telegraf')
const SocksAgent = require('socks5-https-client/lib/Agent')
const socksAgent = new SocksAgent({
  socksHost: '207.180.212.121',
  socksPort: '1080',
});

require('dotenv').config()
const token = process.env.BOT_TOKEN
const bot = new Telegraf(token, {
  telegram: { agent: socksAgent }
});
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

//bot.use(Telegraf.log()) //log in terminal

extra
bot.hears('markdown', ctx => ctx.reply('_bold text_', Extra.markdown()))

// markup это клавиатура отдельная, а не в сообщении
// bot.command('custom', ctx => ctx.reply('keyboard', Markup.keyboard(
//   [['Dog', 'Cat'],
//   ['Bear', 'Monkey', 'Paris']] //Наименование кнопки на экране [[row]] [column]
//   )
//   .resize() //уменьшение размера кнопки
//   .extra() //необходимо для вывода клавиатуры
// )
// )

// bot.hears('Dog', ctx => ctx.reply(`<a href="${random('dog')}">DOG</a>`, 
//   Extra.HTML()
// )
// )

// bot.hears('Cat', ctx => ctx.reply(`<a href="${random('cat')}">CAT</a>`, 
//   Extra.HTML()
// )
// )

// bot.hears('Bear', ctx => ctx.reply(`<a href="${random('bear')}">BEAR</a>`, 
// Extra.HTML()
// )
// )

// bot.hears('Monkey', ctx => ctx.reply(`<a href="${random('monkey')}">MONKEY</a>`, 
// Extra.HTML()
// )
// )

// bot.hears('Paris', ctx => ctx.reply(`<a href="${random('paris')}">Paris</a>`, 
// Extra.HTML()
// )
// )

const random = tag => {
  let imgId = Math.trunc(Math.random()*1000)
  let url = `https://loremflickr.com/g/320/240/${tag}?lock=${imgId}`
  return url
}

//2 line keyboard
bot.command('inline', ctx => ctx.reply(`Random image <a href="${random('dog')}">DOG</a>`, 
  Extra.HTML().markup(
    (m) => m.inlineKeyboard( 
      [ 
        [m.callbackButton('Next dog', 'dog'), m.callbackButton('Next cat', 'cat')],
        [m.callbackButton('Next bear', 'bear'), m.callbackButton('Next monkey', 'monkey')] 
      ]
    )
  )
))

//для работы кнопки нужно добавить action, иначе ничего не произойдет по клику
bot.action('dog', ctx => ctx.editMessageText(`Random image <a href="${random('dog')}">DOG</a>`, 
  Extra.HTML().markup(
    m => inline(m)
  )
))

bot.action('cat', ctx => ctx.editMessageText(`Random image <a href="${random('cat')}">CAT</a>`, 
  Extra.HTML().markup(
    m => inline(m) 
  )
))

bot.action('bear', ctx => ctx.editMessageText(`Random image <a href="${random('bear')}">BEAR</a>`, 
  Extra.HTML().markup(
    m => inline(m)
  )
))

bot.action('monkey', ctx => ctx.editMessageText(`Random image <a href="${random('monkey')}">MONKEY</a>`, 
  Extra.HTML().markup(
    m => inline(m) 
  )
))

const inline = (m) => m.inlineKeyboard( 
  [ 
    [m.callbackButton('Next dog', 'dog'), m.callbackButton('Next cat', 'cat')],
    [m.callbackButton('Next bear', 'bear'), m.callbackButton('Next monkey', 'monkey')]
  ]
)

bot.launch()