import type { HudField } from "./types"

export interface FieldRegistry {
  register: (this: void, field: HudField) => undefined
  list: (this: void) => readonly HudField[]
}

export function createFieldRegistry(): FieldRegistry {
  const fields: HudField[] = []

  function register(field: HudField): undefined {
    const existing = fields.findIndex((f) => f.id === field.id)
    if (existing >= 0) {
      fields[existing] = field
      return
    }
    fields.push(field)
  }

  function list(): readonly HudField[] {
    return fields
      .map((field, index) => ({ field, index }))
      .sort((a, b) =>
        a.field.order === b.field.order ? a.index - b.index : a.field.order - b.field.order
      )
      .map((entry) => entry.field)
  }

  return { register, list }
}
