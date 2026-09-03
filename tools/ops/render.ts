import { expandProseRoutes } from "@akasha/command-system/prose-routing"
import { UNCLASSIFIED_EXIT_HELP } from "../lib/exit.ts"
import type { Command, CommandHelp, HelpEnvVar, HelpExit, HelpPositional } from "./surface.ts"

export function renderListing(prefix: readonly string[], commands: readonly Command[]): string {
  const header =
    prefix.length === 0
      ? "Usage: ops <command> [flags]"
      : `Usage: ops ${prefix.join(" ")} <command> [flags]`
  const width = Math.max(...commands.map((c) => c.path.join(" ").length))
  const lines: string[] = [header, "", "Commands:"]
  for (const cmd of commands) {
    lines.push(`  ${cmd.path.join(" ").padEnd(width)}  ${cmd.summary}`)
  }
  lines.push("")
  lines.push("Run `ops <command> --help` for usage of a specific command.")
  if (prefix.length === 0) {
    lines.push("Run `ops --version` for the checkout and commit answering this invocation.")
  }
  return lines.join("\n")
}

export async function renderCommandHelp(cmd: Command): Promise<string> {
  const full = cmd.path.join(" ")
  const help: CommandHelp = (await cmd.load()).help ?? {}
  const positionals: readonly HelpPositional[] = help.positionals ?? []
  const flags = expandProseRoutes(help.flags ?? []).flags

  const usageTokens: string[] = [`ops ${full}`]
  for (const p of positionals) usageTokens.push(p.required === false ? `[${p.name}]` : p.name)
  if (flags.length > 0) usageTokens.push("[flags]")

  const lines: string[] = []
  lines.push(`ops ${full} — ${cmd.summary}`)
  const described = cmd.document?.help ?? help.description
  if (described != null && described.trim() !== "") {
    lines.push("")
    lines.push(described.trim())
  }
  lines.push("")
  lines.push("Usage:")
  lines.push(`  ${usageTokens.join(" ")}`)

  if (positionals.length > 0) {
    lines.push("")
    lines.push("Arguments:")
    const pwidth = Math.max(...positionals.map((p) => p.name.length))
    for (const p of positionals) {
      const aliasNote = p.aliasOfFlag != null ? ` (alias of \`${p.aliasOfFlag}\`)` : ""
      lines.push(`  ${p.name.padEnd(pwidth)}  ${p.description}${aliasNote}`)
    }
  }

  if (flags.length > 0) {
    lines.push("")
    lines.push("Flags:")
    const labels = flags.map((f) => (f.argLabel != null ? `${f.name} ${f.argLabel}` : f.name))
    const fwidth = Math.max(...labels.map((l) => l.length))
    for (const [i, f] of flags.entries()) {
      const label = (labels[i] ?? f.name).padEnd(fwidth)
      const tags: string[] = []
      if (f.required) tags.push("required")
      if (f.repeat) tags.push("repeatable")
      if (f.choices) tags.push(`choices: ${f.choices.join("|")}`)
      if (f.default !== undefined) tags.push(`default: ${f.default}`)
      if (f.acceptsStdin) tags.push("accepts stdin via -")
      if (f.aliases && f.aliases.length > 0) tags.push(`aliases: ${f.aliases.join(", ")}`)
      const suffix = tags.length > 0 ? ` (${tags.join(", ")})` : ""
      lines.push(`  ${label}  ${f.description}${suffix}`)
    }
  }

  if (help.mutuallyExclusive && help.mutuallyExclusive.length > 0) {
    lines.push("")
    lines.push("Mutually exclusive:")
    for (const group of help.mutuallyExclusive) lines.push(`  ${group.join(" / ")}`)
  }

  const envVars: readonly HelpEnvVar[] = help.envVars ?? []
  if (envVars.length > 0) {
    lines.push("")
    lines.push("Environment:")
    const ewidth = Math.max(...envVars.map((e) => e.name.length))
    for (const e of envVars) {
      const tags: string[] = []
      if (e.required) tags.push("required")
      if (e.default !== undefined) tags.push(`default: ${e.default}`)
      const suffix = tags.length > 0 ? ` (${tags.join(", ")})` : ""
      lines.push(`  ${e.name.padEnd(ewidth)}  ${e.description}${suffix}`)
    }
  }

  const exits: readonly HelpExit[] = help.exits ?? []
  if (exits.length > 0) {
    lines.push("")
    lines.push("Exit codes:")
    for (const e of [...exits, UNCLASSIFIED_EXIT_HELP]) {
      lines.push(`  ${String(e.code).padEnd(3)}  ${e.meaning}`)
    }
  }

  if (help.examples && help.examples.length > 0) {
    lines.push("")
    lines.push("Examples:")
    for (const ex of help.examples) {
      for (const line of ex.split("\n")) lines.push(`  ${line}`)
    }
  }

  if (help.epilog != null) {
    const text = typeof help.epilog === "function" ? await help.epilog() : help.epilog
    if (text !== "") {
      lines.push("")
      for (const line of text.split("\n")) lines.push(line)
    }
  }

  return lines.join("\n")
}
