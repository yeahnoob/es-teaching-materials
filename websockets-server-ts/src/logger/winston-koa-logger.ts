const chalk = require('chalk');


const STATUS_COLORS = {
  error: 'red',
  warn: 'yellow',
  info: 'green'
};

let logColor: boolean = true;

/**
 * Logger
 *
 * @param {object} winstonInstance
 */
function koaLogger(winstonInstance, color = logColor): Function {
  return async (ctx, next) => {
    const start = new Date();
    try {
      await next();
    } catch (err) {
      ctx.body = {message: err.message}
      ctx.status = err.status || 500
    }

    const ms: number = Number(new Date()) - Number(start);

    let logLevel;
    if (ctx.status >= 500) {
      logLevel = 'error';
    } else if (ctx.status >= 400) {
      logLevel = 'warn';
    } else if (ctx.status >= 100) {
      logLevel = 'info';
    }

    if (!color) {
      let msg = {
        event: `client access @${(new Date()).toJSON()}`,
        method: `${ctx.method}`,
        originalUrl: `${ctx.originalUrl}`,
        status: `${ctx.status}`,
        bodyLength: `${JSON.stringify(ctx.body)}`.length,
        delay: `${ms}ms`
      };
      winstonInstance.log(logLevel, msg);
    } else {
      let msg = (chalk.gray(`${ctx.method} ${ctx.originalUrl}`) +
        chalk[STATUS_COLORS[logLevel]](` ${ctx.status} `) +
        chalk.gray(`${ms}ms`));
      winstonInstance.log(logLevel, msg);
    }

  };
}

// TODO: is a custom Type needed at here?
function enableLogColor(): boolean {
  return true
}

function disableLogColor(): boolean {
  return false
}

export {koaLogger, enableLogColor, disableLogColor}

