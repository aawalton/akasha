import { valueDropdown } from "@akasha/temper-settings-panel/dropdown"
import { registerPanel } from "@akasha/temper-settings-panel/register-panel"
import {
  requireOptions,
  requireSVar,
  STATE,
} from "../skill-point-finder-state/skill-point-finder-state.module.code.ts"
import type {
  Rgb,
  Settings,
} from "../skill-point-finder-types/skill-point-finder-types.module.code.ts"

function fontInfo(this: void, font: FontObject): string {
  const [face] = font.GetFontInfo()
  return face
}

STATE.options = {
  Font: {
    Fonts: {
      ProseAntique: fontInfo(ZoFontBookPaper),
      Consolas: "/EsoUI/Common/Fonts/consola.ttf",
      "Futura Condensed": "/EsoUI/Common/Fonts/FTN57.otf",
      "Futura Condensed Bold": "/EsoUI/Common/Fonts/FTN87.otf",
      "Futura Condensed Light": "/EsoUI/Common/Fonts/FTN47.otf",
      "Skyrim Handwritten": fontInfo(ZoFontBookLetter),
      "Trajan Pro": fontInfo(ZoFontBookTablet),
      "Univers 55": "/EsoUI/Common/Fonts/univers55.otf",
      "Univers 57": fontInfo(ZoFontGame),
      "Univers 67": fontInfo(ZoFontGameBold),
    },
    Names: [
      "ProseAntique",
      "Consolas",
      "Futura Condensed",
      "Futura Condensed Bold",
      "Futura Condensed Light",
      "Skyrim Handwritten",
      "Trajan Pro",
      "Univers 55",
      "Univers 57",
      "Univers 67",
    ],
  },
  Sort: {
    SQS: { "Legacy Zone": 1, "Zone Name": 2 },
    D: { "Legacy Zone": 1, "Zone Name": 2, "Dungeon Name": 3 },
    Names_SQS: ["Legacy Zone", "Zone Name"],
    Names_D: ["Legacy Zone", "Zone Name", "Dungeon Name"],
  },
}

const DIVIDER: LamControlData = { type: "divider", width: "full" }

export function setupMenu(this: void, charId: string): undefined {
  const lam = LibAddonMenu2
  const sv = requireSVar()
  const options = requireOptions()
  const addonName = GetString(USPF_GUI_TITLE)

  const charSettings = (): Settings => {
    const s = sv.settings[charId]
    if (s === undefined) {
      throw new Error("SkillPointFinder settings opened before character record exists")
    }
    return s
  }

  const fontDropdown = (
    name: number,
    tooltip: number,
    width: "full" | "half",
    get: () => string,
    set: (font: string) => void
  ): LamControlData => ({
    type: "dropdown",
    name: GetString(name),
    choices: options.Font.Names,
    getFunc: get,
    setFunc: (value) => {
      set(tostring(value))
    },
    tooltip: GetString(tooltip),
    width,
    warning: GetString(USPF_SETTINGS_RELOAD_WARNING),
  })

  const colorControl = (
    name: number,
    tooltip: number,
    get: () => Rgb,
    set: (rgb: Rgb) => void
  ): LamControlData => ({
    type: "colorpicker",
    name: GetString(name),
    tooltip: GetString(tooltip),
    getFunc: () => {
      const c = get()
      return $multi(c[0] ?? 0, c[1] ?? 0, c[2] ?? 0)
    },
    setFunc: (r, g, b) => {
      set([r, g, b])
    },
    width: "half",
  })

  const panelData: LamPanelData = {
    type: "panel",
    name: addonName,
    displayName: `${addonName} Settings`,
    author: "AlanGaming",
    version: "1.0.0",
    slashCommand: "/uspfmenu",
    registerForRefresh: true,
    registerForDefaults: true,
    resetFunc: () => {
      d("Skill Points settings reset to default.")
    },
  }

  const optionsTable: LamControlData[] = [
    {
      type: "submenu",
      name: `|cFF0000${GetString(USPF_SETTINGS_FONT_TITLE)}|r`,
      controls: [
        fontDropdown(
          USPF_SETTINGS_FONT_TITLE_HEADER,
          USPF_SETTINGS_FONT_TITLE_DESC,
          "full",
          () => charSettings().title.font,
          (font) => {
            charSettings().title.font = font
            STATE.settings.title.font = font
          }
        ),
        fontDropdown(
          USPF_SETTINGS_FONT_GSP_TITLE,
          USPF_SETTINGS_FONT_GSP_ROWS,
          "half",
          () => charSettings().GSP.font,
          (font) => {
            charSettings().GSP.font = font
            STATE.settings.GSP.font = font
          }
        ),
        fontDropdown(
          USPF_SETTINGS_FONT_SQS_TITLE,
          USPF_SETTINGS_FONT_SQS_ROWS,
          "half",
          () => charSettings().SQS.font,
          (font) => {
            charSettings().SQS.font = font
            STATE.settings.SQS.font = font
          }
        ),
        fontDropdown(
          USPF_SETTINGS_FONT_GDQ_TITLE,
          USPF_SETTINGS_FONT_GDQ_ROWS,
          "half",
          () => charSettings().GDQ.font,
          (font) => {
            charSettings().GDQ.font = font
            STATE.settings.GDQ.font = font
          }
        ),
        fontDropdown(
          USPF_SETTINGS_FONT_PDB_TITLE,
          USPF_SETTINGS_FONT_PDB_ROWS,
          "half",
          () => charSettings().PDB.font,
          (font) => {
            charSettings().PDB.font = font
            STATE.settings.PDB.font = font
          }
        ),
      ],
    },
    {
      type: "submenu",
      name: `|cFF0000${GetString(USPF_SETTINGS_COLOR_TITLE)}|r`,
      controls: [
        colorControl(
          USPF_SETTINGS_COLOR_GSP_DONE,
          USPF_SETTINGS_COLOR_DESC_DONE,
          () => charSettings().GSP.doneColor,
          (rgb) => {
            charSettings().GSP.doneColor = rgb
            STATE.settings.GSP.doneColor = rgb
          }
        ),
        colorControl(
          USPF_SETTINGS_COLOR_GSP_NOT_DONE,
          USPF_SETTINGS_COLOR_DESC_NOT_DONE,
          () => charSettings().GSP.needColor,
          (rgb) => {
            charSettings().GSP.needColor = rgb
            STATE.settings.GSP.needColor = rgb
          }
        ),
        colorControl(
          USPF_SETTINGS_COLOR_GSP_PROG,
          USPF_SETTINGS_COLOR_DESC_PROG,
          () => charSettings().GSP.progColor,
          (rgb) => {
            charSettings().GSP.progColor = rgb
            STATE.settings.GSP.progColor = rgb
          }
        ),
        DIVIDER,
        colorControl(
          USPF_SETTINGS_COLOR_ZQ_DONE,
          USPF_SETTINGS_COLOR_DESC_DONE,
          () => charSettings().SQS.doneColorZQ,
          (rgb) => {
            charSettings().SQS.doneColorZQ = rgb
            STATE.settings.SQS.doneColorZQ = rgb
          }
        ),
        colorControl(
          USPF_SETTINGS_COLOR_ZQ_NOT_DONE,
          USPF_SETTINGS_COLOR_DESC_NOT_DONE,
          () => charSettings().SQS.needColorZQ,
          (rgb) => {
            charSettings().SQS.needColorZQ = rgb
            STATE.settings.SQS.needColorZQ = rgb
          }
        ),
        colorControl(
          USPF_SETTINGS_COLOR_ZQ_PROG,
          USPF_SETTINGS_COLOR_DESC_PROG,
          () => charSettings().SQS.progColorZQ,
          (rgb) => {
            charSettings().SQS.progColorZQ = rgb
            STATE.settings.SQS.progColorZQ = rgb
          }
        ),
        DIVIDER,
        colorControl(
          USPF_SETTINGS_COLOR_SS_DONE,
          USPF_SETTINGS_COLOR_DESC_DONE,
          () => charSettings().SQS.doneColorSS,
          (rgb) => {
            charSettings().SQS.doneColorSS = rgb
            STATE.settings.SQS.doneColorSS = rgb
          }
        ),
        colorControl(
          USPF_SETTINGS_COLOR_SS_NOT_DONE,
          USPF_SETTINGS_COLOR_DESC_NOT_DONE,
          () => charSettings().SQS.needColorSS,
          (rgb) => {
            charSettings().SQS.needColorSS = rgb
            STATE.settings.SQS.needColorSS = rgb
          }
        ),
        colorControl(
          USPF_SETTINGS_COLOR_SS_PROG,
          USPF_SETTINGS_COLOR_DESC_PROG,
          () => charSettings().SQS.progColorSS,
          (rgb) => {
            charSettings().SQS.progColorSS = rgb
            STATE.settings.SQS.progColorSS = rgb
          }
        ),
        DIVIDER,
        colorControl(
          USPF_SETTINGS_COLOR_GDQ_DONE,
          USPF_SETTINGS_COLOR_DESC_DONE,
          () => charSettings().GDQ.doneColor,
          (rgb) => {
            charSettings().GDQ.doneColor = rgb
            STATE.settings.GDQ.doneColor = rgb
          }
        ),
        colorControl(
          USPF_SETTINGS_COLOR_GDQ_NOT_DONE,
          USPF_SETTINGS_COLOR_DESC_NOT_DONE,
          () => charSettings().GDQ.needColor,
          (rgb) => {
            charSettings().GDQ.needColor = rgb
            STATE.settings.GDQ.needColor = rgb
          }
        ),
        DIVIDER,
        colorControl(
          USPF_SETTINGS_COLOR_PDB_DONE,
          USPF_SETTINGS_COLOR_DESC_DONE,
          () => charSettings().PDB.doneColor,
          (rgb) => {
            charSettings().PDB.doneColor = rgb
            STATE.settings.PDB.doneColor = rgb
          }
        ),
        colorControl(
          USPF_SETTINGS_COLOR_PDB_NOT_DONE,
          USPF_SETTINGS_COLOR_DESC_NOT_DONE,
          () => charSettings().PDB.needColor,
          (rgb) => {
            charSettings().PDB.needColor = rgb
            STATE.settings.PDB.needColor = rgb
          }
        ),
      ],
    },
    {
      type: "submenu",
      name: `|cFF0000${GetString(USPF_SETTINGS_SORT_TITLE)}|r`,
      controls: [
        valueDropdown<number>({
          name: GetString(USPF_SETTINGS_SORT_SQS),
          choices: options.Sort.Names_SQS,
          values: options.Sort.Names_SQS.map((name) => options.Sort.SQS[name] ?? 1),
          get: () => charSettings().SQS.sortCol,
          set: (col) => {
            charSettings().SQS.sortCol = col
            STATE.settings.SQS.sortCol = col
          },
          tooltip: GetString(USPF_SETTINGS_SORT_SQS_DESC),
          width: "half",
        }),
        valueDropdown<number>({
          name: GetString(USPF_SETTINGS_SORT_GDQ),
          choices: options.Sort.Names_D,
          values: options.Sort.Names_D.map((name) => options.Sort.D[name] ?? 1),
          get: () => charSettings().GDQ.sortCol,
          set: (col) => {
            charSettings().GDQ.sortCol = col
            STATE.settings.GDQ.sortCol = col
          },
          tooltip: GetString(USPF_SETTINGS_SORT_GDQ_DESC),
          width: "half",
        }),
        valueDropdown<number>({
          name: GetString(USPF_SETTINGS_SORT_PDB),
          choices: options.Sort.Names_D,
          values: options.Sort.Names_D.map((name) => options.Sort.D[name] ?? 1),
          get: () => charSettings().PDB.sortCol,
          set: (col) => {
            charSettings().PDB.sortCol = col
            STATE.settings.PDB.sortCol = col
          },
          tooltip: GetString(USPF_SETTINGS_SORT_PDB_DESC),
          width: "half",
        }),
      ],
    },
    {
      type: "submenu",
      name: `|cFF0000${GetString(USPF_SETTINGS_OVERRIDE_TITLE)}|r`,
      controls: [
        {
          type: "checkbox",
          name: GetString(USPF_SETTINGS_OVERRIDE_FOLIUM),
          getFunc: () => charSettings().FD.override,
          setFunc: (value) => {
            charSettings().FD.override = value
            STATE.settings.FD.override = value
          },
          tooltip: GetString(USPF_SETTINGS_OVERRIDE_FOLIUM_DESC),
          width: "full",
          warning: GetString(USPF_SETTINGS_OVERRIDE_WARN),
        },
        {
          type: "checkbox",
          name: GetString(USPF_SETTINGS_OVERRIDE_FOLIUM_SET),
          tooltip: GetString(USPF_SETTINGS_OVERRIDE_FOLIUM_SET_DESC),
          getFunc: () => charSettings().FD.charHasFD,
          setFunc: (value) => {
            charSettings().FD.charHasFD = value
            STATE.settings.FD.charHasFD = value
          },
          width: "full",
          warning: GetString(USPF_SETTINGS_OVERRIDE_WARN),
        },
        {
          type: "checkbox",
          name: GetString(USPF_SETTINGS_OVERRIDE_TUT_SET),
          tooltip: GetString(USPF_SETTINGS_OVERRIDE_TUT_SET_DESC),
          getFunc: () => charSettings().TUT,
          setFunc: (value) => {
            charSettings().TUT = value
            STATE.settings.TUT = value
          },
          width: "full",
          warning: GetString(USPF_SETTINGS_OVERRIDE_WARN),
        },
      ],
    },
  ]

  registerPanel(lam, addonName, panelData, optionsTable)
}
