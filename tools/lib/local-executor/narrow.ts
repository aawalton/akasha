import { z } from "zod"

const ENV_VALUE_SCHEMA = z.string().min(1)

export function requireEnv(name: string): string {
  try {
    return ENV_VALUE_SCHEMA.parse(process.env[name])
  } catch {
    throw new Error(`requireEnv: env var ${name} is not set`)
  }
}

export function requireFirst<T>(array: readonly T[], label?: string): T {
  if (array.length < 1) {
    throw new Error(
      `requireFirst: expected at least 1 element${label !== undefined ? ` in ${label}` : ""}, got 0`
    )
  }
  for (const value of array) return value
  throw new Error(`requireFirst: unreachable${label !== undefined ? ` in ${label}` : ""}`)
}
