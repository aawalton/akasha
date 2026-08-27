import { asBoolean } from "./casts"
import { UpdateKeyStrip } from "./keybind-helpers"
import { getAccountSettings } from "./saved-variables"
import { PotMaker } from "./state"
import { ShowAnnoucement } from "./tooltip-helpers"

interface KeybindButtonDescriptor {
  name: (this: void) => string
  keybind: string
  callback: (this: void) => unknown
  visible: (this: void, keybindButtonDescriptor: KeybindButtonDescriptor) => boolean
  enabled: (this: void) => boolean
}

function isBound(this: void, keybind: string): boolean {
  const [keyCode] = GetHighestPriorityActionBindingInfoFromName(keybind, false)
  return keyCode !== KEY_INVALID
}

type KeybindStripDescriptorGroup = KeybindButtonDescriptor[] & { alignment: number }

function asKeybindStripDescriptorGroup(value: unknown): KeybindStripDescriptorGroup {
  return value as KeybindStripDescriptorGroup
}

function asModeBarButton(value: unknown): ModeBarButton {
  return value as ModeBarButton
}

function InitializeKeybindStripDescriptors(this: void): undefined {
  const buttons: KeybindButtonDescriptor[] = [
    {
      name: (): string =>
        PotMaker.resultListShown ? PotMaker.language.search_again : PotMaker.language.search,
      keybind: "POTIONMAKER_SEARCH",
      callback: (): unknown => {
        PlaySound(SOUNDS.DEFAULT_CLICK ?? "")
        if (PotMaker.resultListShown) {
          PotMaker.searchAgain()
          return undefined
        }
        PotMaker.startSearch()
        return undefined
      },
      visible: (keybindButtonDescriptor: KeybindButtonDescriptor): boolean =>
        isBound(keybindButtonDescriptor.keybind),
      enabled: (): boolean =>
        !ZO_CraftingUtils_IsPerformingCraftProcess() && PotMaker.loading.IsHidden(),
    },
    {
      name: (): string => GetString(SI_BINDING_NAME_POTIONMAKER_SEARCH_WRITS),
      keybind: "POTIONMAKER_SEARCH_WRITS",
      callback: (): unknown => {
        PlaySound(SOUNDS.DEFAULT_CLICK ?? "")
        return PotMaker.findWrits()
      },
      visible: (keybindButtonDescriptor: KeybindButtonDescriptor): boolean =>
        !PotMaker.resultListShown && isBound(keybindButtonDescriptor.keybind),
      enabled: (): boolean => !ZO_CraftingUtils_IsPerformingCraftProcess(),
    },
    {
      name: (): string => GetString(SI_BINDING_NAME_POTIONMAKER_SEARCH_FAVORITS),
      keybind: "POTIONMAKER_SEARCH_FAVORITS",
      callback: (): unknown => {
        PlaySound(SOUNDS.DEFAULT_CLICK ?? "")
        return PotMaker.findFavorites()
      },
      visible: (keybindButtonDescriptor: KeybindButtonDescriptor): boolean =>
        !PotMaker.resultListShown && isBound(keybindButtonDescriptor.keybind),
      enabled: (): boolean => !ZO_CraftingUtils_IsPerformingCraftProcess(),
    },
  ]
  const descriptor = asKeybindStripDescriptorGroup(buttons)
  descriptor.alignment = KEYBIND_STRIP_ALIGN_RIGHT

  PotMaker.keybindStripDescriptor = descriptor

  ZO_CraftingUtils_ConnectKeybindButtonGroupToCraftingProcess(PotMaker.keybindStripDescriptor)
  ZO_PreHook(ALCHEMY.modeBar.m_object, "SetClickedButton", (...args: unknown[]): unknown => {
    const button = args[1] === undefined ? undefined : asModeBarButton(args[1])
    const skipAnim = asBoolean(args[2])
    if (skipAnim === false) {
      const buttonDescriptor = button !== undefined ? button.GetDescriptor() : undefined
      UpdateKeyStrip(buttonDescriptor)
    }
    return undefined
  })
}

interface ModeBarButton {
  GetDescriptor: (this: ModeBarButton) => string
}

function initTraitLearned(this: void): undefined {
  function HookDisplayDiscoveredTraits(this: void, orgDialog: CraftingResultsControl): undefined {
    const orgDisplayDiscoveredTraits = orgDialog.DisplayDiscoveredTraits
    orgDialog.DisplayDiscoveredTraits = (...args: unknown[]): unknown => {
      const accountSettings = getAccountSettings()
      if (!accountSettings.suppressNewTraitDialog) {
        return orgDisplayDiscoveredTraits(...args)
      }
      const numLearnedTraits = GetNumLastCraftingResultLearnedTraits()

      for (const i of $range(1, numLearnedTraits)) {
        const [traitName, itemName, icon] = GetLastCraftingResultLearnedTraitInfo(i)
        const text = `${zo_iconFormat(icon, 32, 32)} ${zo_strformat(
          SI_TOOLTIP_ITEM_NAME,
          itemName
        )}: ${zo_strformat(SI_ALCHEMY_REAGENT_TRAIT_FORMATTER, traitName)}`
        ShowAnnoucement(text)
      }
      return undefined
    }
  }
  HookDisplayDiscoveredTraits(CRAFTING_RESULTS)
}

PotMaker.InitializeKeybindStripDescriptors = InitializeKeybindStripDescriptors
PotMaker.initTraitLearned = initTraitLearned
