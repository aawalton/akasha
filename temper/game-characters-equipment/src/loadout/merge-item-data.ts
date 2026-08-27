export function mergeItemData<T>(current: T, updates: Partial<T>): T {
  return { ...current, ...updates }
}
