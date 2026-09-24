import { readFileSync } from "node:fs"
import { join } from "node:path"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import type { EngineAnswer } from "akasha/temper/capture/shape/modules/engine-answer-catalog/engine-answer-catalog.module.code.ts"
import { luaStringLiteral } from "akasha/temper/eso/lua-runner/modules/lua-marshal/lua-marshal.module.code.ts"
import type { EngineAnswers } from "akasha/temper/eso/return/modules/engine-answers-reading/engine-answers-reading.module.code.ts"
import { z } from "zod"

export const ANSWERS_AT =
  "temper/eso/return/modules/engine-answers/engine-answers.data-table.data.json"

const ANSWER_LIST_SCHEMA = z.array(z.union([z.number(), z.string(), z.boolean()]))

const ENGINE_ANSWERS_SCHEMA = z.object({
  apiVersion: z.number(),
  answers: z.record(z.string(), ANSWER_LIST_SCHEMA),
  answersGiven: z.record(z.string(), z.record(z.string(), ANSWER_LIST_SCHEMA)),
})

export function engineAnswersTable(root: string = akashaRoot()): EngineAnswers {
  return ENGINE_ANSWERS_SCHEMA.parse(JSON.parse(readFileSync(join(root, ANSWERS_AT), "utf8")))
}

function answerLua(one: EngineAnswer): string {
  if (typeof one === "string") return luaStringLiteral(one)
  return String(one)
}

const ASKED_WITH = `local function asked(was, held)
  return function(...)
    local got = held[table.concat({ ... }, ",")]
    if got ~= nil then return unpack(got) end
    if was ~= nil then return was(...) end
  end
end
`

function listLua(given: readonly EngineAnswer[]): string {
  return given.map(answerLua).join(",")
}

function askedWithLua(
  name: string,
  byGiven: Readonly<Record<string, readonly EngineAnswer[]>>
): string {
  const rows = Object.keys(byGiven)
    .sort()
    .map((key) => `[${luaStringLiteral(key)}]={${listLua(byGiven[key] ?? [])}}`)
  return `[${luaStringLiteral(name)}]=asked(${name},{${rows.join(",")}})`
}

export function answersLua(held: EngineAnswers): string {
  const plain = Object.keys(held.answers)
    .sort()
    .map(
      (name) =>
        `[${luaStringLiteral(name)}]=function() return ${listLua(held.answers[name] ?? [])} end`
    )
  const withValues = Object.keys(held.answersGiven)
    .sort()
    .map((name) => askedWithLua(name, held.answersGiven[name] ?? {}))
  return `${ASKED_WITH}__eso_constants({${[...plain, ...withValues].join(",")}})`
}
