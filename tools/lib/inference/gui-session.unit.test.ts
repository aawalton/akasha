import { describe, expect, test } from "bun:test"
import { buildGuiSessionProbeScript, decideGuiSession } from "./gui-session"

describe("decideGuiSession (#15627 no-GUI-session preflight)", () => {
  test("exit=0 marker → session present", () => {
    expect(decideGuiSession("GUI_SESSION_PROBE gui/501 exit=0\n")).toEqual({
      sessionPresent: true,
      reason: "launchctl print gui/<uid> succeeded",
    })
  })

  test("exit=125 with the canonical macOS signature → no session, diagnostic reason", () => {
    const probe =
      "GUI_SESSION_PROBE gui/501 exit=125\nCould not print domain gui/501: Domain does not support specified action\n"
    expect(decideGuiSession(probe)).toEqual({
      sessionPresent: false,
      reason: "no GUI session (launchctl exit 125: Domain does not support specified action)",
    })
  })

  test("non-zero exit without the canonical signature → no session, exit-code reason", () => {
    expect(
      decideGuiSession("GUI_SESSION_PROBE gui/501 exit=1\nsome other launchctl error\n")
    ).toEqual({
      sessionPresent: false,
      reason: "no GUI session (launchctl exit 1)",
    })
  })

  test("leading/trailing whitespace and extra lines around the marker are tolerated", () => {
    const probe = "  noise before\n  GUI_SESSION_PROBE gui/501 exit=0  \ntrailing noise\n"
    expect(decideGuiSession(probe)).toEqual({
      sessionPresent: true,
      reason: "launchctl print gui/<uid> succeeded",
    })
  })

  test("no marker at all → fail closed (block the apply)", () => {
    expect(decideGuiSession("")).toEqual({
      sessionPresent: false,
      reason: "gui-session probe emitted no recognizable marker line",
    })
    expect(decideGuiSession("totally unrelated output\n")).toEqual({
      sessionPresent: false,
      reason: "gui-session probe emitted no recognizable marker line",
    })
  })

  test("marker present but no parseable exit code → fail closed", () => {
    expect(decideGuiSession("GUI_SESSION_PROBE gui/501 status=unknown\n")).toEqual({
      sessionPresent: false,
      reason:
        "gui-session probe marker missing exit code: GUI_SESSION_PROBE gui/501 status=unknown",
    })
  })
})

describe("buildGuiSessionProbeScript", () => {
  test("probes gui/$uid, captures the exit code, and never fails the ssh", () => {
    const script = buildGuiSessionProbeScript()
    expect(script).toContain(`uid="$(id -u)"`)
    expect(script).toContain(`launchctl print "gui/$uid"`)
    expect(script).toContain("2>&1 >/dev/null")
    expect(script).toContain("ec=$?")
    expect(script).toContain("GUI_SESSION_PROBE gui/%s exit=%s")
  })
})
