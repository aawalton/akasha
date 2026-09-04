import { asStringChunks } from "../chat-message-casts/chat-message-casts.module.code.ts"
import { MAX_SAVE_DATA_LENGTH } from "../chat-message-constants/chat-message-constants.module.code.ts"

export function writeToSavedVariable(this: void, value: unknown): unknown {
  let output: unknown = value
  if (type(value) === "string") {
    const stringValue = value as string
    const byteLength = stringValue.length
    if (byteLength > MAX_SAVE_DATA_LENGTH) {
      const chunks: string[] = []
      let startPos = 1
      let endPos = startPos + MAX_SAVE_DATA_LENGTH - 1
      while (startPos <= byteLength) {
        chunks[chunks.length] = string.sub(stringValue, startPos, endPos)
        startPos = endPos + 1
        endPos = startPos + MAX_SAVE_DATA_LENGTH - 1
      }
      output = chunks
    }
  }
  return output
}

export function readFromSavedVariable(this: void, value: unknown): unknown {
  if (type(value) === "table") {
    return table.concat(asStringChunks(value), "")
  }
  return value
}
