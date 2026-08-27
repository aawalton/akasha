import { state } from "./runtime-state"

const SUPPORTED_BOOKSHELF_LOCALES: Record<string, boolean> = {
  en: true,
  de: true,
  fr: true,
  ru: true,
}

export const bookShelfLocalization: Record<string, string> = {
  en: "Bookshelf",
  de: "Bücherregal",
  fr: "Étagère de livres",
  ru: "Книжная полка",
}

export const bookStackLocalization: Record<string, string> = {
  en: "Book Stack",
  de: "Bücherstapel",
  fr: "Pile de livres",
  ru: "Стопка книг",
}

export const bookLocalization: Record<string, string> = {
  en: "Book",
  de: "Buch",
  fr: "Livre",
  ru: "Книга",
}

export function initializeLocales(): undefined {
  const locale = GetCVar("Language.2")
  state.currentBookshelfLocale = SUPPORTED_BOOKSHELF_LOCALES[locale] === true ? locale : "en"
}
