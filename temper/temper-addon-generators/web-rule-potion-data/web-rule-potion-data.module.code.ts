export const WEB_POTION_DATA_HELPER = `/**
 * Parse the PotionData field (last colon-separated numeric field before |h)
 * from an ESO item link. Web-side regex parse; feeds the shared
 * \`resolvePotionRestoreMetricIds\` classifier for web/addon parity.
 */
function parsePotionDataFromLink(itemLink: string): number {
  const match = /:(\\d+)\\|h/.exec(itemLink)
  if (match === null) return 0
  const parsed = Number.parseInt(match[1] ?? "", 10)
  return Number.isNaN(parsed) ? 0 : parsed
}`
