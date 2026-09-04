import { z } from "zod"
import { NarrowError } from "../narrow-error/narrow-error.module.code.ts"

declare const process: { readonly env: Record<string, string | undefined> }

const ENV_VALUE_SCHEMA = z.string().min(1)

export function requireEnv(name: string): string {
  try {
    return ENV_VALUE_SCHEMA.parse(process.env[name])
  } catch {
    throw new NarrowError(`requireEnv: env var ${name} is not set`)
  }
}

const OPTIONAL_ENV_SCHEMA = z
  .string()
  .transform((s) => (s === "" ? undefined : s))
  .optional()

export function optionalEnv(name: string): string | undefined {
  return OPTIONAL_ENV_SCHEMA.parse(process.env[name])
}
