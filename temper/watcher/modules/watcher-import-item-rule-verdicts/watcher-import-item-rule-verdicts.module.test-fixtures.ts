import type { VerdictUserSource } from "akasha/temper/watcher/modules/watcher-import-item-rule-verdicts/watcher-import-item-rule-verdicts.module.code.ts"

export function knownUserSource(userId: string): VerdictUserSource {
  return { userId: async () => userId }
}
