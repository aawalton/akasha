import { exitCodeOf } from "../lib/exit.ts"

const [entry, ...rest] = process.argv.slice(2)

if (entry === undefined) {
  process.stderr.write("error: this takes a command module's path, then that command's arguments\n")
  process.exit(2)
}

const command = (await import(entry)) as { readonly default: (args: readonly string[]) => Promise<void> }

try {
  await command.default(rest)
} catch (thrown) {
  process.stderr.write(`error: ${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
  process.exit(exitCodeOf(thrown))
}
