"use client"

import {
  MultiSelect,
  type MultiSelectItem,
} from "akasha/design/interface/form/modules/multi-select/multi-select.module.code.tsx"
import { InputPanelCard } from "akasha/design/interface/pattern/modules/input-panel-card/input-panel-card.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import {
  type CompanionBaseRoleId,
  companionBaseRoles,
  isCompanionBaseRoleId,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
import type { CompanionState } from "akasha/temper/catalog/companion/companions-core/modules/companion-types/companion-types.module.code.ts"
import {
  type CompanionId,
  companions,
} from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionPanelCompanion } from "akasha/temper/web/phrase/pages/companion-panel-companion.temper-web-phrase.ts"
import { companionPanelRoleFromLive } from "akasha/temper/web/phrase/pages/companion-panel-role-from-live.temper-web-phrase.ts"
import { companionPanelRoles } from "akasha/temper/web/phrase/pages/companion-panel-roles.temper-web-phrase.ts"
import { companionPanelSelectCompanion } from "akasha/temper/web/phrase/pages/companion-panel-select-companion.temper-web-phrase.ts"
import { companionPanelSelectRoles } from "akasha/temper/web/phrase/pages/companion-panel-select-roles.temper-web-phrase.ts"

interface CompanionPanelProps {
  companion: CompanionState["companion"]
  onUpdateCompanion: (updates: Partial<CompanionState["companion"]>) => void
  readOnly?: boolean
  roleReadOnly?: boolean
}

function toRoleIds(items: readonly MultiSelectItem[]): readonly CompanionBaseRoleId[] {
  const ids: CompanionBaseRoleId[] = []
  for (const item of items) {
    if (isCompanionBaseRoleId(item.value)) ids.push(item.value)
  }
  return ids
}

export function CompanionPanel({
  companion,
  onUpdateCompanion,
  readOnly,
  roleReadOnly,
}: CompanionPanelProps) {
  const phrase = usePhrase()
  const companionLabel = phrase(companionPanelCompanion.slug)
  const roleItems: MultiSelectItem[] = companionBaseRoles().map((role) => ({
    value: role.id,
    label: role.name,
  }))
  const selectedRoleItems = roleItems.filter(
    (item) => isCompanionBaseRoleId(item.value) && companion.baseRoles.includes(item.value)
  )

  return (
    <InputPanelCard id="companion" collapsible title={companionLabel}>
      <InputPanelCard.Row label={companionLabel}>
        <Select
          value={companion.id}
          onValueChange={(value: CompanionId) => onUpdateCompanion({ id: value })}
          disabled={readOnly}
        >
          <SelectTrigger className="w-full min-w-0 max-w-[240px]" disabled={readOnly}>
            <SelectValue placeholder={phrase(companionPanelSelectCompanion.slug)}>
              {companions().data[companion.id]?.name}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {companions()
              .list.toSorted((a, b) => {
                if (a.id === "no-companion") return -1
                if (b.id === "no-companion") return 1
                return a.name.localeCompare(b.name)
              })
              .map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </InputPanelCard.Row>

      <InputPanelCard.Row
        label={phrase(companionPanelRoles.slug)}
        description={roleReadOnly ? phrase(companionPanelRoleFromLive.slug) : undefined}
      >
        <MultiSelect
          items={roleItems}
          value={selectedRoleItems}
          onSelect={(items) => onUpdateCompanion({ baseRoles: toRoleIds(items) })}
          caption={phrase(companionPanelSelectRoles.slug)}
          className="w-full min-w-0 max-w-[240px]"
          disabled={readOnly || roleReadOnly}
        />
      </InputPanelCard.Row>
    </InputPanelCard>
  )
}
