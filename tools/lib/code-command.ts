
import { codeModule } from "./code-import.ts"

export class CodeCommandError extends Error {}

interface Handler {
  readonly default?: unknown
}

export async function runCodeCommand(handler: string, args: readonly string[]): Promise<void> {
  const mod = await codeModule<Handler>(handler)
  const run = mod.default
  if (typeof run !== "function") {
    throw new CodeCommandError(`\`${handler}\` has no default export to run`)
  }
  await (run as (args: readonly string[]) => Promise<void>)(args)
}
