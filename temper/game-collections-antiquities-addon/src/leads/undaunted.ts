export interface PledgeDungeon {
  GetNormalId: (this: PledgeDungeon) => number
  GetName: (this: PledgeDungeon) => string
}

interface UndauntedDailyApi {
  GetPledgeDungeons: (this: void) => PledgeDungeon[] | undefined
}

declare global {
  var UndauntedDaily: UndauntedDailyApi | undefined
}

export function getPledgeDungeons(): PledgeDungeon[] | undefined {
  if (UndauntedDaily === undefined) {
    return undefined
  }
  return UndauntedDaily.GetPledgeDungeons()
}
