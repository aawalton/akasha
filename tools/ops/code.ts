import {
  formatProvenance,
  readRunningCheckoutProvenance,
} from "@akasha/checkout-version/provenance"
import type { Command } from "@akasha/command-system/command-declaring"
import { normalizeThrowable } from "@akasha/errors-core/throwable-normalizing"
import { commandSet } from "./set.ts"

export interface CodeKit {
  readonly messageOf: (err: unknown) => string
  readonly rejectedFlag: (
    err: unknown
  ) => { readonly name: string; readonly suggestion?: string } | undefined
  readonly commands: readonly Command[]
}

export async function codeKit(): Promise<CodeKit> {
  return {
    messageOf: (err) => normalizeThrowable(err).message,
    rejectedFlag: (err) =>
      (err as { unknownFlag?: { name: string; suggestion?: string } } | null)?.unknownFlag ??
      undefined,
    commands: commandSet(),
  }
}

export function provenanceLine(): string {
  return formatProvenance(readRunningCheckoutProvenance())
}
