import { expect, test } from "bun:test"
import {
  buildNilLengthSafePlaySound,
  ensureEnchantSoundGuard,
} from "./writ-crafting-enchant-sound-guard"

interface RecordedCall {
  self: unknown
  soundName: string | undefined
  soundLength: number | undefined
}

function makeBaseSoundPlayer(): {
  player: { PlaySound: (soundName?: string, soundLength?: number) => void }
  calls: RecordedCall[]
} {
  const calls: RecordedCall[] = []
  const player = {
    PlaySound(this: unknown, soundName?: string, soundLength?: number): undefined {
      if (soundLength === undefined || soundLength === null) {
        throw new Error("operator + is not supported for nil + number")
      }
      calls.push({ self: this, soundName, soundLength })
    },
  }
  return { player, calls }
}

function setCraftingResults(value: unknown): undefined {
  Reflect.set(globalThis, "CRAFTING_RESULTS", value)
}

test("buildNilLengthSafePlaySound coalesces a nil soundLength to 0 before the original", () => {
  const calls: RecordedCall[] = []
  const original = function (this: unknown, soundName?: string, soundLength?: number): undefined {
    calls.push({ self: this, soundName, soundLength })
  }
  const wrapped = buildNilLengthSafePlaySound(original)
  const receiver = { id: "ZO_QueuedSoundPlayer2" }
  wrapped.call(receiver, "Enchanting_Create_Tooltip_Glow", undefined)
  expect(calls).toEqual([
    { self: receiver, soundName: "Enchanting_Create_Tooltip_Glow", soundLength: 0 },
  ])
})

test("buildNilLengthSafePlaySound forwards a real soundLength unchanged", () => {
  const calls: RecordedCall[] = []
  const original = function (this: unknown, soundName?: string, soundLength?: number): undefined {
    calls.push({ self: this, soundName, soundLength })
  }
  const wrapped = buildNilLengthSafePlaySound(original)
  const receiver = { id: "ZO_QueuedSoundPlayer2" }
  wrapped.call(receiver, "Enchanting_Create_Tooltip_Glow", 250)
  expect(calls).toEqual([
    { self: receiver, soundName: "Enchanting_Create_Tooltip_Glow", soundLength: 250 },
  ])
})

test("ensureEnchantSoundGuard is a no-op when the enchant sound player is not built yet", () => {
  setCraftingResults({})
  expect(() => ensureEnchantSoundGuard()).not.toThrow()
})

test("ensureEnchantSoundGuard wraps PlaySound so a nil length no longer crashes, and is idempotent", () => {
  const { player, calls } = makeBaseSoundPlayer()
  setCraftingResults({ enchantSoundPlayer: player })

  expect(() => player.PlaySound("Enchanting_Create_Tooltip_Glow", undefined)).toThrow()

  ensureEnchantSoundGuard()

  expect(() => player.PlaySound("Enchanting_Create_Tooltip_Glow", undefined)).not.toThrow()
  expect(calls).toEqual([
    { self: player, soundName: "Enchanting_Create_Tooltip_Glow", soundLength: 0 },
  ])

  player.PlaySound("Enchanting_Create_Tooltip_Glow", 250)
  expect(calls[1]).toEqual({
    self: player,
    soundName: "Enchanting_Create_Tooltip_Glow",
    soundLength: 250,
  })

  const afterFirst = player.PlaySound
  ensureEnchantSoundGuard()
  expect(player.PlaySound).toBe(afterFirst)
})
