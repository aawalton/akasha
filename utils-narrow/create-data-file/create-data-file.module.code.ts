export type DataFile<K extends string, V, S extends string = never> = {
  readonly data: Record<K, V>
  readonly ids: readonly K[]
  readonly list: readonly V[]
  readonly subcategories: Partial<
    Record<
      S,
      {
        readonly ids: readonly K[]
        readonly list: readonly V[]
        readonly data: Partial<Record<K, V>>
      }
    >
  >
  readonly has: (id: string) => id is K
}

export const createDataFile = <Template extends { name: string }>() => {
  return <K extends string, S extends string, V extends Template & { id: K; subcategoryId?: S }>(
    data: Record<K, V>
  ) => {
    type SubcategoryEntry = { ids: readonly K[]; list: readonly V[]; data: Partial<Record<K, V>> }

    const list: V[] = Object.values(data)
    const ids: K[] = list.map((item) => item.id)

    const idsByCat = new Map<S, K[]>()
    const listByCat = new Map<S, V[]>()
    const dataByCat = new Map<S, Partial<Record<K, V>>>()

    for (const item of list) {
      const subId = item.subcategoryId
      if (!subId) continue
      const subIds: K[] = idsByCat.get(subId) ?? []
      const subList: V[] = listByCat.get(subId) ?? []
      const subData: Partial<Record<K, V>> = dataByCat.get(subId) ?? {}
      subIds.push(item.id)
      subList.push(item)
      subData[item.id] = item
      idsByCat.set(subId, subIds)
      listByCat.set(subId, subList)
      dataByCat.set(subId, subData)
    }
    const subcategories: Partial<Record<S, SubcategoryEntry>> = {}
    for (const [k, subIds] of idsByCat) {
      subcategories[k] = {
        ids: subIds,
        list: listByCat.get(k) ?? [],
        data: dataByCat.get(k) ?? {},
      }
    }

    return {
      data,
      ids,
      list,
      subcategories,
      has: (id: string): id is K => id in data,
    } as const
  }
}
