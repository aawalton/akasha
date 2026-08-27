import { keepSeatUsage, usageIn } from "./seat-usage.ts"

const agent = process.argv[2] ?? ""

if (agent !== "") {
  try {
    keepSeatUsage(agent, usageIn(JSON.parse(await Bun.stdin.text())))
  } catch {}
}
