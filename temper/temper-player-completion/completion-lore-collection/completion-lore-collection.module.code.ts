export interface LoreBookInput {
  bookIndex: number
  name: string
}

export interface LoreCollectionInput {
  collectionIndex: number
  name: string
  books: readonly LoreBookInput[]
}

export interface FirstIncompleteLoreCollection {
  collectionName: string
  unreadBookNames: readonly string[]
  totalBooks: number
  knownBooks: number
}

const DEFAULT_BOOK_LIMIT = 5

function byName<T extends { name: string }>(a: T, b: T): number {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}

export function findFirstIncompleteLoreCollection(
  collections: readonly LoreCollectionInput[],
  knownSet: ReadonlySet<string>,
  categoryIndex: number,
  limit: number = DEFAULT_BOOK_LIMIT
): FirstIncompleteLoreCollection | undefined {
  const sortedCollections = [...collections].sort(byName)

  for (const collection of sortedCollections) {
    const unreadBooks = [...collection.books]
      .filter(
        (book) => !knownSet.has(`${categoryIndex}:${collection.collectionIndex}:${book.bookIndex}`)
      )
      .sort(byName)

    if (unreadBooks.length > 0) {
      const totalBooks = collection.books.length
      return {
        collectionName: collection.name,
        unreadBookNames: unreadBooks.slice(0, limit).map((book) => book.name),
        totalBooks,
        knownBooks: totalBooks - unreadBooks.length,
      }
    }
  }

  return undefined
}
