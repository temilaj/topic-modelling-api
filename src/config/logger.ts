import { createLogger, format, transports, Logger } from 'winston';

import config from './environments';

const { combine, timestamp, json } = format;

const options = {
  file: {
    level: 'info',
    filename: `${__dirname}/../../logs/info.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  warningFile: {
    level: 'warn',
    filename: `${__dirname}/../../logs/warn.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  errorFile: {
    level: 'error',
    filename: `${__dirname}/../../logs/error.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger: Logger = createLogger({
  format: combine(timestamp(), json()),
  transports: [
    new transports.File(options.errorFile),
    new transports.File(options.warningFile),
    new transports.File(options.file),
  ],
  exitOnError: false,
});

if (!config.isProduction) {
  logger.add(
    new transports.Console({
      format: format.simple(),
    }),
  );
}

logger.stream = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export default logger;
