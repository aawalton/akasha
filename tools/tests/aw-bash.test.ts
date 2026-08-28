
import { describe, expect, it } from "bun:test"
import { generateBashInit } from "../aw/init/bash.ts"
import { SEAT_LIVE_FN, TMUX_LAUNCH_FN } from "../aw/init/bash-tmux.ts"
import { RELOAD_FN, implName } from "../aw/init/reload.ts"
import { EXPECTED_ALIASES, EXPECTED_FUNCTION_NAMES, FIXTURE_ACCOUNTS, OPS, PROXY, SEAT_FN_NAMES, SUPERVISOR, SUPERVISOR_FN_NAMES, escapeRegex, output } from "./aw-fixture.ts"

describe("generateBashInit — the set it defines", () => {
  it("contains all expected aliases", () => {
    for (const alias of EXPECTED_ALIASES) {
      expect(output).toContain(`alias ${alias}=`)
    }
  })

  it("generated functions exactly match the expected set (no extras, none missing)", () => {
    const definedFunctions = [...output.matchAll(/^(\w+)\(\)\s*\{/gm)].flatMap((m) =>
      m[1] === undefined ? [] : [m[1]]
    )
    for (const name of EXPECTED_FUNCTION_NAMES) {
      expect(definedFunctions).toContain(name)
    }
    for (const name of definedFunctions) {
      expect(EXPECTED_FUNCTION_NAMES).toContain(name)
    }
    expect(definedFunctions.length).toBe(EXPECTED_FUNCTION_NAMES.length)
  })

  it("the cN family is generated dynamically from the account list", () => {
    for (const { account, aliasIndex } of FIXTURE_ACCOUNTS) {
      expect(output).toMatch(
        new RegExp(
          `${implName(`c${aliasIndex}`)}\\(\\) \\{[\\s\\S]*?bun run ` +
            `${escapeRegex(SUPERVISOR)} -a ${account}\\n`
        )
      )
    }
  })

  it("an empty account list still yields cu/cna/sn/sr (offline/fresh fallback)", () => {
    const empty = generateBashInit([])
    const defined = [...empty.matchAll(/^(\w+)\(\)\s*\{/gm)].flatMap((m) =>
      m[1] === undefined ? [] : [m[1]]
    )
    const publicNames = ["cna", "cu", ...SEAT_FN_NAMES]
    expect(defined.sort()).toEqual(
      [
        RELOAD_FN,
        SEAT_LIVE_FN,
        TMUX_LAUNCH_FN,
        ...publicNames,
        ...publicNames.map(implName),
      ].sort()
    )
    expect(empty).not.toMatch(/^_aw_fn_c[0-9]+\(\)/m)
  })

  it("cna prompts for name + email, creates the row, and bootstraps a login session", () => {
    const m = output.match(new RegExp(`${implName("cna")}\\(\\) \\{[\\s\\S]*?^}`, "m"))
    if (m === null) throw new Error("cna() function body not found in generated output")
    const body = m[0] ?? ""
    expect(body).toContain('read -r -p "New account name (slug, e.g. aow): " _acct')
    expect(body).toContain('read -r -p "Email for $_acct: " _email')
    expect(body).toContain(`bun run ${OPS} claude-account add --account "$_acct" --email "$_email"`)
    expect(body).toMatch(
      new RegExp(
        `bun run ${escapeRegex(PROXY)} -- bun run ${escapeRegex(SUPERVISOR)} -a "\\$_acct"`
      )
    )
    expect(body).toContain("local _rc=$?")
    expect(body).toContain("tput reset")
    expect(body).toContain("return $_rc")
  })

  it("every supervisor entry function runs through the PTY proxy", () => {
    for (const name of [...SUPERVISOR_FN_NAMES, "cna"]) {
      const re = new RegExp(
        `${implName(name)}\\(\\) \\{[\\s\\S]*?bun run ${escapeRegex(PROXY)} -- bun run ${escapeRegex(SUPERVISOR)}`,
        "m"
      )
      expect(output).toMatch(re)
    }
    const cuMatch = output.match(new RegExp(`${implName("cu")}\\(\\) \\{[\\s\\S]*?^}`, "m"))
    if (cuMatch === null) throw new Error("cu() function body not found in generated output")
    expect(cuMatch[0] ?? "").not.toContain(PROXY)
  })

  it("cu delegates to the ops command that reads the account pages", () => {
    const body = output.match(new RegExp(`${implName("cu")}\\(\\) \\{[\\s\\S]*?^}`, "m"))?.[0] ?? ""
    expect(body).toContain(`bun run ${OPS} claude-account usage`)
    expect(body).not.toContain("uncommitted.yaml")
    expect(body).not.toContain("awk")
  })

  it("every reauth function ends with `tput reset` + exit-code preservation (initiative #11586)", () => {
    for (const name of SUPERVISOR_FN_NAMES) {
      const re = new RegExp(
        `${implName(name)}\\(\\) \\{[\\s\\S]*?local _rc=\\$\\?\\n\\s*tput reset\\n\\s*return \\$_rc\\n\\}`,
        "m"
      )
      expect(output).toMatch(re)
    }
  })

  it("the seat launchers reset no terminal, because tmux owns the one they attach (#14682)", () => {
    for (const name of SEAT_FN_NAMES) {
      const m = output.match(new RegExp(`${implName(name)}\\(\\) \\{[\\s\\S]*?^}`, "m"))
      if (m === null) throw new Error(`${name}() function body not found in generated output`)
      expect(m[0] ?? "").not.toContain("tput reset")
    }
  })
})
