import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import {
  type FingerprintFile,
  findFingerprintResidue,
  formatFinding,
  type RetiredToken,
} from "./addon-fingerprint-residue"
import {
  KEEP_NAME_EXCEPTIONS,
  RETIRED_FINGERPRINT_TOKENS,
} from "./addon-fingerprint-residue.manifest"

const FIXTURES = join(import.meta.dir, "..", "__fixtures__", "addon-fingerprint-residue")

const CODE65536: RetiredToken = { token: "@code65536", reason: "retired MWIM author handle" }
const CRAFTSTORE: RetiredToken = { token: "CraftStore", reason: "retired legacy addon name" }

const WRITWORTHY: RetiredToken = { token: "WritWorthy", reason: "retired upstream brand" }

function scan(
  retiredTokens: readonly RetiredToken[],
  files: readonly FingerprintFile[],
  keepNames: readonly string[] = []
) {
  return findFingerprintResidue({ addonName: "TemperCrafting", retiredTokens, keepNames, files })
}

describe("addon-fingerprint-residue", () => {
  describe("manifest", () => {
    test("seeds exactly the landed-silo tokens on TemperCrafting", () => {
      const entry = RETIRED_FINGERPRINT_TOKENS.TemperCrafting
      expect(entry?.map((t) => t.token)).toEqual([
        "@code65536",
        "WritWorthy",
        "PotionMaker",
        "CraftStore",
        "CraftStoreFixed",
      ])
    })

    test("carries a key only for an addon whose rename has landed", () => {
      expect(Object.keys(RETIRED_FINGERPRINT_TOKENS)).toEqual([
        "TemperCharacters",
        "TemperCrafting",
        "TemperTableFunctions",
      ])
      for (const addon of ["TemperCharacters", "TemperTableFunctions"]) {
        expect(RETIRED_FINGERPRINT_TOKENS[addon]?.map((t) => t.token)).toEqual([
          "LibTableFunctions",
        ])
      }
    })

    test("records the load-bearing keep-name contracts that must never be retired", () => {
      const names = KEEP_NAME_EXCEPTIONS.TemperCrafting?.map((e) => e.name) ?? []
      const retired = RETIRED_FINGERPRINT_TOKENS.TemperCrafting?.map((t) => t.token) ?? []
      expect(names).toContain("_G.TemperCrafting")
      expect(names).toContain("PotMaker")
      expect(names).toContain("TemperCrafting_GetSlotHandlerStats")
      for (const name of names) expect(retired).not.toContain(name)
    })
  })

  describe("findFingerprintResidue", () => {
    test("(a) clean addon — no retired token — yields zero findings", () => {
      const files: FingerprintFile[] = [
        { path: "a/src/index.ts", content: 'const author = "Temper"\nconst x = TemperCrafting' },
      ]
      expect(scan([CODE65536], files)).toEqual([])
    })

    test("(b) retired token in a TS string literal — one finding, correct line", () => {
      const files: FingerprintFile[] = [
        { path: "a/src/meta.ts", content: 'const name = "x"\nconst author = "@code65536"\n' },
      ]
      const findings = scan([CODE65536], files)
      expect(findings.length).toBe(1)
      expect(findings[0]?.token).toBe("@code65536")
      expect(findings[0]?.path).toBe("a/src/meta.ts")
      expect(findings[0]?.line).toBe(2)
    })

    test("(c) retired token in a TS identifier — flagged", () => {
      const files: FingerprintFile[] = [
        { path: "a/src/id.ts", content: "const CraftStore = makeStore()" },
      ]
      const findings = scan([CRAFTSTORE], files)
      expect(findings.length).toBe(1)
      expect(findings[0]?.token).toBe("CraftStore")
      expect(findings[0]?.line).toBe(1)
    })

    test("(d) retired token in an XML name= attribute — flagged", () => {
      const files: FingerprintFile[] = [
        {
          path: "a/CraftStore.xml",
          content: '<GuiXml>\n  <TopLevelControl name="CraftStore" />\n</GuiXml>',
        },
      ]
      const findings = scan([CRAFTSTORE], files)
      expect(findings.length).toBe(1)
      expect(findings[0]?.token).toBe("CraftStore")
      expect(findings[0]?.line).toBe(2)
    })

    test("(e) retired token ONLY inside a stripped comment — zero findings", () => {
      const tsOnlyComment: FingerprintFile = {
        path: "a/src/c.ts",
        content: "// provenance: @code65536\n/* also @code65536 */\nconst x = 1",
      }
      const xmlOnlyComment: FingerprintFile = {
        path: "a/panel.xml",
        content: "<!-- @code65536 and CraftStore in prose -->\n<GuiXml/>",
      }
      expect(scan([CODE65536], [tsOnlyComment])).toEqual([])
      expect(scan([CODE65536, CRAFTSTORE], [xmlOnlyComment])).toEqual([])
    })

    test("(f) compound residue — the token is flagged wherever its bytes stand", () => {
      const files: FingerprintFile[] = [
        {
          path: "a/src/compound.ts",
          content:
            'const topic = "Temper_CraftStore_ControlShow"\n' +
            'header.SetText("CraftStoreStyles")\n' +
            "const c = myCraftStore\n" +
            'const d = "CraftStoreFixed_Rune"',
        },
      ]
      expect(scan([CRAFTSTORE], files).map((f) => f.line)).toEqual([1, 2, 3, 4])
    })

    test("(g) a name carrying no retired bytes is not a residue", () => {
      const files: FingerprintFile[] = [
        { path: "a/src/near.ts", content: 'const store = "TemperCraftingStore"' },
      ]
      expect(scan([CRAFTSTORE], files)).toEqual([])
    })

    test("(h) keep name masks the retired bytes inside it, and only inside it", () => {
      const files: FingerprintFile[] = [
        {
          path: "a/src/sv.ts",
          content: 'const sv = "WritWorthyVars"\nconst brand = "WritWorthy"',
        },
      ]
      const findings = scan([WRITWORTHY], files, ["WritWorthyVars"])
      expect(findings.map((f) => f.line)).toEqual([2])
    })

    test("(i) an unmasked occurrence beside a masked one on the same line still flags", () => {
      const files: FingerprintFile[] = [
        { path: "a/src/both.ts", content: 'const a = "WritWorthyVars" + WritWorthy.name' },
      ]
      expect(scan([WRITWORTHY], files, ["WritWorthyVars"]).length).toBe(1)
    })

    test("(j) no keep name means no mask — the same line flags", () => {
      const files: FingerprintFile[] = [
        { path: "a/src/sv.ts", content: 'const sv = "WritWorthyVars"' },
      ]
      expect(scan([WRITWORTHY], files).length).toBe(1)
    })
  })

  describe("fixtures", () => {
    test("fail fixture reds — residue in a TS string AND an XML name=", () => {
      const files: FingerprintFile[] = [
        {
          path: "fail/OldFingerprint.ts",
          content: readFileSync(join(FIXTURES, "fail", "OldFingerprint.ts"), "utf8"),
        },
        {
          path: "fail/OldFingerprint.xml",
          content: readFileSync(join(FIXTURES, "fail", "OldFingerprint.xml"), "utf8"),
        },
      ]
      const findings = scan([CODE65536, CRAFTSTORE], files)
      const tokens = findings.map((f) => f.token)
      expect(tokens).toContain("@code65536")
      expect(tokens).toContain("CraftStore")
      expect(findings.length).toBe(3)
    })

    test("clean fixture is green — comments stripped, keep name masked", () => {
      const files: FingerprintFile[] = [
        {
          path: "clean/NewFingerprint.ts",
          content: readFileSync(join(FIXTURES, "clean", "NewFingerprint.ts"), "utf8"),
        },
      ]
      expect(scan([CODE65536, CRAFTSTORE, WRITWORTHY], files, ["WritWorthyVars"])).toEqual([])
    })

    test("clean fixture reds without its keep name — the mask is load-bearing", () => {
      const files: FingerprintFile[] = [
        {
          path: "clean/NewFingerprint.ts",
          content: readFileSync(join(FIXTURES, "clean", "NewFingerprint.ts"), "utf8"),
        },
      ]
      expect(scan([WRITWORTHY], files).length).toBe(1)
    })
  })

  describe("formatFinding", () => {
    test("renders path:line with the [fingerprint-residue] tag, token, and reason", () => {
      const rendered = formatFinding({
        token: "@code65536",
        path: "packages/temper/game/crafting/addon/src/lam.ts",
        line: 42,
        reason: "retired MWIM author handle",
      })
      expect(rendered).toContain("src/lam.ts:42")
      expect(rendered).toContain("[fingerprint-residue]")
      expect(rendered).toContain("@code65536")
      expect(rendered).toContain("retired MWIM author handle")
    })
  })
})
