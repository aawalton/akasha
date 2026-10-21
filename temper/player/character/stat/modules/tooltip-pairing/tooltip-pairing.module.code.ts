export type TooltipNumber = {
  readonly placeholder: number
  readonly equation: string
  readonly scaled: boolean
  readonly game: number
  readonly temper: number | null
}

export type TooltipPairing =
  | { readonly paired: true; readonly numbers: readonly TooltipNumber[] }
  | { readonly paired: false; readonly shown: readonly number[]; readonly equations: number }
