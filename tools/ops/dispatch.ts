import { type Command, HELP_FLAGS, VERSION_FLAG } from "@akasha/command-system/command-declaring"
import { inputError } from "../lib/exit.ts"
import type { CodeKit } from "./code.ts"
import { provenanceLine } from "./code.ts"
import { renderCommandHelp, renderListing } from "./render.ts"
import { readSiblingFlagSurfaces, siblingCommandHint } from "./sibling-flag-hint.ts"

export interface Match {
  readonly cmd: Command
  readonly rest: readonly string[]
}

export function wantsHelp(args: readonly string[]): boolean {
  return args.some((arg) => HELP_FLAGS.includes(arg))
}

function wantsProvenance(args: readonly string[]): boolean {
  return args.length === 1 && args[0] === VERSION_FLAG
}

export function commandsUnder(
  commands: readonly Command[],
  prefix: readonly string[]
): readonly Command[] {
  return commands.filter(
    (c) => c.path.length >= prefix.length && prefix.every((part, i) => c.path[i] === part)
  )
}

export function isValidPrefix(commands: readonly Command[], prefix: readonly string[]): boolean {
  return prefix.length === 0 || commandsUnder(commands, prefix).length > 0
}

export function longestKnownPrefix(
  commands: readonly Command[],
  prefix: readonly string[]
): readonly string[] {
  for (let take = prefix.length - 1; take > 0; take -= 1) {
    const shorter = prefix.slice(0, take)
    if (commandsUnder(commands, shorter).length > 0) return shorter
  }
  return []
}

export function findCommand(commands: readonly Command[], tokens: readonly string[]): Match | null {
  const candidates = [...commands].sort((a, b) => b.path.length - a.path.length)
  for (const cmd of candidates) {
    if (cmd.path.length > tokens.length) continue
    if (cmd.path.every((part, i) => tokens[i] === part)) {
      return { cmd, rest: tokens.slice(cmd.path.length) }
    }
  }
  return null
}

export function extractPrefix(args: readonly string[]): readonly string[] {
  const prefix: string[] = []
  for (const arg of args) {
    if (HELP_FLAGS.includes(arg)) break
    prefix.push(arg)
  }
  return prefix
}

export async function dispatch(
  kit: CodeKit,
  args: readonly string[],
  match: Match | null
): Promise<void> {
  if (wantsProvenance(args)) {
    process.stdout.write(`${provenanceLine()}\n`)
    return
  }

  if (match && wantsHelp(match.rest)) {
    process.stdout.write(`${await renderCommandHelp(match.cmd)}\n`)
    return
  }

  if (match) {
    await (await match.cmd.load()).default(match.rest)
    return
  }

  const prefix = extractPrefix(args)
  if (isValidPrefix(kit.commands, prefix)) {
    process.stdout.write(`${renderListing(prefix, commandsUnder(kit.commands, prefix))}\n`)
    return
  }

  const known = longestKnownPrefix(kit.commands, prefix)
  console.error(renderListing(known, commandsUnder(kit.commands, known)))
  throw inputError(
    known.length === 0
      ? "ops: unknown command"
      : `ops: unknown command under \`ops ${known.join(" ")}\``
  )
}

export async function reportableMessage(
  kit: CodeKit,
  err: unknown,
  match: Match | null
): Promise<string> {
  const message = kit.messageOf(err)
  if (match === null) return message
  const rejected = kit.rejectedFlag(err)
  if (rejected === undefined || rejected.suggestion !== undefined) return message
  const siblings = await readSiblingFlagSurfaces(kit.commands, match.cmd.path)
  const hint = siblingCommandHint(rejected.name, siblings)
  return hint === undefined ? message : `${message} ${hint}`
}
