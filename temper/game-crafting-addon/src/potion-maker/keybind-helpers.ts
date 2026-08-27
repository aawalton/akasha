import { PotMaker } from "./state"

type KeybindDescriptorArray = KeybindButtonGroupDescriptor[]
function asKeybindDescriptorArray(value: unknown): KeybindDescriptorArray {
  return value as KeybindDescriptorArray
}

export function UpdateKeyStrip(this: void, descriptor: string | undefined): undefined {
  const hasGroup = KEYBIND_STRIP.HasKeybindButtonGroup(
    asKeybindDescriptorArray(PotMaker.keybindStripDescriptor)
  )
  const needGroup =
    descriptor === PotMaker.descriptorPotion || descriptor === PotMaker.descriptorPoison
  if (hasGroup !== needGroup) {
    if (needGroup) {
      PushActionLayerByName(GetString(SI_KEYBINDINGS_LAYER_POTIONMAKER))
      KEYBIND_STRIP.AddKeybindButtonGroup(asKeybindDescriptorArray(PotMaker.keybindStripDescriptor))
    } else {
      KEYBIND_STRIP.RemoveKeybindButtonGroup(
        asKeybindDescriptorArray(PotMaker.keybindStripDescriptor)
      )
      RemoveActionLayerByName(GetString(SI_KEYBINDINGS_LAYER_POTIONMAKER))
    }
  }
}
