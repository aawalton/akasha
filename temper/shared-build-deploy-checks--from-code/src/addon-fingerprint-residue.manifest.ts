export interface RetiredFingerprintToken {
  readonly token: string
  readonly reason: string
}

export const RETIRED_FINGERPRINT_TOKENS: Record<string, readonly RetiredFingerprintToken[]> = {
  TemperCharacters: [
    {
      token: "LibTableFunctions",
      reason:
        "LibTableFunctions upstream library identity retired from the consumer — the folded USPF skill-point-finder feature's 16 call sites were renamed to the TemperTableFunctions global in the same change that renamed the library itself (#16116); any surviving occurrence is a partial rename",
    },
  ],
  TemperCrafting: [
    {
      token: "@code65536",
      reason:
        "MWIM upstream author @code65536 retired from the LAM settings-panel UI (#14325 CR2-4 silo-1); provenance kept in the addon CLAUDE.md, not code",
    },
    {
      token: "WritWorthy",
      reason:
        "WritWorthy upstream brand retired from code — the folded writ-tooltip global renamed to TemperWrit and /writworthy→/temperwrit (#14325 CR2-4 silo-2); provenance kept in the addon CLAUDE.md. SV WritWorthyVars is KEEP-listed below, which is what spares it now that the token matches by bytes (#18372)",
    },
    {
      token: "PotionMaker",
      reason:
        "PotionMaker upstream brand retired from code — the folded alchemy control names + scene/descriptor identity renamed to TemperPotions and /potionmaker→/temperpotions (#14325 CR2-4 silo-3); author-constant COLOR_KHRILLSELECT→COLOR_SELECT + author strings retired. KEPT (KEEP-listed below): SV TemperPotionMaker_SavedVariables (byte-locked), spared by the keep mask now that the token matches by bytes (#18372), and the PotMaker global (MultiCraft), which does not carry these bytes at all. The upstream file PotionMaker100015.lua survives only in comments, which are stripped; the uppercase POTIONMAKER_* keybind ids (Bindings.xml, live/rebindable) are case-distinct and not matched",
    },
    {
      token: "CraftStore",
      reason:
        'CraftStore upstream brand retired from code — the folded core\'s error/chat/window display strings + lang labels renamed to TemperCrafting, /cs·/craftstore·/cs*→/tempercraft·/tc·/tc* and /csoptions→/tcoptions, Title/keybind-category display→"Temper Crafting", CraftStore{Api,State,ControlData}→TemperCrafting*, IsItemStoredForCraftStore→...ForTemperCrafting, author string (AlphaLemming/BlackSwan/Rhyono/MuMuQ) retired (#14325 CR2-4 silo-4). KEPT (KEEP-listed below): _G.TemperCrafting global/Name + TemperCrafting_GetSlotHandlerStats + SV globals. The upstream files CraftStore*.lua (comments), the uppercase CRAFTSTORE_* keybind ids + SI_BINDING_NAME_CRAFTSTORE (Bindings.xml, live/rebindable, case-distinct), and the internal event namespace "CSEE"/debug global _CS (upstream abbreviations, not the bare token) are not matched',
    },
    {
      token: "CraftStoreFixed",
      reason:
        "CraftStoreFixed upstream control/font prefix retired from code — all 135 CraftStoreFixed_* control names + CraftStoreFixedFont/Insp fonts (XML name=/relativeTo=/font=, ambient .d.ts decls, template + literal control-name strings) renamed to TemperCrafting_* / TemperCraftingFont / TemperCraftingInsp, in lockstep with the cross-package crash-attribution regex crash-signatures.ts (#14325 CR2-4 silo-4). Since #18372 a token matches by bytes, so a surviving CraftStoreFixed_* site is reported under this rule AND under the bare CraftStore one — the same partial rename, named twice, which is the honest reading of a site that carries both retired brands. The commented-out upstream CraftStoreFixed_Flask/_Furnisher provenance (unreleased, never ported) is comment-only and not matched",
    },
  ],
  TemperTableFunctions: [
    {
      token: "LibTableFunctions",
      reason:
        "LibTableFunctions upstream library identity retired from code — the port took Temper identity under Alan's no-third-party-add-ons ruling (#16116): addon name and published global both renamed to TemperTableFunctions, addonVersion 101→100, and the consumer's dependency edge lost its version floor. Provenance is not kept anywhere in code, so any surviving occurrence is residue; the bare token also matches the LibTableFunctions-1.0 spelling, and since #18372 every compound carrying its bytes besides",
    },
  ],
}

export interface KeepNameException {
  readonly name: string
  readonly consumer: string
}

export const KEEP_NAME_EXCEPTIONS: Record<string, readonly KeepNameException[]> = {
  TemperCrafting: [
    {
      name: "_G.TemperCrafting",
      consumer:
        "native ESO panel-control binding + CraftStoreFixed_* inline XML handlers + Bindings.xml + LAM panel id — the clobber-restore invariant (rename silently breaks render)",
    },
    {
      name: "PotMaker",
      consumer:
        "external MultiCraft integration: PotMaker.SelectPotionOfWrit + PotionMaker.xml inline handlers",
    },
    {
      name: "TemperCrafting_GetSlotHandlerStats",
      consumer: "external: read by game/items/addon bank-trace",
    },
    {
      name: "TemperCrafting_Account",
      consumer:
        "SavedVariables global — byte-locked; SV renames are a separate data-migration concern",
    },
    {
      name: "TemperCrafting_Character",
      consumer:
        "SavedVariables global — byte-locked; SV renames are a separate data-migration concern",
    },
    {
      name: "TemperPotionMaker_SavedVariables",
      consumer:
        "SavedVariables global — byte-locked; SV renames are a separate data-migration concern",
    },
    {
      name: "WritWorthyVars",
      consumer:
        "SavedVariables global — byte-locked; SV renames are a separate data-migration concern",
    },
    {
      name: "TemperMasterWritInventoryMarker_SavedVariables",
      consumer:
        "SavedVariables global — byte-locked; SV renames are a separate data-migration concern",
    },
  ],
}
