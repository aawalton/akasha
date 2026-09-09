import "akasha/temper/temper-eso-types/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import type { FcoSettings } from "../companion-qol-types/companion-qol-types.module.code.ts"

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
