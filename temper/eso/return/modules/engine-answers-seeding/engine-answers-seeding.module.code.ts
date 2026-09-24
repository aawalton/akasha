import { readFileSync } from "node:fs"
import { join } from "node:path"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import type { EngineAnswer } from "akasha/temper/capture/shape/modules/engine-answer-catalog/engine-answer-catalog.module.code.ts"
import { luaStringLiteral } from "akasha/temper/eso/lua-runner/modules/lua-marshal/lua-marshal.module.code.ts"
import type { EngineAnswers } from "akasha/temper/eso/return/modules/engine-answers-reading/engine-answers-reading.module.code.ts"

export const ANSWERS_AT =
  "temper/eso/return/modules/engine-answers/engine-answers.data-table.data.json"

export function engineAnswersTable(root: string = akashaRoot()): EngineAnswers {
  return JSON.parse(readFileSync(join(root, ANSWERS_AT), "utf8")) as EngineAnswers
}

function answerLua(one: EngineAnswer): string {
  if (typeof one === "string") return luaStringLiteral(one)
  return String(one)
}

export function answersLua(held: EngineAnswers): string {
  const written = Object.keys(held.answers)
    .sort()
    .map((name) => {
      const given = (held.answers[name] ?? []).map(answerLua).join(",")
      return `[${luaStringLiteral(name)}]=function() return ${given} end`
    })
  return `__eso_constants({${written.join(",")}})`
}
