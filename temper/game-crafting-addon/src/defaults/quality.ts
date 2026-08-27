export interface CsQualityColor {
  1: number
  2: number
  3: number
  4: number
}

export const Quality: Record<number, CsQualityColor> = {
  0: { 1: 0.65, 2: 0.65, 3: 0.65, 4: 1 },
  1: { 1: 1, 2: 1, 3: 1, 4: 1 },
  2: { 1: 0.17, 2: 0.77, 3: 0.05, 4: 1 },
  3: { 1: 0.22, 2: 0.57, 3: 1, 4: 1 },
  4: { 1: 0.62, 2: 0.18, 3: 0.96, 4: 1 },
  5: { 1: 0.8, 2: 0.66, 3: 0.1, 4: 1 },
}

export const QualityHex: Record<number, string> = {
  0: "B3B3B3",
  1: "FFFFFF",
  2: "2DC50E",
  3: "3A92FF",
  4: "A02EF7",
  5: "EECA2A",
}
