export const summary = "Answer a page query by name, as JSON"

import { inputError } from "../../lib/exit.ts"
import { answerNamed, namedQuery, queryNames } from "../../lib/page-query.ts"
import { absentSays, type Given, isRefused } from "../../lib/page-query-bind"
import { parseArgs } from "../../lib/parse-args.ts"
import { resolveRoots } from "../../../repo/roots/roots"
import type { CommandHelp } from "../../ops/surface.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--name",
      argLabel: "<query>",
      valueShape: "token",
      description: "The page query to answer, by its file name without `.md`.",
    },
    {
      name: "--arg",
      argLabel: "<name>=<value>",
      valueShape: "token",
      repeat: true,
      description: "An argument the query takes. Repeatable.",
    },
    { name: "--list", description: "Print every page query's name, one per line." },
  ],
  exits: [
    { code: 0, meaning: "answered, and the JSON is on stdout" },
    {
      code: 1,
      meaning: "input error, no page query carries that name, or the query refused what it was given",
    },
  ],
  examples: ["ops page query --list", "ops page query --name claude-account-all"],
}

function givenIn(stated: readonly string[]): Given {
  const given: Record<string, string | string[]> = {}
  for (const one of stated) {
    const cut = one.indexOf("=")
    if (cut <= 0) throw inputError("each --arg reads `<name>=<value>`")
    const name = one.slice(0, cut)
    const value = one.slice(cut + 1)
    const held = given[name]
    if (held === undefined) given[name] = value
    else if (Array.isArray(held)) held.push(value)
    else given[name] = [held, value]
  }
  return given
}

export default async function pageQuery(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const roots = resolveRoots()
  if (parsed.boolean("--list")) {
    process.stdout.write(`${queryNames(roots).join("\n")}\n`)
    return
  }
  const name = parsed.string("--name")
  if (name === undefined || name === "") {
    throw inputError("name a page query with --name, or ask for --list")
  }
  const answered = answerNamed(roots, name, givenIn(parsed.repeated("--arg")))
  if (answered === null) {
    throw inputError(`no page query is named ${name}, and \`--list\` prints those that are`)
  }
  if (isRefused(answered)) throw inputError(answered.refused)
  if (answered.faults.length > 0) throw inputError(answered.faults.join(" — and "))
  if (answered.absent.length > 0) {
    const pageType = namedQuery(roots, name)?.pageType ?? name
    throw inputError(absentSays(pageType, answered.absent))
  }
  process.stdout.write(`${JSON.stringify(answered)}\n`)
}
