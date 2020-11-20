import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as json from 'koa-json'
import * as bodyParser from 'koa-bodyparser'

// Winston instance.
import { logger } from './logger/winston'
import { koaLogger as winstonKoaLogger , disableLogColor } from './logger/winston-koa-logger'

const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
    ctx.body={msg: 'Hi Bro!'}
    await next()
});

app.use(json())
app.use(winstonKoaLogger(logger, disableLogColor()))
app.use(bodyParser())

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, ()=> {
    logger.log('info', {event: 'Koa started'})
});