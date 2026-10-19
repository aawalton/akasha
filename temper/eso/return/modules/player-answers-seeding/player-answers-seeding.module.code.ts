import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { PLAYER_ANSWERS_VERSION } from "akasha/temper/capture/player-answer/modules/player-answer-descriptor/player-answer-descriptor.module.code.ts"
import type { EngineAnswer } from "akasha/temper/capture/shape/modules/engine-answer-catalog/engine-answer-catalog.module.code.ts"
import { luaStringLiteral } from "akasha/temper/eso/lua-runner/modules/lua-marshal/lua-marshal.module.code.ts"
import { listedIn } from "akasha/temper/eso/return/modules/engine-answers-reading/engine-answers-reading.module.code.ts"

type PlayerAnswers = Readonly<Record<string, Readonly<Record<string, readonly EngineAnswer[]>>>>

type Captured = Readonly<Record<string, unknown>> | undefined

function readable(catalog: Captured): Readonly<Record<string, unknown>> | null {
  return catalog?.version === PLAYER_ANSWERS_VERSION ? catalog : null
}

type PlayerScreen = { readonly width: number; readonly height: number }

export function playerScreenIn(catalog: Captured): PlayerScreen | null {
  const held = readable(catalog)
  const width = held?.screenWidth
  const height = held?.screenHeight
  return typeof width === "number" && typeof height === "number" ? { width, height } : null
}

export function playerAnswersIn(catalog: Captured): PlayerAnswers | null {
  const answers = readable(catalog)?.answers
  if (!isRecord(answers)) return null
  const found: Record<string, Record<string, readonly EngineAnswer[]>> = {}
  for (const key of Object.keys(answers).sort()) {
    const named = answers[key]
    if (!isRecord(named)) continue
    const into: Record<string, readonly EngineAnswer[]> = {}
    for (const name of Object.keys(named).sort()) {
      const got = named[name]
      if (isRecord(got)) into[name] = listedIn(got)
    }
    found[key] = into
  }
  return found
}

function answerLua(one: EngineAnswer): string {
  return typeof one === "string" ? luaStringLiteral(one) : String(one)
}

const OF_THE_MOMENT: ReadonlySet<string> = new Set([
  "CanReplayLastInteractVO",
  "GetInteractionType",
  "HasActiveEditControl",
  "IsGameCameraInteractableUnitMonster",
  "IsGameCameraUIModeActive",
  "IsInteractVOPlaying",
  "IsInteracting",
  "IsInteractingWithMyAssistant",
  "IsInteractionCameraActive",
  "IsInteractionUsingInteractCamera",
  "IsPlayerInteractingWithObject",
  "IsReticleHidden",
])

const OPEN_NOW = /^Is[A-Za-z]*Open$/

function ofTheMoment(name: string): boolean {
  return OF_THE_MOMENT.has(name) || OPEN_NOW.test(name)
}

function keyLua(key: string, named: Readonly<Record<string, readonly EngineAnswer[]>>): string {
  const rows = Object.keys(named)
    .filter((name) => !ofTheMoment(name))
    .map((name) => `[${luaStringLiteral(name)}]={${(named[name] ?? []).map(answerLua).join(",")}}`)
  return `[${luaStringLiteral(key)}]={${rows.join(",")}}`
}

const HOLDING = `function __ui_player_answers(given)
  __ui_player_answers_held = __ui_player_answers_held or {}
  for key, named in pairs(given) do
    local into = __ui_player_answers_held[key] or {}
    for name, got in pairs(named) do into[name] = got end
    __ui_player_answers_held[key] = into
  end
end`

const SETTING = `local byName = {}
for key, named in pairs(__ui_player_answers_held or {}) do
  for name, got in pairs(named) do
    byName[name] = byName[name] or {}
    byName[name][key] = got
  end
end
__ui_player_answers_held = nil
local count = 0
__ui_player_answered = {}
for name, byKey in pairs(byName) do
  __ui_player_answered[name] = true
  local was = _G[name]
  _G[name] = function(...)
    local joined, key = pcall(table.concat, { ... }, ",")
    local got = joined and byKey[key] or nil
    if got ~= nil then return unpack(got) end
    if was ~= nil then return was(...) end
  end
  count = count + 1
end
return count`

export function playerAnswersLua(held: PlayerAnswers, perChunk: number): readonly string[] {
  const keys = Object.keys(held)
  const chunks: string[] = [HOLDING]
  for (let at = 0; at < keys.length; at += perChunk) {
    const written = keys.slice(at, at + perChunk).map((key) => keyLua(key, held[key] ?? {}))
    chunks.push(`__ui_player_answers({${written.join(",")}})`)
  }
  chunks.push(SETTING)
  return chunks
}
