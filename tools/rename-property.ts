export const tool = {
  summary: "Rename a page property and every page the page type system says carries it",
  path: "page rename-property",
} as const

import { existsSync, readFileSync } from "node:fs"
import { escapedSpellings, textFiles } from "../repoint/mention"
import { anyRefused, render } from "../outcome/outcome"
import { diskFileTree } from "../page/file-tree.ts"
import { registryOf } from "../page/property/registry.ts"
import { rejectUnknownFlags, repoFlag } from "./lib/payload.ts"
import { agentId } from "./lib/read-record.ts"
import {
  applied,
  bodiesUnder,
  carriersOf,
  type Chains,
  type Composed,
  collidingTypes,
  DEFINING_REPO,
  currentMtime,
  definitionDestination,
  definitionsOf,
  freshlyDerived,
  frontmatterKeyAt,
  keyPatternOf,
  keyValuePatch,
  lineOf,
  lineTextAt,
  type Patch,
  rekeyedCarriers,
  type Site,
  sitesIn,
  termOf,
} from "./lib/rename-property.ts"
import { RENAME_PROPERTY_HELP } from "./lib/rename-property-help.ts"
import { surveyRename } from "../repoint/repoint"
import { type Roots } from "../page/page"
import { isDirty, resolveRoots, targetRepo, targetRoot } from "../repo/roots/roots"
import { fail, land, recordOwnRead } from "./lib/command.ts"

const TAKES_VALUE = [
  "--repo",
  "--page-type",
  "--old",
  "--new",
  "--also-from",
  "--leave",
  "--message",
  "--message-file",
]
const STANDALONE = ["--dry-run", "--all-sites"]

const SHOWN = 12

function flagOf(argv: readonly string[], name: string): string | null {
  const at = argv.indexOf(name)
  if (at === -1) return null
  const value = argv[at + 1]
  if (value === undefined) fail(`${name} needs a value`)
  return value
}

function allOf(argv: readonly string[], name: string): readonly string[] {
  const found: string[] = []
  argv.forEach((token, at) => {
    if (token !== name) return
    const value = argv[at + 1]
    if (value === undefined) fail(`${name} needs a value`)
    found.push(value)
  })
  return found
}

function first(lines: readonly string[]): readonly string[] {
  return lines.length > SHOWN ? [...lines.slice(0, SHOWN), `        and ${lines.length - SHOWN} more`] : lines
}

function main(): void {
  const argv = process.argv.slice(2)
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(RENAME_PROPERTY_HELP)
    return
  }
  rejectUnknownFlags(argv, TAKES_VALUE, STANDALONE)
  const roots: Roots = resolveRoots(repoFlag(argv))
  if (targetRepo(roots) !== DEFINING_REPO) {
    fail(`--repo ${targetRepo(roots)} — every page property definition stands in \`${DEFINING_REPO}\``)
  }
  const root = targetRoot(roots)
  if (!existsSync(`${root}/.git`)) fail(`${root} is not a git repo`)

  const onType = flagOf(argv, "--page-type")
  const old = flagOf(argv, "--old")
  const next = flagOf(argv, "--new")
  if (onType === null) {
    fail(
      "--page-type names the page type the property is declared on, and none was given — a property's " +
        "identity is page type plus key, so a call naming only a key names more than one property"
    )
    return
  }
  if (old === null) fail("--old names the key to rename, and none was given")
  if (next === null) fail("--new names what it becomes, and none was given")
  if (old === next) fail("--old and --new are identical, so this asks for no change")

  const tree = diskFileTree(roots)
  const types = registryOf(tree)
  const cache: Chains = new Map()
  if (!types.some((one) => one.slug === onType)) fail(`--page-type ${onType} names no page type standing here`)
  const pattern = keyPatternOf(tree, types)
  if (!pattern.test(next)) {
    fail(`--new ${next} is not a legal key, against the pattern \`${pattern.source}\` that \`key\` states of itself`)
  }

  const definitions = definitionsOf(tree, onType, old)
  const definition = definitions[0]
  if (definition === undefined) {
    fail(`no property definition declared on \`${onType}\` states \`key: ${old}\``)
    return
  }
  if (definitions.length > 1) {
    fail(
      `${definitions.length} definitions declared on \`${onType}\` state \`key: ${old}\`, which the unique key ` +
        `says cannot stand: ${definitions.join(", ")}`
    )
  }
  const clash = collidingTypes(types, tree, cache, onType, next)
  if (clash.length > 0) {
    fail(`\`${next}\` is already a key on \`${onType}\` or on a type beneath it: ${clash.join("; ")}`)
  }
  const destination = definitionDestination(definition, types, onType, next)
  if (destination === null) {
    fail(`${definition} carries no page type in its name, so nothing says what the definition it becomes is named`)
    return
  }
  const unmoved = destination === definition
  const landing = unmoved ? "rekeyed where it stands" : `moved to ${destination}`
  if (!unmoved && existsSync(`${root}/${destination}`))
    fail(`${destination} already exists — a move never overwrites`)

  const carrying = carriersOf(roots, types, tree, cache, onType, old)
  const away = carrying.filter((one) => one.repo !== DEFINING_REPO)
  if (away.length > 0) {
    fail(
      `${away.length} page(s) carrying \`${old}\` stand outside \`${DEFINING_REPO}\`, and one commit cannot span ` +
        `two repositories, so this refuses rather than renaming half of them:\n` +
        first(away.map((one) => `        ${one.repo}:${one.relPath}`)).join("\n")
    )
  }

  const leave = new Set(allOf(argv, "--leave"))
  const supplied = new Map<string, string>()
  for (const dir of allOf(argv, "--also-from")) {
    if (!existsSync(dir)) fail(`--also-from ${dir} names no directory`)
    for (const [relPath, body] of bodiesUnder(dir)) {
      if (!existsSync(`${root}/${relPath}`)) {
        fail(`--also-from ${dir} carries ${relPath}, which names no file in ${root} — a body replaces one there`)
      }
      const composedAt = currentMtime(dir, relPath) ?? 0
      const standing = currentMtime(root, relPath) ?? 0
      if (standing > composedAt) {
        fail(
          `${relPath} changed at ${new Date(standing).toISOString()}, after the body for it under ${dir} was ` +
            `composed at ${new Date(composedAt).toISOString()} — landing that body would drop whatever landed ` +
            `in between. Compose it again from the file as it stands`
        )
      }
      supplied.set(relPath, body)
    }
  }

  const onDisk = new Map([...textFiles(root)].map((one): [string, string] => [one.relPath, one.body]))
  const moves = unmoved ? new Map<string, string>() : new Map([[definition, destination]])
  const { entries: repointed, quarantined, escaped } = surveyRename(moves, roots)
  const composed = new Map(repointed.map((one): [string, string] => [one.relPath, one.body]))
  const notes = new Map(repointed.map((one): [string, readonly string[]] => [one.relPath, one.notes]))
  const bodyFor = (relPath: string): string =>
    composed.get(relPath) ?? onDisk.get(relPath) ?? readFileSync(`${root}/${relPath}`, "utf8")

  for (const [relPath, body] of supplied) composed.set(relPath, body)

  const carried = carrying.map((one) => (one.relPath === definition ? destination : one.relPath))
  const { patched, twice } = rekeyedCarriers(carried, bodyFor, new Set(supplied.keys()), old, next)
  if (twice.length > 0) fail(`a key stands once or not at all:\n${first(twice).join("\n")}`)
  for (const [relPath, body] of patched) composed.set(relPath, body)

  const moved = bodyFor(destination)
  const rekey = keyValuePatch(moved, destination, next)
  if (typeof rekey === "string") fail(rekey)
  composed.set(destination, applied(moved, [rekey as Patch]))

  const sites: Site[] = []
  for (const [relPath, disk] of onDisk) {
    if (relPath === definition || isDirty(relPath) || leave.has(relPath)) continue
    const body = composed.get(relPath) ?? disk
    const keyed = new Set(frontmatterKeyAt(body, old))
    for (const at of sitesIn(body, old)) {
      if (keyed.has(at)) continue
      sites.push({ relPath, line: lineOf(body, at), text: lineTextAt(body, at) })
    }
  }

  const entries: readonly Composed[] = [...composed]
    .filter(([relPath, body]) => relPath === destination || body !== onDisk.get(relPath))
    .map(([relPath, body]) => ({
      relPath,
      body,
      at: currentMtime(root, relPath),
      authored: relPath === destination || supplied.has(relPath),
    }))

  process.stderr.write(
    [
      `rename: \`${old}\` → \`${next}\` on \`${onType}\`, declared at ${definition}`,
      `        ${destination}  the definition, ${landing}`,
      `        ${carrying.length} page(s) carry the key, resolved through the page type system`,
      `        ${repointed.length} file(s) repointed by the move, ${entries.length} composed in all`,
      `        ${supplied.size} file(s) supplied under --also-from, ${leave.size} named under --leave`,
      ...first(
        repointed.flatMap((one) => (notes.get(one.relPath) ?? []).map((note) => `        ${one.relPath}:${note}`))
      ),
      ...(quarantined.length === 0
        ? []
        : [`        ${quarantined.length} reference(s) under \`dirty/\` name the moved path and were left as written`]),
    ].join("\n") + "\n"
  )
  const spelled = escapedSpellings(escaped)
  if (anyRefused([spelled])) {
    process.stderr.write(`${render([spelled]).join("\n")}\nnothing was written\n`)
    process.exit(1)
  }
  if (sites.length > 0) {
    const where = new Set(sites.map((one) => one.relPath))
    const listed = sites.map((one) => `        ${one.relPath}:${one.line}  ${one.text}`)
    process.stderr.write(
      `sites:  ${sites.length} spelling(s) of \`${old}\` stand in ${where.size} file(s) this call does not rewrite. ` +
        `A key reaches code as a string literal and nothing can prove one is this key rather than a ` +
        `word spelled the same, so nothing here substitutes bytes into them. Pages and readers land together or ` +
        `required reading resolves to nothing in between: compose a body for each outside the repo and name it under ` +
        `--also-from, or name the file under --leave. Every site is listed under --all-sites.\n` +
        (argv.includes("--all-sites") ? listed : first(listed)).join("\n") +
        "\nnothing was written\n"
    )
    process.exit(1)
  }
  const idle = [...leave].filter((relPath) => !onDisk.has(relPath) || sitesIn(bodyFor(relPath), old).length === 0)
  if (idle.length > 0) {
    process.stderr.write(`left:   ${idle.length} path(s) under --leave spell \`${old}\` nowhere: ${idle.join(", ")}\n`)
  }

  const agent = agentId()
  for (const one of entries) if (one.relPath !== destination) recordOwnRead(agent, one.relPath, roots)
  recordOwnRead(agent, definition, roots)

  const staleAuthored = entries.filter((one) => one.authored && currentMtime(root, one.relPath) !== one.at)
  if (staleAuthored.length > 0) {
    fail(
      `${staleAuthored.length} authored file(s) changed after this call read them, so landing the bodies composed ` +
        `for them would drop whatever landed in between — nothing was written; compose them again from the files ` +
        `as they stand:\n` +
        first(staleAuthored.map((one) => `        ${one.relPath}`)).join("\n")
    )
  }
  const { refreshed, rederived, gone } = freshlyDerived(entries, root, new Set(carried), moves, roots, old, next)
  if (rederived > 0 || gone > 0) {
    process.stderr.write(
      `fresh:  ${rederived} derived body(ies) taken again from files that changed while this call ran, ` +
        `${gone} gone and left alone\n`
    )
  }

  const messageFile = flagOf(argv, "--message-file")
  const message =
    messageFile !== null
      ? readFileSync(messageFile, "utf8").trim()
      : (flagOf(argv, "--message") ??
        `${DEFINING_REPO}: \`${old}\` becomes \`${next}\` on \`${onType}\`\n\n` +
          `${carrying.length} page(s) carrying the key, the definition ${landing}, ` +
          `and ${supplied.size} file(s) reading it`)
  const programDecided = new Set(entries.filter((one) => !one.authored).map((one) => one.relPath))
  land(roots, refreshed, message, argv.includes("--dry-run"), unmoved ? [] : [definition], [], programDecided)
  const term = termOf(moved)
  if (term !== null) {
    process.stderr.write(
      `owed:   ${destination} still reads **${term}** in \`# Definition\`, and nothing here rewrote it. A term is ` +
        `authored prose the sentence beside it is built around, so appending the new key's words to one turns a ` +
        `fragment into a claim the sentence contradicts as often as not. Read the two together and write the term ` +
        `yourself, or leave it where the old words still say what the line says.\n`
    )
  }
}

if (import.meta.main) main()
