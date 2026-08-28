"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/design-primitives/components/select"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { resolveToggle } from "@temper/shared-engine/automation/automation-settings-types"

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
  const resolvedLabel = resolveToggle(undefined, globalValue) ? "On" : "Off"

  return (
    <Select<AutomationToggleValue>
      value={selectValue}
      onValueChange={(v) => onChange(fromToggleValue(v))}
    >
      <SelectTrigger className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem<AutomationToggleValue> value="on">On</SelectItem>
        <SelectItem<AutomationToggleValue> value="off">Off</SelectItem>
        <SelectItem<AutomationToggleValue> value="account-default">
          {resolvedLabel} (Account Default)
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
