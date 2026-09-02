import type { GrimoireEntry, ScribingProgress, ScriptEntry } from "@akasha/temper-completion/completion-progress"

function preferPopulated(stored: string, fresh: string): string {
  return fresh !== "" ? fresh : stored
}

function mergeGrimoire(stored: GrimoireEntry, fresh: GrimoireEntry): GrimoireEntry {
  return {
    name: preferPopulated(stored.name, fresh.name),
    unlocked: stored.unlocked || fresh.unlocked,
  }
}

function mergeScript(stored: ScriptEntry, fresh: ScriptEntry): ScriptEntry {
  const freshIsPopulated = fresh.name !== ""
  return {
    name: freshIsPopulated ? fresh.name : stored.name,
    slot: freshIsPopulated ? fresh.slot : stored.slot,
    unlocked: stored.unlocked || fresh.unlocked,
  }
}

function mergeGrimoires(
  stored: Record<number, GrimoireEntry>,
  fresh: Record<number, GrimoireEntry>
): Record<number, GrimoireEntry> {
  const merged: Record<number, GrimoireEntry> = {}
  for (const [key, storedGrimoire] of Object.entries(stored)) {
    merged[Number(key)] = storedGrimoire
  }
  for (const [key, freshGrimoire] of Object.entries(fresh)) {
    const index = Number(key)
    const priorGrimoire = merged[index]
    merged[index] =
      priorGrimoire === undefined ? freshGrimoire : mergeGrimoire(priorGrimoire, freshGrimoire)
  }
  return merged
}

function mergeScripts(
  stored: Record<number, ScriptEntry>,
  fresh: Record<number, ScriptEntry>
): Record<number, ScriptEntry> {
  const merged: Record<number, ScriptEntry> = {}
  for (const [key, storedScript] of Object.entries(stored)) {
    merged[Number(key)] = storedScript
  }
  for (const [key, freshScript] of Object.entries(fresh)) {
    const index = Number(key)
    const priorScript = merged[index]
    merged[index] = priorScript === undefined ? freshScript : mergeScript(priorScript, freshScript)
  }
  return merged
}

export function mergeScribing(
  stored: ScribingProgress | undefined,
  fresh: ScribingProgress
): ScribingProgress {
  if (stored === undefined) return fresh

  return {
    grimoires: mergeGrimoires(stored.grimoires, fresh.grimoires),
    scripts: mergeScripts(stored.scripts, fresh.scripts),
  }
}
