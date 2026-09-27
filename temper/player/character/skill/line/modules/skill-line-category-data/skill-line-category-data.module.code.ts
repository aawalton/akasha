interface SkillLineCategoryTemplate {
  readonly id: string
  readonly displayOrder: number
}

const SKILL_LINE_CATEGORY_DATA = {
  "none": { id: "none" as const, displayOrder: 0 },
  "class": { id: "class" as const, displayOrder: 1 },
  "weapon": { id: "weapon" as const, displayOrder: 22 },
  "armor": { id: "armor" as const, displayOrder: 28 },
  "world": { id: "world" as const, displayOrder: 31 },
  "guild": { id: "guild" as const, displayOrder: 37 },
  "alliance-war": { id: "alliance-war" as const, displayOrder: 43 },
  "racial": { id: "racial" as const, displayOrder: 46 },
  "craft": { id: "craft" as const, displayOrder: 56 },
  "companion": { id: "companion" as const, displayOrder: 63 },
} satisfies Record<string, SkillLineCategoryTemplate>

export type SkillLineCategoryId = keyof typeof SKILL_LINE_CATEGORY_DATA

type SkillLineCategory = (typeof SKILL_LINE_CATEGORY_DATA)[SkillLineCategoryId]

function categoryTableOf(data: typeof SKILL_LINE_CATEGORY_DATA) {
  const list: readonly SkillLineCategory[] = Object.values(data)
  return {
    data,
    ids: list.map((one) => one.id),
    list,
    has: (id: string): id is SkillLineCategoryId => id in data,
  } as const
}

export const skillLineCategories = categoryTableOf(SKILL_LINE_CATEGORY_DATA)

export const skillLineCategoriesSorted = [...skillLineCategories.list].sort(
  (a, b) => a.displayOrder - b.displayOrder
)
