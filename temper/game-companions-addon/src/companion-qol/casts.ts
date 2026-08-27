import type { FcoSettings } from "./types"

export function asNumber(value: unknown): number {
  return value as number
}

export function asString(value: unknown): string {
  return value as string
}

export function asBoolean(value: unknown): boolean {
  return value as boolean
}

export function asRecord(value: unknown): Record<string, unknown> {
  return value as Record<string, unknown>
}

export function asControl(value: unknown): Control {
  return value as Control
}

export function asFcoSettings(value: unknown): FcoSettings {
  return value as FcoSettings
}
