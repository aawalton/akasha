import type { Rgb } from "../skill-point-finder-types/skill-point-finder-types.module.code.ts"

export function redText(this: void, text: string | number): string {
  return `|cFF0000${tostring(text)}|r`
}

export function greenText(this: void, text: string | number): string {
  return `|c00FF00${tostring(text)}|r`
}

const HEX_DIGITS = "0123456789ABCDEF"

export function rgbToHex(this: void, rgb: Rgb): string {
  let hexStr = "|c"
  for (const v of rgb) {
    let hex = ""
    let tmpV = math.floor(255 * v + 0.5)
    while (tmpV > 0) {
      const idx = math.fmod(tmpV, 16) + 1
      tmpV = math.floor(tmpV / 16)
      hex = string.sub(HEX_DIGITS, idx, idx) + hex
    }
    if (string.len(hex) === 0) {
      hex = "00"
    } else if (string.len(hex) === 1) {
      hex = `0${hex}`
    }
    hexStr = hexStr + hex
  }
  return hexStr
}

export function colorCompletion(this: void, text: string | number, completed: boolean): string {
  return completed ? greenText(text) : redText(text)
}

export function formatQuestName(this: void, questName: string, completed: boolean): string {
  return completed ? `|l0:1:0:-25%:2:ffffff|l${questName}|l` : questName
}
