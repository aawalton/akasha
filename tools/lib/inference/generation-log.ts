import { OperationalError } from "@shared/errors-core/exit"
import type { Json } from "@shared/supabase-database/generated/database"
import { kebabizeKey } from "../tracking/keys.ts"
import { patchRow, type Written, writeRow } from "@shared/pages-query"
import { optionalEnv } from "@shared/utils-narrow/require-env"

export function generationLogSlug(): string {
  const stated = optionalEnv("GENERATION_LOG")?.trim()
  return stated === undefined || stated === "" ? "alan" : stated
}

export const GENERATION_WRITER = "inference-cli"

export function rowValuesOf(properties: Readonly<Record<string, Json>>): Record<string, Json> {
  const values: Record<string, Json> = {}
  for (const [key, value] of Object.entries(properties)) {
    values[kebabizeKey(key)] = value
  }
  return values
}

function orThrow(written: Written, what: string): undefined {
  if (written.ok) return
  throw new OperationalError(`${what} did not land: ${written.why}`)
}

export async function landRow(
  pageTypeSlug: string,
  properties: Readonly<Record<string, Json>>,
  id: string = Bun.randomUUIDv7()
): Promise<string> {
  const written = await writeRow(
    pageTypeSlug,
    generationLogSlug(),
    { id, ...rowValuesOf(properties) },
    GENERATION_WRITER
  )
  orThrow(written, `the ${pageTypeSlug} row ${id}`)
  return id
}

export async function mergeRow(
  pageTypeSlug: string,
  id: string,
  properties: Readonly<Record<string, Json>>
): Promise<void> {
  const written = await patchRow(
    pageTypeSlug,
    generationLogSlug(),
    { id, ...rowValuesOf(properties) },
    GENERATION_WRITER
  )
  orThrow(written, `the patch of ${pageTypeSlug} row ${id}`)
}
