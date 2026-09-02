import { basename, resolve } from "node:path"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { alsoIn, commandIn, entryIn, namedIn, RESTART_EXIT } from "./lib/service-wrapper/command.ts"
import { digestOf, followFiles } from "./lib/service-wrapper/following.ts"
import { type Closure, localClosure, REACHED_CEILING } from "./lib/service-wrapper/local-closure.ts"

const KILL_CEILING_MS = 10_000

const REFUSED_EXIT = 2

const CODE_FILE = /\.(ts|tsx|mts|cts)$/

// A code file saved half-written does not parse, so what it imports cannot be followed and the
// child dies at module load rather than on anything it read. That death is not the service giving
// up, so a code file that does not parse is waited on. What still does not parse past the ceiling
// is run on exactly as it stands, so giving up goes on saying what it says.
const PARSE_CEILING_MS = 60_000
const PARSE_POLL_MS = 1_000

function matching(at: string, globs: readonly string[]): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of globs) {
    for (const rel of new Bun.Glob(one).scanSync({ cwd: at })) found.add(`${at}/${rel}`)
  }
  return found
}

const roots = resolveRoots()
const root = rootFor(roots, AKASHA)
const said = process.argv.slice(2)
const command = commandIn(said)

if (command.length === 0) {
  console.error("service-wrapper: name the command to run, after `--`")
  process.exit(REFUSED_EXIT)
}

const entryRel = entryIn(command)

if (entryRel === null) {
  console.error(`service-wrapper: \`${command.join(" ")}\` names no \`.ts\` entry to follow`)
  process.exit(REFUSED_EXIT)
}

const says = `[wrapper ${basename(entryRel, ".ts")}]`

const under = (at: string): string => at.replace(`${root}/`, "")

const own = localClosure(resolve(root, "tools/service-wrapper.ts"), root)
const entry = resolve(root, entryRel)

const unparsedIn = (closure: Closure): readonly string[] =>
  closure.unscanned.filter((at) => CODE_FILE.test(at))

let service = localClosure(entry, root)
let unparsed = unparsedIn(service)

if (unparsed.length > 0) {
  const waitedOn = namedIn(unparsed, root)
  const seconds = PARSE_CEILING_MS / 1_000
  console.error(`${says} ${waitedOn} does not parse, so it is waited on for up to ${seconds}s`)
  const until = Date.now() + PARSE_CEILING_MS
  while (unparsed.length > 0 && Date.now() < until) {
    await Bun.sleep(PARSE_POLL_MS)
    service = localClosure(entry, root)
    unparsed = unparsedIn(service)
  }
  console.error(
    unparsed.length === 0
      ? `${says} ${waitedOn} parses now, so what it imports is followed`
      : `${says} ${waitedOn} still does not parse, so it is run on as it stands`
  )
}

for (const at of service.unscanned) {
  console.error(`${says} ${under(at)} could not be scanned, so what it imports is not followed`)
}

for (const one of service.unresolved) {
  console.error(
    `${says} ${under(one.file)} imports \`${one.path}\`, which resolves to no file, so nothing behind it is followed`
  )
}

if (service.stopped) {
  console.error(
    `${says} stopped at ${REACHED_CEILING} file(s), which is the ceiling; what stands past it is not followed`
  )
}

const also = matching(root, alsoIn(said))
const reached = new Set<string>([...own.files, ...service.files, ...also])
const before = digestOf(reached)

if (also.size > 0) {
  console.log(`${says} ${also.size} file(s) named by \`restarts-on\`, which no import reaches`)
}

const child = Bun.spawn([...command], {
  cwd: root,
  stdio: ["inherit", "inherit", "inherit"],
  env: process.env,
})

let restarting = false

console.log(`${says} following ${reached.size} file(s)`)

const following = followFiles(
  reached,
  (moved) => {
    if (restarting) return
    restarting = true
    console.error(`${says} ${namedIn(moved, root)} moved; restarting so it runs on what stands`)
    following.stop()
    child.kill("SIGTERM")
    setTimeout(() => child.kill("SIGKILL"), KILL_CEILING_MS)
  },
  undefined,
  before
)

for (const at of following.unfollowed) {
  console.error(`${says} ${under(at)} could not be watched, so what stands in it is not followed`)
}

for (const signal of ["SIGTERM", "SIGINT"] as const) {
  process.on(signal, () => {
    following.stop()
    child.kill(signal)
  })
}

const code = await child.exited

process.exit(restarting ? RESTART_EXIT : code)
