import { keepSeatUsage, usageIn } from "@akasha/seat-system/seat-usage"

const agent = process.argv[2] ?? ""

if (agent !== "") {
  try {
    keepSeatUsage(agent, usageIn(JSON.parse(await Bun.stdin.text())))
  } catch {}
}
