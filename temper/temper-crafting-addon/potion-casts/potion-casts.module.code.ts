export function asBoolean(value: unknown): boolean {
  return value as boolean
}

export function asNumber(value: unknown): number {
  return value as number
}

export function asString(value: unknown): string {
  return value as string
}

export function asRecord(value: unknown): Record<string, unknown> {
  return value as Record<string, unknown>
}

export function asLabelControl(value: unknown): LabelControl {
  return value as LabelControl
}

export function asZoColorDef(value: unknown): ZoColorDef {
  return value as ZoColorDef
}
