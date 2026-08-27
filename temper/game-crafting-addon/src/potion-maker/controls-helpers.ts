import type { ControlFields } from "./types"

type ControlWithFields = Control & ControlFields

function asControlWithFields(value: unknown): ControlWithFields {
  return value as ControlWithFields
}

export function asFields(this: void, control: Control): ControlWithFields {
  return asControlWithFields(control)
}
