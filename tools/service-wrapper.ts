import { basename, resolve } from "node:path"
import { resolveRoots } from "../repo/roots/roots"
import { alsoIn, commandIn, entryIn, namedIn, RESTART_EXIT } from "./lib/service-wrapper/command.ts"
import { digestOf, followFiles } from "./lib/service-wrapper/following.ts"
import { localClosure, REACHED_CEILING } from "./lib/service-wrapper/local-closure.ts"

const KILL_CEILING_MS = 10_000

const REFUSED_EXIT = 2

function matching(at: string, globs: readonly string[]): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of globs) {
    for (const rel of new Bun.Glob(one).scanSync({ cwd: at })) found.add(`${at}/${rel}`)
  }
  return found
}

const roots = resolveRoots()
const root = roots.instructions
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
const service = localClosure(resolve(root, entryRel), root)

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
