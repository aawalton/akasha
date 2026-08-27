import { asBoolean, asCallback, asNumber, asRecord, asString, asTooltipControl } from "../casts"
import { Internal, Public } from "../internal/state"
import type { TooltipExtensionInstance } from "../shape"

const Controls = Internal.controls

Public.InitializeTooltip = (control?: TooltipControl): TooltipControl => {
  const c = control ?? ExtendedJournalItemTooltip
  if (Internal.initialized) {
    InitializeTooltip(c, Controls.frame, TOPRIGHT, -100, 0, TOPLEFT)
  }
  return c
}

Public.ItemTooltip = (item: unknown, control?: TooltipControl): TooltipControl => {
  const c = Public.InitializeTooltip(control)
  if (type(item) === "string") {
    c.SetLink(asString(item))
  } else if (type(item) === "table") {
    const itemRecord = asRecord(item)
    if (type(itemRecord.collectibleId) === "number") {
      c.SetCollectible(asNumber(itemRecord.collectibleId), true, false)
    } else if (type(itemRecord.antiquityId) === "number") {
      const antiquityId = asNumber(itemRecord.antiquityId)
      if (GetAntiquitySetId(antiquityId) === 0) {
        c.SetAntiquityLead(antiquityId)
      } else {
        c.SetAntiquitySetFragment(antiquityId)
      }
    }
  }
  return c
}

const Extensions: Record<string, TooltipExtensionInstance | undefined> = {}

function TooltipExtensionAcquire(this: void, name?: string): TooltipExtensionInstance {
  const key = name ?? "Default"
  let ext = Extensions[key]
  if (ext === undefined) {
    ext = ExtendedJournalTooltipExtension.New(key)
    Extensions[key] = ext
  }
  return ext
}

Public.TooltipExtensionInitialize = (
  showDivider: boolean,
  textLeft?: string,
  textRight?: string,
  name?: string,
  appendExisting?: boolean
): TooltipExtensionInstance =>
  TooltipExtensionAcquire(name).Initialize(showDivider, textLeft, textRight, appendExisting)

Public.TooltipExtensionAddSection = (...args: unknown[]): undefined => {
  const textHeader = args[0] === undefined ? undefined : asString(args[0])
  const textBody = args[1] === undefined ? undefined : asString(args[1])
  const alignBody = args[2] === undefined ? undefined : asNumber(args[2])
  TooltipExtensionAcquire().AddSection(textHeader, textBody, alignBody)
}

Public.TooltipExtensionFinalize = (...args: unknown[]): undefined => {
  const flag = args[1]
  const showEmptyOrUnloadCallback =
    type(flag) === "function"
      ? asCallback(flag)
      : type(flag) === "boolean"
        ? asBoolean(flag)
        : undefined
  TooltipExtensionAcquire().Finalize(asTooltipControl(args[0]), showEmptyOrUnloadCallback)
}
