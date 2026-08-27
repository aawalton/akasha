import { describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { buildManifestLines, loadAddonConfig, readAdditionalLuaFiles } from "./addon-load-order-metadata.ts"

const SCRATCH_ROOT = "/var/tmp"

const HEADER_SAMPLE = "## Title: TemperInventory\n## Version: 1.0.0"
const ADDON_NAME = "TemperInventory"
const BUNDLE_NAME = "TemperInventory.lua"

function writeAddonJson(extra: Record<string, unknown>): string {
  const dir = mkdtempSync(join(SCRATCH_ROOT, "addons-load-order-"))
  writeFileSync(
    join(dir, "addon.json"),
    JSON.stringify({
      name: ADDON_NAME,
      title: "Temper Inventory",
      description: "Inventory tracking for Temper",
      author: "AlanGaming",
      version: "1.0.0",
      addonVersion: 100,
      apiVersion: ["101049"],
      savedVariables: [],
      dependsOn: [],
      ...extra,
    })
  )
  return dir
}

describe("readAdditionalLuaFiles", () => {
  test("returns empty array when addon.json omits additionalLuaFiles", async () => {
    const dir = writeAddonJson({})
    try {
      const result = await readAdditionalLuaFiles(dir)
      expect(result).toEqual([])
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  test("returns the declared filenames in order", async () => {
    const dir = writeAddonJson({
      additionalLuaFiles: ["TemperInventoryConfig.lua", "TemperInventoryExtras.lua"],
    })
    try {
      const result = await readAdditionalLuaFiles(dir)
      expect(result).toEqual(["TemperInventoryConfig.lua", "TemperInventoryExtras.lua"])
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  test("returns empty array when addon.json is missing entirely", async () => {
    const dir = mkdtempSync(join(SCRATCH_ROOT, "addons-load-order-"))
    try {
      const result = await readAdditionalLuaFiles(dir)
      expect(result).toEqual([])
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe("buildManifestLines", () => {
  test("emits no extra lines when additionalLuaFiles is empty", () => {
    const lines = buildManifestLines({
      metadataHeader: HEADER_SAMPLE,
      additionalLuaFiles: [],
      luaPaths: [BUNDLE_NAME],
      addonName: ADDON_NAME,
      nameXmlExists: false,
      bindingsXmlExists: false,
    })
    expect(lines).toEqual([HEADER_SAMPLE, "", BUNDLE_NAME])
  })

  test("places one additional file on its own line before the main bundle", () => {
    const lines = buildManifestLines({
      metadataHeader: HEADER_SAMPLE,
      additionalLuaFiles: ["TemperInventoryConfig.lua"],
      luaPaths: [BUNDLE_NAME],
      addonName: ADDON_NAME,
      nameXmlExists: false,
      bindingsXmlExists: false,
    })
    expect(lines).toEqual([HEADER_SAMPLE, "", "TemperInventoryConfig.lua", BUNDLE_NAME])
  })

  test("preserves declaration order across multiple additional files, all before the main bundle", () => {
    const lines = buildManifestLines({
      metadataHeader: HEADER_SAMPLE,
      additionalLuaFiles: ["AlphaConfig.lua", "BetaConfig.lua"],
      luaPaths: [BUNDLE_NAME],
      addonName: ADDON_NAME,
      nameXmlExists: false,
      bindingsXmlExists: false,
    })
    expect(lines).toEqual([HEADER_SAMPLE, "", "AlphaConfig.lua", "BetaConfig.lua", BUNDLE_NAME])
  })

  test("appends XML lines after the main lua entries when present", () => {
    const lines = buildManifestLines({
      metadataHeader: HEADER_SAMPLE,
      additionalLuaFiles: ["TemperInventoryConfig.lua"],
      luaPaths: [BUNDLE_NAME],
      addonName: ADDON_NAME,
      nameXmlExists: true,
      bindingsXmlExists: true,
    })
    expect(lines).toEqual([
      HEADER_SAMPLE,
      "",
      "TemperInventoryConfig.lua",
      BUNDLE_NAME,
      `${ADDON_NAME}.xml`,
      "Bindings.xml",
    ])
  })

  test("emits xmlBeforeBundle entries between additionalLuaFiles and the main bundle", () => {
    const lines = buildManifestLines({
      metadataHeader: HEADER_SAMPLE,
      additionalLuaFiles: ["TemperInventoryConfig.lua"],
      xmlBeforeBundle: ["Fonts.xml"],
      xmlAfterBundle: [],
      luaPaths: [BUNDLE_NAME],
      addonName: ADDON_NAME,
      nameXmlExists: false,
      bindingsXmlExists: false,
    })
    expect(lines).toEqual([
      HEADER_SAMPLE,
      "",
      "TemperInventoryConfig.lua",
      "Fonts.xml",
      BUNDLE_NAME,
    ])
  })

  test("emits xmlAfterBundle entries after the main bundle but before <Name>.xml and Bindings.xml", () => {
    const lines = buildManifestLines({
      metadataHeader: HEADER_SAMPLE,
      additionalLuaFiles: [],
      xmlBeforeBundle: [],
      xmlAfterBundle: ["MainUI.xml"],
      luaPaths: [BUNDLE_NAME],
      addonName: ADDON_NAME,
      nameXmlExists: true,
      bindingsXmlExists: true,
    })
    expect(lines).toEqual([
      HEADER_SAMPLE,
      "",
      BUNDLE_NAME,
      "MainUI.xml",
      `${ADDON_NAME}.xml`,
      "Bindings.xml",
    ])
  })

  test("orders all slots: header, additionalLuaFiles, xmlBeforeBundle, bundle, xmlAfterBundle, <Name>.xml, Bindings.xml", () => {
    const lines = buildManifestLines({
      metadataHeader: HEADER_SAMPLE,
      additionalLuaFiles: ["TemperInventoryConfig.lua"],
      xmlBeforeBundle: ["Fonts.xml"],
      xmlAfterBundle: ["MainUI.xml"],
      luaPaths: [BUNDLE_NAME],
      addonName: ADDON_NAME,
      nameXmlExists: true,
      bindingsXmlExists: true,
    })
    expect(lines).toEqual([
      HEADER_SAMPLE,
      "",
      "TemperInventoryConfig.lua",
      "Fonts.xml",
      BUNDLE_NAME,
      "MainUI.xml",
      `${ADDON_NAME}.xml`,
      "Bindings.xml",
    ])
  })

  test("preserves declaration order within xmlBeforeBundle and xmlAfterBundle", () => {
    const lines = buildManifestLines({
      metadataHeader: HEADER_SAMPLE,
      additionalLuaFiles: [],
      xmlBeforeBundle: ["AlphaFonts.xml", "BetaFonts.xml"],
      xmlAfterBundle: ["GammaUI.xml", "DeltaUI.xml"],
      luaPaths: [BUNDLE_NAME],
      addonName: ADDON_NAME,
      nameXmlExists: false,
      bindingsXmlExists: false,
    })
    expect(lines).toEqual([
      HEADER_SAMPLE,
      "",
      "AlphaFonts.xml",
      "BetaFonts.xml",
      BUNDLE_NAME,
      "GammaUI.xml",
      "DeltaUI.xml",
    ])
  })

  test("passes subpath XML entries through verbatim", () => {
    const lines = buildManifestLines({
      metadataHeader: HEADER_SAMPLE,
      additionalLuaFiles: [],
      xmlBeforeBundle: ["XML/UI/CraftStore_Font.xml"],
      xmlAfterBundle: ["XML/UI/CraftStore.xml"],
      luaPaths: [BUNDLE_NAME],
      addonName: ADDON_NAME,
      nameXmlExists: false,
      bindingsXmlExists: false,
    })
    expect(lines).toEqual([
      HEADER_SAMPLE,
      "",
      "XML/UI/CraftStore_Font.xml",
      BUNDLE_NAME,
      "XML/UI/CraftStore.xml",
    ])
  })

  test("emits no extra lines when both xml lists are empty", () => {
    const lines = buildManifestLines({
      metadataHeader: HEADER_SAMPLE,
      additionalLuaFiles: [],
      xmlBeforeBundle: [],
      xmlAfterBundle: [],
      luaPaths: [BUNDLE_NAME],
      addonName: ADDON_NAME,
      nameXmlExists: true,
      bindingsXmlExists: true,
    })
    expect(lines).toEqual([HEADER_SAMPLE, "", BUNDLE_NAME, `${ADDON_NAME}.xml`, "Bindings.xml"])
  })

  test("places build-id.lua first, ahead of additionalLuaFiles and the bundle", () => {
    const lines = buildManifestLines({
      metadataHeader: HEADER_SAMPLE,
      buildIdFile: "build-id.lua",
      additionalLuaFiles: ["TemperInventoryConfig.lua"],
      xmlBeforeBundle: ["Fonts.xml"],
      xmlAfterBundle: ["MainUI.xml"],
      luaPaths: [BUNDLE_NAME],
      addonName: ADDON_NAME,
      nameXmlExists: true,
      bindingsXmlExists: true,
    })
    expect(lines).toEqual([
      HEADER_SAMPLE,
      "",
      "build-id.lua",
      "TemperInventoryConfig.lua",
      "Fonts.xml",
      BUNDLE_NAME,
      "MainUI.xml",
      `${ADDON_NAME}.xml`,
      "Bindings.xml",
    ])
  })

  test("omits the build-id line when buildIdFile is absent (byte-identical to pre-build-id shape)", () => {
    const lines = buildManifestLines({
      metadataHeader: HEADER_SAMPLE,
      additionalLuaFiles: ["TemperInventoryConfig.lua"],
      luaPaths: [BUNDLE_NAME],
      addonName: ADDON_NAME,
      nameXmlExists: false,
      bindingsXmlExists: false,
    })
    expect(lines).toEqual([HEADER_SAMPLE, "", "TemperInventoryConfig.lua", BUNDLE_NAME])
  })

  test("is byte-identical to current behavior when the xml fields are absent", () => {
    const lines = buildManifestLines({
      metadataHeader: HEADER_SAMPLE,
      additionalLuaFiles: ["TemperInventoryConfig.lua"],
      luaPaths: [BUNDLE_NAME],
      addonName: ADDON_NAME,
      nameXmlExists: true,
      bindingsXmlExists: true,
    })
    expect(lines).toEqual([
      HEADER_SAMPLE,
      "",
      "TemperInventoryConfig.lua",
      BUNDLE_NAME,
      `${ADDON_NAME}.xml`,
      "Bindings.xml",
    ])
  })
})

describe("loadAddonConfig xmlFiles", () => {
  test("parses xmlFiles with beforeBundle and afterBundle when present", async () => {
    const dir = writeAddonJson({
      xmlFiles: {
        beforeBundle: ["XML/UI/CraftStore_Font.xml"],
        afterBundle: ["XML/UI/CraftStore.xml"],
      },
    })
    try {
      const config = await loadAddonConfig(dir)
      expect(config?.xmlFiles).toEqual({
        beforeBundle: ["XML/UI/CraftStore_Font.xml"],
        afterBundle: ["XML/UI/CraftStore.xml"],
      })
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  test("xmlFiles is optional — config parses when the field is absent", async () => {
    const dir = writeAddonJson({})
    try {
      const config = await loadAddonConfig(dir)
      expect(config).not.toBeNull()
      expect(config?.xmlFiles).toBeUndefined()
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  test("rejects malformed xmlFiles (non-string entries fail the boundary parse)", async () => {
    const dir = writeAddonJson({
      xmlFiles: { beforeBundle: [123], afterBundle: ["ok.xml"] },
    })
    try {
      const config = await loadAddonConfig(dir)
      expect(config).toBeNull()
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})
