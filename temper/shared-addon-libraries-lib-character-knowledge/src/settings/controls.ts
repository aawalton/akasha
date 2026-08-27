import { asRecord } from "../casts"
import { Internal } from "../internal/state"
import type { Account, CharId, Server } from "../types"

Internal.SettingsBuildOptionsList = function (
  this: void,
  min: number,
  max: number,
  labelFunc: (this: void, i: number, min: number, max: number) => string
): LuaMultiReturn<[number[], string[], number[], string[]]> {
  const values: number[] = [0]
  const labels: string[] = [GetString(SI_LCK_SETTINGS_USE_DEFAULT)]
  const valuesND: number[] = []
  const labelsND: string[] = []

  for (let i = min; i <= max; i++) {
    const label = labelFunc(i, min, max)
    values.push(i)
    labels.push(label)
    valuesND.push(i)
    labelsND.push(label)
  }

  return $multi(values, labels, valuesND, labelsND)
}

type LooseBase = Record<string, unknown>

Internal.SettingsBuildControlCluster = function (
  this: void,
  options: Record<string, { values: number[]; labels: string[] }>,
  server?: Server,
  account?: Account,
  charId?: CharId
): unknown[] {
  let canMinimize = true
  let showEnabled = 0
  let showExport = false
  let showDefaultPriority = true
  let diabledFunc: ((this: void) => boolean) | undefined

  let base: LooseBase
  let key: string

  if (server === undefined) {
    canMinimize = false
    showDefaultPriority = false
    base = asRecord(Internal.vars)
    key = "defaults"
  } else if (charId !== undefined) {
    showEnabled = 2
    showExport = true
    base = asRecord(asRecord(Internal.characters[server])[charId])
    key = "settings"
    diabledFunc = function (this: void): boolean {
      return !Internal.IsCharacterEnabled(server, charId)
    }
  } else {
    base = asRecord(Internal.accounts[server])
    if (account !== undefined) {
      showEnabled = 1
      key = account
    } else {
      key = "defaults"
    }
  }

  const getFunc = function (
    this: void,
    setting: string,
    defaultValue: number
  ): (this: void) => number {
    return function (this: void): number {
      const slot = base[key]
      if (slot !== undefined) {
        const stored = asRecord(slot)[setting]
        if (stored !== undefined) {
          return asNumberValue(stored)
        }
      }
      return defaultValue
    }
  }

  const setFunc = function (
    this: void,
    setting: string,
    defaultValue: number,
    characterListChanged?: boolean
  ): (this: void, value: number) => void {
    return function (this: void, value: number): undefined {
      if (base[key] === undefined) {
        base[key] = {}
      }
      asRecord(base[key])[setting] = value !== defaultValue || !canMinimize ? value : undefined
      const [firstKey] = next(asRecord(base[key]))
      if (canMinimize && firstKey === undefined) {
        base[key] = undefined
      }
      Internal.NotifyRefresh(characterListChanged)
    }
  }

  const isDefaultPriority = function (this: void): boolean {
    const fn = getFunc("priority", 0)
    return fn() === 0
  }

  const controls: Record<string, unknown>[] = []

  if (showEnabled > 0) {
    let choiceType: string
    let defaultValue: number
    if (showEnabled === 1) {
      choiceType = "enabledND"
      defaultValue = 1
    } else {
      choiceType = "enabled"
      defaultValue = 0
    }
    const enabledOption = asOptionSet(options[choiceType])
    controls.push({
      type: "dropdown",
      name: SI_ADDON_MANAGER_ENABLED,
      choices: enabledOption.labels,
      choicesValues: enabledOption.values,
      getFunc: getFunc("enabled", defaultValue),
      setFunc: setFunc("enabled", defaultValue, true),
    })
  }

  for (const [_index, category] of ipairs(Internal.Categories)) {
    const trackingOption = asOptionSet(options["tracking"])
    controls.push({
      type: "dropdown",
      name: Internal.CategoryLabels[category],
      choices: trackingOption.labels,
      choicesValues: trackingOption.values,
      getFunc: getFunc(category, 0),
      setFunc: setFunc(category, 0),
      disabled: diabledFunc,
    })
  }

  const scribingOption = asOptionSet(options["scrib_res"])
  controls.push({
    type: "dropdown",
    name: Internal.CategoryLabels[Internal.CATEGORY_SCRIBING],
    choices: scribingOption.labels,
    choicesValues: scribingOption.values,
    getFunc: getFunc(Internal.CATEGORY_SCRIBING, 0),
    setFunc: setFunc(Internal.CATEGORY_SCRIBING, 0),
    disabled: diabledFunc,
  })

  const researchOption = asOptionSet(options["scrib_res"])
  controls.push({
    type: "dropdown",
    name: Internal.CategoryLabels[Internal.CATEGORY_RESEARCH],
    choices: researchOption.labels,
    choicesValues: researchOption.values,
    getFunc: getFunc(Internal.CATEGORY_RESEARCH, 0),
    setFunc: setFunc(Internal.CATEGORY_RESEARCH, 0),
    disabled: diabledFunc,
  })

  if (showDefaultPriority) {
    controls.push({
      type: "checkbox",
      name: SI_LCK_SETTINGS_PRIORITY_DEFAULT,
      getFunc: isDefaultPriority,
      setFunc: function (this: void, enabled: boolean): undefined {
        const fn = setFunc("priority", 0, true)
        fn(enabled ? 0 : Internal.PRIORITY_RANK_DEFAULT)
      },
      disabled: diabledFunc,
      tooltip: SI_LCK_SETTINGS_PRIORITY_HELP,
    })
  }

  controls.push({
    type: "slider",
    name: SI_LCK_SETTINGS_PRIORITY,
    min: 1,
    max: Internal.PRIORITY_RANKS,
    step: 1,
    clampInput: true,
    getFunc: getFunc("priority", 0),
    setFunc: setFunc("priority", 0, true),
    disabled: function (this: void): boolean {
      if (diabledFunc?.()) {
        return true
      } else if (showDefaultPriority) {
        return isDefaultPriority()
      } else {
        return false
      }
    },
    tooltip: SI_LCK_SETTINGS_PRIORITY_HELP,
  })

  if (showExport) {
    controls.push({
      type: "checkbox",
      name: SI_LCK_SETTINGS_EXPORT,
      getFunc: function (this: void): boolean {
        return base["export"] === true
      },
      setFunc: function (this: void, enabled: boolean): undefined {
        base["export"] = enabled === true ? true : undefined
        const exportControl = LCK_ExportSelected
        if (
          exportControl !== undefined &&
          asExportSelectedControl(exportControl).button !== undefined
        ) {
          asExportButton(asExportSelectedControl(exportControl).button).SetText(
            Internal.GetExportSelectedText()
          )
        }
      },
      disabled: diabledFunc,
    })
  }

  return controls
}

type NumberValue = number
function asNumberValue(value: unknown): NumberValue {
  return value as NumberValue
}

type OptionSet = { values: number[]; labels: string[] }
function asOptionSet(value: OptionSet | undefined): OptionSet {
  return value as OptionSet
}

interface ExportButton {
  SetText: (this: ExportButton, text: string) => void
}

interface ExportSelectedControl {
  button?: ExportButton
}

function asExportSelectedControl(value: unknown): ExportSelectedControl {
  return value as ExportSelectedControl
}

function asExportButton(value: ExportButton | undefined): ExportButton {
  return value as ExportButton
}
