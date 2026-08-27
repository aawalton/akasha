export function progressSuffix(current: number, total: number): string {
  return `(${current}/${total})`
}

export function countSuffix(count: number): string {
  return `(${count})`
}

export function formatProgressCount(label: string, current: number, total: number): string {
  return `${label} ${progressSuffix(current, total)}`
}
