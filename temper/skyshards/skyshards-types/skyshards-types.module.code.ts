export type SkyshardPin =
  | readonly [
      locX: number,
      locY: number,
      achievementId: number,
      criteriaIndex: number,
      moreInfo?: number,
    ]
  | readonly [
      locX: number,
      locY: number,
      achievementId: number,
      criteriaIndex: number,
      moreInfo: number,
      moreInfo2: number,
    ]

export type SkyshardsData = Record<string, Record<string, readonly SkyshardPin[]>>
