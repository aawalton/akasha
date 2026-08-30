import { contextTokensOf, modelOf } from "./seat-usage.ts"

const agent = process.argv[2] ?? ""
const model = agent === "" ? null : modelOf(agent)
const tokens = agent === "" ? null : contextTokensOf(agent)

if (model === null && tokens === null) {
  process.stdout.write("{}\n")
} else {
  const read = tokens?.at ?? model?.at ?? null
  process.stdout.write(
    `${JSON.stringify({
      agent_id: agent,
      model: model?.value ?? null,
      context_tokens: tokens === null ? null : Number(tokens.value),
      read_at: read === null ? null : new Date(read).toISOString(),
    })}\n`
  )
}
