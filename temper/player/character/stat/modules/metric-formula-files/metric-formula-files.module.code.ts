import "akasha/code/router-app/vite-client/vite-client.type-declaration.d.ts"

type Filed = { readonly FORMULA: object }

const ENDING = ".temper-metric.formula.ts"

const FOUND = import.meta.glob<Filed>("../../temper-metric/pages/**/*.temper-metric.formula.ts", {
  eager: true,
})

function slugOf(path: string): string {
  const name = path.slice(path.lastIndexOf("/") + 1)
  return name.slice(0, name.length - ENDING.length)
}

export const FORMULAS: ReadonlyMap<string, object> = new Map(
  Object.entries(FOUND).map(([path, filed]) => [slugOf(path), filed.FORMULA])
)
