
import { formatProvenance, readRunningCheckoutProvenance } from "@shared/cli/ops/provenance"
import { codeModule } from "../lib/code-import.ts"
import { commandSet } from "./set.ts"
import type { Command } from "./surface.ts"

const ERRORS = "@shared/errors-core"

export class CodeModuleError extends Error {}

function member(mod: Record<string, unknown>, specifier: string, name: string): unknown {
  const value = mod[name]
  if (value === undefined) {
    throw new CodeModuleError(
      `\`${specifier}\` exports no \`${name}\` — it exports: ${Object.keys(mod).sort().join(", ")}`
    )
  }
  return value
}

function asFunction(
  mod: Record<string, unknown>,
  specifier: string,
  name: string
): (...args: readonly unknown[]) => unknown {
  const value = member(mod, specifier, name)
  if (typeof value !== "function") {
    throw new CodeModuleError(`\`${specifier}\`'s \`${name}\` is not a function`)
  }
  return value as (...args: readonly unknown[]) => unknown
}

export interface CodeKit {
  readonly messageOf: (err: unknown) => string
  readonly rejectedFlag: (err: unknown) => { readonly name: string; readonly suggestion?: string } | undefined
  readonly commands: readonly Command[]
}

export async function codeKit(): Promise<CodeKit> {
  const errors = await codeModule<Record<string, unknown>>(ERRORS)
  const normalize = asFunction(errors, ERRORS, "normalizeThrowable") as (e: unknown) => {
    message: string
  }

  return {
    messageOf: (err) => normalize(err).message,
    rejectedFlag: (err) =>
      (err as { unknownFlag?: { name: string; suggestion?: string } } | null)?.unknownFlag ?? undefined,
    commands: commandSet(),
  }
}

export function provenanceLine(): string {
  return formatProvenance(readRunningCheckoutProvenance())
}
