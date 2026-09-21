import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export const ADDON_NAME = "TemperCharacters"
export const SAVED_VARIABLES_NAME = "TemperCharacters_SavedVariables"

if (typeof ZO_CreateStringId === "function") {
  ZO_CreateStringId("SI_KEYBINDINGS_CATEGORY_TEMPER", "Temper")
  ZO_CreateStringId("SI_BINDING_NAME_TEMPER_TOGGLE_WINDOW", "Toggle Window")
}
