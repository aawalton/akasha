import { type SeatWhoami, seatWhoami } from "@akasha/seat-system/seat-whoami"
import { fail } from "./lib/command.ts"
import { readPayload, record, rejectUnknownFlags } from "./lib/payload.ts"
import { run } from "./seat.ts"

const VALUES: readonly (readonly [string, string])[] = [
  ["agent", "--agent"],
  ["persona", "--persona"],
  ["domain", "--domain"],
  ["role", "--role"],
  ["initiative", "--initiative"],
  ["flex", "--flex"],
  ["principal", "--principal"],
  ["mode", "--mode"],
  ["parentName", "--parent-name"],
  ["account", "--registration-account"],
]

const PRESENT: readonly (readonly [string, string])[] = [
  ["resolve", "--resolve"],
  ["name", "--name"],
  ["show", "--show"],
  ["default", "--default"],
  ["onCall", "--on-call"],
]

const MANY: readonly (readonly [string, string])[] = [
  ["clear", "--clear"],
  ["token", "--token"],
]

const KEYS: readonly string[] = [...VALUES, ...PRESENT, ...MANY].map(([key]) => key)

function scalar(value: unknown, key: string): string {
  if (typeof value === "string") return value
  if (typeof value === "number" && Number.isFinite(value)) return String(value)
  return fail(`\`${key}\` takes a string or a number`)
}

export function argvFor(payload: Record<string, unknown>): readonly string[] {
  const argv: string[] = []
  for (const [key, flag] of VALUES) {
    const value = payload[key]
    if (value === undefined || value === null) continue
    argv.push(flag, scalar(value, key))
  }
  for (const [key, flag] of PRESENT) {
    const value = payload[key]
    if (value === undefined || value === null || value === false) continue
    if (value !== true) fail(`\`${key}\` is either true or absent`)
    argv.push(flag)
  }
  for (const [key, flag] of MANY) {
    const value = payload[key]
    if (value === undefined || value === null) continue
    for (const one of Array.isArray(value) ? value : [value]) argv.push(flag, scalar(one, key))
  }
  const stray = Object.keys(payload).filter((key) => !KEYS.includes(key))
  if (stray.length > 0) {
    fail(
      `\`${stray.join("`, `")}\` names nothing a seat holds — this call takes ${KEYS.join(", ")}`
    )
  }
  return argv
}

const WHOAMI = "whoami"

const AGENT = "agent"

const ABSENT = "null"

// WHO A SEAT IS, ANSWERED AS A READ RATHER THAN THROUGH A COMMAND. The shell that launches a seat
// holds the agent id and nothing else — not the seat's name, so it cannot form a page path — and
// it needs the persona, domain and role that seat states before it can state them again. It asked
// `ops seat whoami` for that. This is the same read, `seatWhoami`, reached over the payload every
// other call out of that shell already takes, so the launch spawns one thing rather than two.
//
// ONE KEY PER LINE IS THE CONTRACT WITH THE CALLER, which pulls each attribute back out with
// `sed -n 's/^persona=//p'`. An attribute the seat does not state prints `null`, and the caller
// tests for that word by name before it states anything: a line left off would read as an empty
// value rather than an absent one, and the two are not the same answer.
function whoamiLines(held: SeatWhoami): string {
  return [
    `id=${held.id}`,
    `name=${held.name ?? ABSENT}`,
    `role=${held.role ?? ABSENT}`,
    `domain=${held.domain ?? ABSENT}`,
    `persona=${held.persona ?? ABSENT}`,
    `mode=${held.mode ?? ABSENT}`,
    `principal=${held.principal ?? ABSENT}`,
    `parentAgentId=${held.parentAgentId ?? ABSENT}`,
  ].join("\n")
}

// This reads a NAMED seat rather than the caller's own: the launcher asking is not the seat asked
// about, so there is no environment here to fall back to and an absent `agent` is refused.
function answerWhoami(payload: Record<string, unknown>): void {
  const stray = Object.keys(payload).filter((key) => key !== WHOAMI && key !== AGENT)
  if (stray.length > 0) {
    fail(
      `\`${WHOAMI}\` reads what a seat states and writes nothing, so it takes \`${AGENT}\` alone — ` +
        `\`${stray.join("`, `")}\` would state something`
    )
  }
  const agent = payload[AGENT]
  if (typeof agent !== "string" || agent === "") {
    fail(
      `\`${WHOAMI}\` needs an \`${AGENT}\` id — it answers for the seat named, not for the caller`
    )
  }
  const held = seatWhoami(agent)
  if (held === null) {
    fail(
      `no seat page stands for agent ${agent}, and this repository's history holds none either, ` +
        "so there is nothing that states who this seat is"
    )
  }
  process.stdout.write(`${whoamiLines(held)}\n`)
}

async function main(): Promise<void> {
  rejectUnknownFlags(process.argv.slice(2), [], [])
  const payload = record(await readPayload("-"), "the payload")
  if (payload[WHOAMI] === true) {
    answerWhoami(payload)
    return
  }
  await run(argvFor(payload))
}

if (import.meta.main) await main()
