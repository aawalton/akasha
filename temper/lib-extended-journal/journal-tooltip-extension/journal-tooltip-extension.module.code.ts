import {
  asCallback,
  asControl,
  asLabelControl,
} from "../journal-casts/journal-casts.module.code.ts"
import type { TooltipExtensionInstance } from "../journal-shape/journal-shape.module.code.ts"
import { Public } from "../journal-state/journal-state.module.code.ts"

export interface TooltipExtensionClass {
  New: (this: TooltipExtensionClass, name: string) => TooltipExtensionInstance
  [key: string]: unknown
}

Public.TOOLTIP_VERSION = 5

export const ExtendedJournalTooltipExtension: TooltipExtensionClass =
  ZO_Object.Subclass<TooltipExtensionClass>()

ExtendedJournalTooltipExtension.New = function (
  this: TooltipExtensionClass,
  name: string
): TooltipExtensionInstance {
  const obj = ZO_Object.New<TooltipExtensionInstance>(this)

  obj.name = "ExtendedJournalTooltipExtension_" + name
  obj.control = WINDOW_MANAGER.CreateControlFromVirtual(
    obj.name,
    GuiRoot,
    "ExtendedJournalTooltipExtension"
  )
  obj.sections = [asControl(obj.control.GetNamedChild("Section"))]
  obj.index = 1

  obj.control.SetHandler("OnEffectivelyHidden", () => {
    obj.OnUnload()
  })

  return obj
}

ExtendedJournalTooltipExtension.GetSection = function (this: TooltipExtensionInstance): Control {
  const sections = this.sections
  const index = this.index
  this.index = index + 1

  while (index > sections.length) {
    const section = WINDOW_MANAGER.CreateControlFromVirtual(
      "$(parent)Section" + tostring(sections.length + 1),
      this.control,
      "ExtendedJournalTooltipSection"
    )
    section.SetAnchor(TOPLEFT, sections[sections.length - 1], BOTTOMLEFT, 0, 12)
    section.SetAnchor(RIGHT, undefined, undefined, undefined, undefined, ANCHOR_CONSTRAINS_X)
    sections.push(section)
  }
  return asControl(sections[index - 1])
}

ExtendedJournalTooltipExtension.Initialize = function (
  this: TooltipExtensionInstance,
  showDivider: boolean,
  textLeft?: string,
  textRight?: string,
  appendExisting?: boolean
): TooltipExtensionInstance {
  if (appendExisting !== true || this.loaded !== true) {
    this.OnUnload()
    const control = this.control
    asControl(control.GetNamedChild("Divider")).SetHidden(!showDivider)
    asLabelControl(control.GetNamedChild("Left")).SetText(textLeft ?? "")
    asLabelControl(control.GetNamedChild("Right")).SetText(textRight ?? "")
    this.index = 1
  }
  return this
}

ExtendedJournalTooltipExtension.AddSection = function (
  this: TooltipExtensionInstance,
  textHeader?: string,
  textBody?: string,
  alignBody?: number
): undefined {
  const control = this.GetSection()
  asLabelControl(control.GetNamedChild("Header")).SetText(textHeader ?? "")
  asLabelControl(control.GetNamedChild("Body")).SetText(textBody ?? "")
  asLabelControl(control.GetNamedChild("Body")).SetHorizontalAlignment(
    alignBody ?? TEXT_ALIGN_CENTER
  )
  control.SetHidden(false)
}

ExtendedJournalTooltipExtension.Finalize = function (
  this: TooltipExtensionInstance,
  tooltipControl: TooltipControl,
  showEmptyOrUnloadCallback?: boolean | ((this: void) => void)
): undefined {
  const control = this.control
  const sections = this.sections
  const index = this.index

  if (
    index > 1 ||
    (showEmptyOrUnloadCallback !== undefined && showEmptyOrUnloadCallback !== false)
  ) {
    for (let i = index; i <= sections.length; i++) {
      asControl(sections[i - 1]).SetHidden(true)
    }
    tooltipControl.AddControl(control)
    control.SetAnchor(TOP)
    this.unloadCallback =
      type(showEmptyOrUnloadCallback) === "function"
        ? asCallback(showEmptyOrUnloadCallback)
        : undefined
    this.loaded = true
  }
}

ExtendedJournalTooltipExtension.OnUnload = function (this: TooltipExtensionInstance): undefined {
  const callback = this.unloadCallback
  this.unloadCallback = undefined
  this.loaded = undefined
  if (callback !== undefined) {
    callback()
  }
}
