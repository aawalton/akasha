interface EnchantSoundPlayer {
  PlaySound: (this: EnchantSoundPlayer, soundName?: string, soundLength?: number) => void
}

declare const CRAFTING_RESULTS: { enchantSoundPlayer?: EnchantSoundPlayer } | undefined

let installed = false

export function buildNilLengthSafePlaySound(
  original: EnchantSoundPlayer["PlaySound"]
): (this: EnchantSoundPlayer, soundName?: string, soundLength?: number) => void {
  return function (this: EnchantSoundPlayer, soundName?: string, soundLength?: number): undefined {
    original.call(this, soundName, soundLength ?? 0)
  }
}

export function ensureEnchantSoundGuard(this: void): undefined {
  if (installed) return
  const player = CRAFTING_RESULTS?.enchantSoundPlayer
  if (player === undefined) return
  player.PlaySound = buildNilLengthSafePlaySound(player.PlaySound)
  installed = true
}
