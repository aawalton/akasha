"use client"

import { Progress } from "akasha/design/interface/primitive/modules/progress-bar/progress-bar.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { shoppingSearchProgressSearching } from "akasha/temper/web/phrase/pages/shopping-search-progress-searching.temper-web-phrase.ts"
import type { OptimizerState } from "akasha/temper/web/player-economics-ui/modules/shopping-optimizer-types/shopping-optimizer-types.module.code.ts"

export function ShoppingSearchProgress({ state }: { state: OptimizerState }) {
  const phrase = usePhrase()
  if (state.status === "searching") {
    return (
      <div className="flex flex-col gap-2 pt-3">
        <Progress value={state.progress} />
        <Text variant="caption">
          {phrase(shoppingSearchProgressSearching.slug, {
            done: state.searchCompleted,
            total: state.searchTotal,
          })}
        </Text>
      </div>
    )
  }
  const fault = state.error
  if (state.status === "error" && fault !== null) {
    return (
      <Text variant="caption" className="pt-2 text-orange">
        {"told" in fault ? fault.told : phrase(fault.phrase, fault.fills)}
      </Text>
    )
  }
  return null
}
