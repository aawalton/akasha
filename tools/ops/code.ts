
import { formatProvenance, readRunningCheckoutProvenance } from "@shared/cli/ops/provenance"
import { normalizeThrowable } from "@shared/errors-core"
import { commandSet } from "./set.ts"
import type { Command } from "./surface.ts"

export interface CodeKit {
  readonly messageOf: (err: unknown) => string
  readonly rejectedFlag: (err: unknown) => { readonly name: string; readonly suggestion?: string } | undefined
  readonly commands: readonly Command[]
}

export async function codeKit(): Promise<CodeKit> {
  return {
    messageOf: (err) => normalizeThrowable(err).message,
    rejectedFlag: (err) =>
      (err as { unknownFlag?: { name: string; suggestion?: string } } | null)?.unknownFlag ?? undefined,
    commands: commandSet(),
  }
}

export function provenanceLine(): string {
  return formatProvenance(readRunningCheckoutProvenance())
}
