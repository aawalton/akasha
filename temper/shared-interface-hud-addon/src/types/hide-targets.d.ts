interface CompassHideTarget {
  SetCompassHidden(hidden: boolean): void
}

interface TopLevelHideTarget {
  SetTopLevelHidden(hidden: boolean): void
}

interface RequestHideTarget {
  RequestHidden(hidden: boolean): void
}

interface SupressHideTarget {
  SetSupressed(suppressed: boolean, reason: string): void
}

interface TutorialSuppressTarget {
  SuppressTutorialType(tutorialType: number, suppressed: boolean, reason: number): void
}
