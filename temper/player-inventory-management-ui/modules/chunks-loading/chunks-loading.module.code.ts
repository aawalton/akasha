export function chunksStillLoading(params: {
  readIsLoading: boolean
  loadedCount: number
  expectedCount: number | null
}): boolean {
  const { readIsLoading, loadedCount, expectedCount } = params
  if (readIsLoading) return true
  if (expectedCount === null) return false
  return loadedCount < expectedCount
}
