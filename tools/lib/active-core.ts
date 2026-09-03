import { shape } from "@akasha/utils-narrow/shape"

export class InputError extends Error {
  readonly code: number = 1
  constructor(message: string) {
    super(message)
    this.name = "InputError"
  }
}

const DURATION_MULTIPLIERS = {
  s: 1_000,
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000,
} satisfies Record<string, number>

export function parseWindowDuration(value: string, flagName = "--window"): number {
  const match = shape
    .tuple([shape.string(), shape.string(), shape.enum(["s", "m", "h", "d"])])
    .nullable()
    .parse(value.match(/^(\d+)\s*(s|m|h|d)$/))
  if (!match) {
    throw new InputError(
      `${flagName}: invalid duration "${value}" — expected format like "15m", "1h", "2d" (units: s, m, h, d)`
    )
  }
  return Number(match[1]) * DURATION_MULTIPLIERS[match[2]]
}
