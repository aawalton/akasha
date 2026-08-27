
import { describe, expect, it } from "bun:test"
import { SEAT_LIVE_FN, TMUX_LAUNCH_FN } from "../aw/init/bash-tmux.ts"
import { RELOAD_FN, implName } from "../aw/init/reload.ts"
import { PROXY, PUBLIC_FUNCTION_NAMES, SUPERVISOR, output } from "./aw-fixture.ts"

function body(fnName: string): string {
  const match = output.match(new RegExp(`${fnName}\\(\\) \\{[\\s\\S]*?^}`, "m"))
  if (match === null) throw new Error(`${fnName}() function body not found in generated output`)
  return match[0] ?? ""
}

describe("generateBashInit — what each launcher runs", () => {
  it("the shared tmux step is the one place a seat reaches the supervisor through the PTY proxy", () => {
    const launchBody = body(TMUX_LAUNCH_FN)
    expect(launchBody).toContain(`bun run ${PROXY} -- bun run ${SUPERVISOR}`)
    expect(launchBody).toContain('if [ "$_use_tmux" != 1 ]; then')
    expect(launchBody).toContain('tmux attach-session -t "=$_seat"')
    expect(launchBody).toContain('tmux has-session -t "=$_seat"')
  })

  it("sr() attaches a live session and stops there, resuming nothing", () => {
    const srBody = body(implName("sr"))
    const attach = srBody.indexOf('tmux attach-session -t "=$name"')
    expect(attach).toBeGreaterThan(-1)
    expect(srBody).toContain(`${SEAT_LIVE_FN} "$name"`)
    expect(attach).toBeLessThan(srBody.indexOf("ops seat resume"))
  })

  it("a session holding only a dead pane is live to no one", () => {
    const liveBody = body(SEAT_LIVE_FN)
    expect(liveBody).toContain('tmux has-session -t "=$1"')
    expect(liveBody).toContain("#{pane_dead}")
    expect(liveBody).toMatch(/\*0\*\)[^\n]*return 0 ;;/)
  })

  it("the shared tmux step stops a dead session before it starts a new one", () => {
    const launchBody = body(TMUX_LAUNCH_FN)
    const reaped = launchBody.indexOf('tmux kill-session -t "=$_seat"')
    expect(reaped).toBeGreaterThan(-1)
    expect(launchBody).toContain(`! ${SEAT_LIVE_FN} "$_seat"`)
    expect(reaped).toBeLessThan(launchBody.indexOf("new-session -d -s"))
  })

  it("the shared tmux step starts nothing where the dead session will not stop", () => {
    const launchBody = body(TMUX_LAUNCH_FN)
    const refusal = launchBody.indexOf("would not stop, so nothing was started")
    expect(refusal).toBeGreaterThan(-1)
    expect(refusal).toBeLessThan(launchBody.indexOf("new-session -d -s"))
  })

  it("sn() stops through the guarded command before it kills anything", () => {
    const snBody = body(implName("sn"))
    const stopped = snBody.indexOf("ops seat stop")
    const killed = snBody.indexOf('tmux kill-session -t "=$_sn_seat"')
    expect(stopped).toBeGreaterThan(-1)
    expect(killed).toBeGreaterThan(stopped)
    expect(snBody).toContain('tmux has-session -t "=$_sn_seat"')
    expect(snBody).not.toContain("already holds a live tmux session")
  })

  it("sn() kills a session directly only where no seat page reaches it", () => {
    const snBody = body(implName("sn"))
    expect(snBody).toContain('_sn_stop_rc" = 2')
    expect(snBody).toContain("holds a tmux session with no seat page")
    const guarded = snBody.indexOf('_sn_stop_rc" = 2')
    expect(guarded).toBeLessThan(snBody.indexOf('tmux kill-session -t "=$_sn_seat"'))
  })

  it("sn() hands back a refusal from the stop, killing and starting nothing", () => {
    const snBody = body(implName("sn"))
    const surfaced = snBody.indexOf('cat "$_sn_stop_err" >&2')
    expect(surfaced).toBeGreaterThan(-1)
    expect(snBody).toContain('return "$_sn_stop_rc"')
    expect(surfaced).toBeLessThan(snBody.indexOf('tmux kill-session -t "=$_sn_seat"'))
    expect(surfaced).toBeLessThan(snBody.indexOf("ops seat start"))
  })

  it("sn() takes --force and passes it to the stop", () => {
    const snBody = body(implName("sn"))
    expect(snBody).toContain("--force) _sn_force=1 ;;")
    expect(snBody).toContain("_sn_stop_flags+=(--force)")
    expect(snBody).toContain('ops seat stop "$_sn_seat" "${_sn_stop_flags[@]}"')
  })

  it("sn() starts nothing where the session it must stop will not go", () => {
    const snBody = body(implName("sn"))
    const refusal = snBody.indexOf("would not stop, so nothing was started")
    expect(refusal).toBeGreaterThan(-1)
    expect(refusal).toBeGreaterThan(snBody.indexOf("ops seat stop"))
    expect(snBody).toMatch(/tmux kill-session[^\n]*\|\| \{/)
  })

  it("preamble unalias covers all public function names", () => {
    const preambleLine = output.split("\n").find((l) => l.startsWith("unalias"))
    expect(preambleLine).toBeDefined()
    for (const name of PUBLIC_FUNCTION_NAMES) {
      expect(preambleLine).toContain(name)
    }
  })

  it("every public name is a wrapper that reloads and then dispatches", () => {
    for (const name of PUBLIC_FUNCTION_NAMES) {
      expect(output).toContain(
        [
          `${name}() {`,
          `  ${RELOAD_FN}`,
          `  ${implName(name)} "$@"`,
          "}",
        ].join("\n")
      )
    }
  })

  it("no function body re-runs shell startup; only the `s.` alias does", () => {
    const sourcingLines = output
      .split("\n")
      .filter((line) => line.includes("source ~/.bashrc") || line.includes(".bashrc"))
    expect(sourcingLines).toEqual(["alias s.='source ~/.bashrc'"])
  })

  it("all ${ expansions are valid bash parameter syntax", () => {
    const expansions = [...output.matchAll(/\$\{([^}]+)\}/g)]
    expect(expansions.length).toBeGreaterThan(0)
    for (const [, inner] of expansions) {
      expect(inner).not.toMatch(/[.(]/)
    }
  })
})
