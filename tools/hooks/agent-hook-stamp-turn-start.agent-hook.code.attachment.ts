
import { fromHook } from "../lib/seat-turn-hook.ts"
import { setWorking } from "../lib/seat-turn-working.ts"

await fromHook((agent) => {
  setWorking(agent, { "active-turn": true })
})
