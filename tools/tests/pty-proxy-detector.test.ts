
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import { createRisingEdgeDetector } from "../lib/pty-proxy-detector.ts"

const MARKER = "I am using this for local development"

function enc(s: string): Uint8Array {
  return new TextEncoder().encode(s)
}

const inkMenu = [
  "\x1b[3G\x1b[38;2;177;185;249m❯\x1b[5G\x1b[38;2;153;153;153m1.",
  "\x1b[8G\x1b[38;2;177;185;249mI\x1b[10Gam\x1b[13Gusing\x1b[19Gthis",
  "\x1b[24Gfor\x1b[28Glocal\x1b[34Gdevelopment\x1b[39m\r\r\n",
  "\x1b[5G\x1b[38;2;153;153;153m2.\x1b[8G\x1b[39mExit\r\r\n",
].join("")

const warn =
  "\x1b[3G--dangerously-load-development-channels\x1b[43Gis\x1b[46Gfor\x1b[50Glocal\x1b[56Gchannel\x1b[64Gdevelopment\x1b[76Gonly.\r\r\n"

const half = Math.floor(MARKER.length / 2)
const inkCut = Math.floor(inkMenu.length / 2)
const utf8Cut = "caf".length + 1

interface Case {
  readonly name: string
  readonly marker: string
  readonly chunks: readonly Uint8Array[]
  readonly standing: Record<string, unknown>
}

const CASES: readonly Case[] = [
  {
    name: "fires once when the marker appears in a single chunk",
    marker: MARKER,
    chunks: [enc(`WARNING\n  ❯ 1. ${MARKER}\n  2. Exit\n`)],
    standing: { fired: [true] },
  },
  {
    name: "does not fire on chunks that lack the marker",
    marker: MARKER,
    chunks: [enc("some unrelated banner output\n")],
    standing: { fired: [false] },
  },
  {
    name: "fires only on the rising edge, not while the marker stays visible",
    marker: MARKER,
    chunks: [enc(`prompt: ${MARKER}`), enc(" "), enc("x")],
    standing: { fired: [true, false, false] },
  },
  {
    name: "detects a marker split across two chunks",
    marker: MARKER,
    chunks: [enc(MARKER.slice(0, half)), enc(MARKER.slice(half))],
    standing: { fired: [false, true] },
  },
  {
    name: "re-arms and fires again after the marker scrolls out (supervisor restart)",
    marker: MARKER,
    chunks: [enc(MARKER), enc("y".repeat(512)), enc(MARKER)],
    standing: { fired: [true, false, true] },
  },
  {
    name: "handles multi-byte UTF-8 split across the chunk boundary",
    marker: "café-menu",
    chunks: [enc("café-menu").slice(0, utf8Cut), enc("café-menu").slice(utf8Cut)],
    standing: { fired: [false, true] },
  },
  {
    name: "never fires for output that never contains the marker",
    marker: MARKER,
    chunks: ["boot\n", "loading\n", "ready\n", "› prompt\n"].map(enc),
    standing: { fired: [false, false, false, false] },
  },
  {
    name: "fires when Ink splits the marker with cursor-position escapes",
    marker: MARKER,
    chunks: [enc(inkMenu)],
    standing: { fired: [true] },
  },
  {
    name: "detects the Ink-rendered marker split across chunk boundaries",
    marker: MARKER,
    chunks: [enc(inkMenu.slice(0, inkCut)), enc(inkMenu.slice(inkCut))],
    standing: { fired: [false, true] },
  },
  {
    name: "does not fire on the dev-channels warning body alone (no menu label)",
    marker: MARKER,
    chunks: [enc(warn)],
    standing: { fired: [false] },
  },
  {
    name: "fires for a marker sitting mid-chunk behind more output than the window keeps",
    marker: MARKER,
    chunks: [enc(`${inkMenu}${"\x1b[2K\x1b[1G".repeat(80)}`)],
    standing: { fired: [true] },
  },
]

function run(one: Case): Record<string, unknown> {
  const detector = createRisingEdgeDetector(one.marker)
  return { fired: one.chunks.map((chunk) => detector.push(chunk)) }
}

function projected(answered: Record<string, unknown>, shape: Record<string, unknown>): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(shape)) picked[key] = answered[key]
  return picked
}

describe("createRisingEdgeDetector, held against what the code repository asserts", () => {
  for (const one of CASES) {
    it(one.name, () => {
      const answered = decided("ported", { value: run(one), notice: null })
      const verdict = hold(one.name, one.standing, projected(answered, one.standing))
      expect(verdict.matches).toBe(true)
    })
  }

  it("asserts one firing per chunk fed, so no chunk in any case goes unasserted", () => {
    let chunks = 0
    let asserted = 0
    for (const one of CASES) {
      expect(Object.keys(one.standing).length).toBeGreaterThan(0)
      chunks += one.chunks.length
      asserted += (one.standing.fired as readonly unknown[]).length
    }
    expect(asserted).toBe(chunks)
  })
})
