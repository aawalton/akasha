
import { readPayload, record, rejectUnknownFlags } from "./lib/payload.ts"
import { fail } from "./lib/command.ts"
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
  ["fromSeat", "--from-seat"],
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
    fail(`\`${stray.join("`, `")}\` names nothing a seat holds — this call takes ${KEYS.join(", ")}`)
  }
  return argv
}

async function main(): Promise<void> {
  rejectUnknownFlags(process.argv.slice(2), [], [])
  await run(argvFor(record(await readPayload("-"), "the payload")))
}

if (import.meta.main) await main()
