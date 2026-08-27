interface FcoCompassContainer {
  SetAlphaDropoffBehavior(pinType: number, a: number, b: number, c: number, d: number): void
}

interface FcoCompass {
  container: FcoCompassContainer
}

declare const COMPASS: FcoCompass
