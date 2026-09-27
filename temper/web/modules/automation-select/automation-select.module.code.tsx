"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { resolveToggle } from "akasha/temper/player/character/build/build-support/modules/automation-settings/automation-settings.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { automationSelectAccountDefault } from "akasha/temper/web/phrase/pages/automation-select-account-default.temper-web-phrase.ts"
import { automationSelectOff } from "akasha/temper/web/phrase/pages/automation-select-off.temper-web-phrase.ts"
import { automationSelectOn } from "akasha/temper/web/phrase/pages/automation-select-on.temper-web-phrase.ts"

type AutomationToggleValue = "on" | "off" | "account-default"

function toToggleValue(value: boolean | undefined): AutomationToggleValue {
  if (value === true) return "on"
  if (value === false) return "off"
  return "account-default"
}

function fromToggleValue(value: AutomationToggleValue): boolean | undefined {
  if (value === "on") return true
  if (value === "off") return false
  return undefined
}

interface AutomationSelectProps {
  value: boolean | undefined
  globalValue: boolean | undefined
  onChange: (enabled: boolean | undefined) => void
}

export function AutomationSelect({ value, globalValue, onChange }: AutomationSelectProps) {
  const surface = useSurface()
  const selectValue = toToggleValue(value)
  const phrase = usePhrase()
  const on = phrase(automationSelectOn.slug)
  const off = phrase(automationSelectOff.slug)
  const resolvedLabel = resolveToggle(undefined, globalValue) ? on : off

  return (
    <Select<AutomationToggleValue>
      value={selectValue}
      onValueChange={(v) => onChange(fromToggleValue(v))}
    >
      <SelectTrigger className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem<AutomationToggleValue> value="on">{on}</SelectItem>
        <SelectItem<AutomationToggleValue> value="off">{off}</SelectItem>
        <SelectItem<AutomationToggleValue> value="account-default">
          {phrase(automationSelectAccountDefault.slug, { setting: resolvedLabel })}
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
