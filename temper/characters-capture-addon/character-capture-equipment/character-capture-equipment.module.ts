import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const characterCaptureEquipment = {
  id: "01a0616b-69ef-7681-b39d-d35c456d1dc4",
  type: "module",
  slug: "character-capture-equipment",
  definition: "what the character is wearing, read slot by slot into codec indices",
  code: "ts",
} as const satisfies Module
