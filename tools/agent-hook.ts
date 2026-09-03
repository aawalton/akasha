import { existsSync } from "node:fs"
import { join, resolve } from "node:path"

// A BRIDGE FOR CLIENTS ALREADY RUNNING, NOT A DESIGN.
//
// The registration form `bun tools/agent-hook.ts <hook>` was landed and then withdrawn: Alan
// ruled that a hook is registered by the path to its file, and that `akasha move` rewrites the
// live settings documents when that path changes. Every settings document on disk now names hook
// files directly, and this file is named by none of them.
//
// It is here because a settings document is read once, at spawn. A client that started while the
// runner form was live holds that form in memory for the rest of its life, and deleting the file
// it names disarmed those clients' guards behind a non-blocking error — the same failure the
// runner was built to prevent, in the other direction.
//
// So this answers those frozen registrations until their seats are relaunched, and nothing else.
// Delete it once no running client names it. It resolves by a hard-coded path on purpose: it must
// not depend on an index, a package export, or anything else that a rename could take away.

const ROOT = resolve(import.meta.dir, "..")

const HOOKS_AT = join(ROOT, "akasha", "hook-system", "agent-hooks")

const TAIL = "agent-hook.code.ts"

const INPUT = 1

function refused(why: string): never {
  process.stdout.write(
    `${JSON.stringify({ decision: "block", reason: why, continue: false })}\n`
  )
  process.stderr.write(`${why}\n`)
  process.exit(2)
}

const named = process.argv[INPUT + INPUT]

if (named === undefined) {
  process.stderr.write("agent-hook.ts: name the hook to run\n")
  process.exit(1)
}

const at = join(HOOKS_AT, named, `${named}.${TAIL}`)

if (!existsSync(at)) {
  refused(
    [
      `agent-hook.ts: the hook \`${named}\` is registered and no file is at ${at},`,
      "so this call is refused rather than let through unguarded.",
      "",
      "This runner is a bridge for a client that started before hooks went back to being",
      "registered by path. Relaunch this seat and the registration will name the hook's file",
      "directly, which is what every settings document on disk now holds.",
    ].join("\n")
  )
}

// Hand the hook the command line a direct invocation would have given it. Several hooks read
// `Bun.argv[2]` for `--scope`, and `Bun.argv` is `process.argv`, so the runner's own argument is
// taken out before the hook is loaded.
process.argv.splice(INPUT + INPUT, INPUT)

// A hook file runs itself only under `import.meta.main`, which an import does not satisfy. So its
// `ran` export is called here. Leaving that out is what made the first draft of this bridge exit
// 0 on a call the hook refuses — a guard that answered nothing while reporting success.
const held: unknown = await import(at)

const ran = (held as { ran?: () => Promise<number> }).ran

if (typeof ran !== "function") {
  refused(
    `agent-hook.ts: the hook \`${named}\` at ${at} exports no \`ran\`, so it could not be run here.`
  )
}

process.exit(await ran())
