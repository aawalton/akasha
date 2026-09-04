import "@akasha/temper-eso-types/eso-globals"

export const STRINGS: Record<string, string> = {
  SI_ICTHENEXTBOSS_AMONCRUL: "Amoncrul",
  SI_ICTHENEXTBOSS_THIRSK: "Baron Thirsk",
  SI_ICTHENEXTBOSS_GLORGOLOCH: "Glorgoloch the Destroyer",
  SI_ICTHENEXTBOSS_CHARR: "Immolator Charr",
  SI_ICTHENEXTBOSS_KHROGO: "King Khrogo",
  SI_ICTHENEXTBOSS_MALYGDA: "Lady Malygda",
  SI_ICTHENEXTBOSS_MAZALUHAD: "Mazaluhad",
  SI_ICTHENEXTBOSS_NUNATAK: "Nunatak",
  SI_ICTHENEXTBOSS_MATRON: "The Screeching Matron",
  SI_ICTHENEXTBOSS_VOLGHASS: "Volghass",
  SI_ICTHENEXTBOSS_YSENDA: "Ysenda Resplendent",
  SI_ICTHENEXTBOSS_ZOAL: "Zoal the Ever-Wakeful",
  SI_ICTHENEXTBOSS_MOLAG: "Simulacrum of Molag Bal",

  SI_ICTHENEXTBOSS_NOBLESDISTRICT: "5-Nobles District",
  SI_ICTHENEXTBOSS_ARENADISTRICT: "2-Arena District",
  SI_ICTHENEXTBOSS_TEMPLEDISTRICT: "4-Temple District",
  SI_ICTHENEXTBOSS_ARBORETUMDISTRICT: "3-Arboretum District",
  SI_ICTHENEXTBOSS_MEMORIALDISTRICT: "1-Memorial District",
  SI_ICTHENEXTBOSS_ELVENGARDENSDISTRICT: "6-Elven Gardens District",
  SI_ICTHENEXTBOSS_CAN: "0-Imperial Sewers",

  SI_BINDING_NAME_SI_ICTHENEXTBOSS_NOBLESDISTRICT: "5-Nobles District",
  SI_BINDING_NAME_SI_ICTHENEXTBOSS_ARENADISTRICT: "2-Arena District",
  SI_BINDING_NAME_SI_ICTHENEXTBOSS_TEMPLEDISTRICT: "4-Temple District",
  SI_BINDING_NAME_SI_ICTHENEXTBOSS_ARBORETUMDISTRICT: "3-Arboretum District",
  SI_BINDING_NAME_SI_ICTHENEXTBOSS_MEMORIALDISTRICT: "1-Memorial District",
  SI_BINDING_NAME_SI_ICTHENEXTBOSS_ELVENGARDENSDISTRICT: "6-Elven Gardens District",
  SI_BINDING_NAME_SI_ICTHENEXTBOSS_CAN: "0-Imperial Sewers",

  SI_ICTHENEXTBOSS_GUI_WIDTH: "230",
  SI_ICTHENEXTBOSS_OPTION_DESCRIPTION: "Tracks spawn times of bosses in Imperial City.",
  SI_ICTHENEXTBOSS_OPTION_TIMETABLE: "Table with spawntimes",
  SI_ICTHENEXTBOSS_OPTION_MAPTIMERS: "Spawntimes on IC map",
  SI_ICTHENEXTBOSS_OPTION_MAPTIMERS_TOOLTIP:
    "This will disable zoom on Imperial City map.\nDoes not work with Gamepad-Mode!",
  SI_ICTHENEXTBOSS_OPTION_EVENT_TIMERS: "Event timers (7 minutes)",
  SI_ICTHENEXTBOSS_OPTION_RUN_DIRECTION: "Run direction counterclockwise",
  SI_BINDING_NAME_SI_RUN_DIRECTION: "Run direction counterclockwise",
}

export function makeUiStrings(this: void): undefined {
  for (const [key, value] of Object.entries(STRINGS)) {
    ZO_CreateStringId(key, value)
  }
  return undefined
}
