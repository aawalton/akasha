"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { resolveToggle } from "@akasha/temper-build-support/automation-settings"

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
