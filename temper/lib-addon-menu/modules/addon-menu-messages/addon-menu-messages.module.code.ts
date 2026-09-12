const MESSAGE_PREFIX = "[LAM2] "
let messages: string[] = []

export function printLater(this: void, msg: string): undefined {
  if (CHAT_SYSTEM.primaryContainer !== undefined) {
    d(MESSAGE_PREFIX + msg)
  } else {
    messages.push(msg)
  }
}

export function flushMessages(this: void): undefined {
  for (const msg of messages) {
    d(MESSAGE_PREFIX + msg)
  }
  messages = []
}

function noop(this: void): undefined {}

function createNoopLogger(this: void): LamLogger {
  return { Warn: noop, Error: noop, Info: noop, Debug: noop, Verbose: noop }
}

export const logger: LamLogger =
  LibDebugLogger !== undefined ? LibDebugLogger("LibAddonMenu-2.0") : createNoopLogger()
