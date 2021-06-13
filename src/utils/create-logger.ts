import consoleLogLevel from 'console-log-level';

const level = (process.env.LOG_LEVEL || 'info') as consoleLogLevel.LogLevelNames;

export type Logger = Record<consoleLogLevel.LogLevelNames | 'log', (...args: unknown[]) => void>;

export function createLogger(prefix = '') {
  const logger = consoleLogLevel({ level, prefix }) as Logger;
  logger.log = logger.info;
  return logger;
}
