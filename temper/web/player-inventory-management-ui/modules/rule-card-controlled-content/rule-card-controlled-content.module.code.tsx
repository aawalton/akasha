"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import type { ControlledRule } from "akasha/temper/items/rules/core/modules/inventory-rule-controlled/inventory-rule-controlled.module.code.ts"
import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { ControlledRuleConditions } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-controlled-conditions/rule-card-controlled-conditions.module.code.tsx"
import { formatDestination } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-destination-format/rule-card-destination-format.module.code.ts"
import { useRuleCardPhrases } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import { ruleCardControlledContentAnyCharacter } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-controlled-content-any-character.temper-rule-card-phrase.ts"
import { ruleCardControlledContentCurrentCharacter } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/rule-card-controlled-content-current-character.temper-rule-card-phrase.ts"
import { ChevronRight } from "lucide-react"

interface RuleCardControlledContentProps {
  rule: CategoryRule
  actionLabel: string
  path: readonly { id: string; name: string }[]
  controlled: ControlledRule
}

export function RuleCardControlledContent({
  rule,
  actionLabel,
  path,
  controlled,
}: RuleCardControlledContentProps) {
  const phrases = useRuleCardPhrases()
  return (
    <div inert className="flex flex-col gap-1.5">
      {}
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant="green" className="shrink-0">
          {actionLabel}
        </Badge>
        {rule.destination != null && (
          <>
            <ChevronRight className="size-3 text-tertiary" />
            <Badge variant="elevation-muted" className="shrink-0">
              {formatDestination(rule.destination)}
            </Badge>
          </>
        )}
        {rule.stockScope != null && rule.action === "stock" && (
          <>
            <ChevronRight className="size-3 text-tertiary" />
            <Badge variant="elevation-muted" className="shrink-0">
              {titleIn(
                phrases,
                rule.stockScope === "any-character"
                  ? ruleCardControlledContentAnyCharacter.key
                  : ruleCardControlledContentCurrentCharacter.key
              )}
            </Badge>
          </>
        )}
      </div>

      {}
      {path.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {path.map((node, i) => (
            <div key={node.id} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="size-3 text-tertiary" />}
              <Badge variant="elevation-muted" className="shrink-0">
                {node.name}
              </Badge>
            </div>
          ))}
          {controlled.displayCategoryLabel != null && (
            <div className="flex items-center gap-1">
              <ChevronRight className="size-3 text-tertiary" />
              <Badge variant="elevation-muted" className="shrink-0">
                {controlled.displayCategoryLabel}
              </Badge>
            </div>
          )}
        </div>
      )}

      {}
      {rule.conditions && <ControlledRuleConditions conditions={rule.conditions} />}
    </div>
  )
}
