import { contextTokensOf, costUsdOf, modelOf } from "./seat-usage.ts"

const agent = process.argv[2] ?? ""
const model = agent === "" ? null : modelOf(agent)
const tokens = agent === "" ? null : contextTokensOf(agent)
const cost = agent === "" ? null : costUsdOf(agent)

if (model === null && tokens === null && cost === null) {
  process.stdout.write("{}\n")
} else {
  const read = cost?.at ?? tokens?.at ?? model?.at ?? null
  process.stdout.write(
    `${JSON.stringify({
      agent_id: agent,
      model: model?.value ?? null,
      context_tokens: tokens === null ? null : Number(tokens.value),
      total_cost_usd: cost === null ? null : Number(cost.value),
      read_at: read === null ? null : new Date(read).toISOString(),
    })}\n`
  )
}
