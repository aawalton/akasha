
export const summary = "Long-press at (--x,--y) then drag to (--to-x,--to-y) and release — a native touch gesture that opens a long-press context menu (~800ms hold) and drags to an item. Reuses the active session"

import type { CommandHelp } from "../../../ops/surface.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { appiumClient, simDriver } from "../../../lib/sim-driving.ts"

const DEFAULT_HOLD_MS = 800
const DEFAULT_STEPS = 12
const DEFAULT_STEP_MS = 30

export const help: CommandHelp = {
  flags: [
    {
      name: "--x",
      argLabel: "<px>",
      valueShape: "token",
      required: true,
      description: "Start viewport x (long-press point).",
    },
    {
      name: "--y",
      argLabel: "<px>",
      valueShape: "token",
      required: true,
      description: "Start viewport y (long-press point).",
    },
    {
      name: "--to-x",
      argLabel: "<px>",
      valueShape: "token",
      required: true,
      description: "End viewport x (drag target).",
    },
    {
      name: "--to-y",
      argLabel: "<px>",
      valueShape: "token",
      required: true,
      description: "End viewport y (drag target).",
    },
    {
      name: "--hold-ms",
      argLabel: "<ms>",
      valueShape: "token",
      description: `Long-press hold before dragging (default ${DEFAULT_HOLD_MS}).`,
    },
    {
      name: "--steps",
      argLabel: "<n>",
      valueShape: "token",
      description: `Interleaved drag steps (default ${DEFAULT_STEPS}).`,
    },
    {
      name: "--step-ms",
      argLabel: "<ms>",
      valueShape: "token",
      description: `Duration per drag step (default ${DEFAULT_STEP_MS}).`,
    },
  ],
  exits: [
    { code: 1, meaning: "input error: a required coordinate is missing" },
    { code: 3, meaning: "operational error: no live session or the gesture failed" },
  ],
  examples: [
    "ops mobile sim long-press-drag --x 180 --y 200 --to-x 180 --to-y 420",
    "ops mobile sim long-press-drag --x 180 --y 200 --to-x 180 --to-y 200 --hold-ms 900",
  ],
}

export default async function simLongPressDrag(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const x = parsed.requireNonNegativeInt("--x")
  const y = parsed.requireNonNegativeInt("--y")
  const toX = parsed.requireNonNegativeInt("--to-x")
  const toY = parsed.requireNonNegativeInt("--to-y")
  const holdMs = parsed.nonNegativeInt("--hold-ms") ?? DEFAULT_HOLD_MS
  const steps = parsed.nonNegativeInt("--steps") ?? DEFAULT_STEPS
  const stepMs = parsed.nonNegativeInt("--step-ms") ?? DEFAULT_STEP_MS

  const driver = await simDriver()
  const appium = await appiumClient()
  const state = await driver.attachWebview(driver.requireDrivingState())
  await appium.longPressDrag(state.appiumBase, state.sessionId, {
    x,
    y,
    toX,
    toY,
    holdMs,
    steps,
    stepMs,
  })
  process.stdout.write(`✓ long-press-drag (${x}, ${y}) → (${toX}, ${toY}) hold=${holdMs}ms\n`)
}
