import {
  loreBooksGetNewLoreBookInfo,
  loreBooksGetNewLoreCollectionInfo,
} from "../lorebooks-data-accessors/lorebooks-data-accessors.module.code.ts"

const BOOK_DATA_TYPE = 1
const HIRELING_MESSAGE_DATA_TYPE = 2
const HIRELING_MESSAGE_HEADER_TYPE = 3

export interface HirelingCollectionData {
  hirelingType: number
  name: string
  numKnownBooks: number
  totalBooks: number
}

interface HirelingMessageData {
  hirelingType: number
  sender: string
  subject: string
  body: string
  icon: string
  title: string
  messageIndex: number
  sortOrder?: number
}

type SelfWithOwner = { owner: LoreLibraryObject }
type SelfWithList = { list: object }
function asSelfWithOwner(value: unknown): SelfWithOwner {
  return value as SelfWithOwner
}
function asSelfWithList(value: unknown): SelfWithList {
  return value as SelfWithList
}
function asControl(value: unknown): Control {
  return value as Control
}

function sanitize(value: string): string {
  const [escaped] = string.gsub(value, "[-*+?^$().[%]%%]", "%%%0")
  return escaped
}

export function getHirelingMessageCollection(hirelingType: number): HirelingCollectionData {
  const [numHirelingMessages, maxHirelingMessages] =
    GetNumUnlockedHirelingCorrespondence(hirelingType)
  return {
    hirelingType,
    name: GetString("SI_HIRELINGTYPE", hirelingType),
    numKnownBooks: numHirelingMessages,
    totalBooks: maxHirelingMessages,
  }
}

function getHirelingMessages(hirelingType: number): HirelingMessageData[] {
  const [numHirelingMessages] = GetNumUnlockedHirelingCorrespondence(hirelingType)
  const messages: HirelingMessageData[] = []
  for (const messageIndex of $range(1, numHirelingMessages)) {
    const [sender, subject, body, icon] = GetHirelingCorrespondenceInfoByIndex(
      hirelingType,
      messageIndex
    )
    const title = zo_strformat(
      SI_LORE_LIBRARY_HIRELING_CORRESPONDENCE_ENTRY_FORMATTER,
      subject,
      messageIndex
    )
    messages.push({
      hirelingType,
      sender,
      subject,
      body,
      icon,
      title,
      messageIndex,
    })
  }
  return messages
}

export function filterScrollList(this: void, self: LoreLibraryObject["list"]): boolean {
  const owner = asSelfWithOwner(self).owner
  const categoryData = owner.navigationTree.GetSelectedData()
  const scrollList = asSelfWithList(self).list
  const scrollData = ZO_ScrollList_GetDataList<unknown>(asControl(scrollList))
  ZO_ScrollList_Clear(scrollList)

  if (scrollData === undefined) {
    return true
  }

  const search = sanitize(string.lower(LORE_LIBRARY.search))

  if (categoryData.hirelingType !== undefined) {
    const messages = getHirelingMessages(categoryData.hirelingType)
    let currentHirelingSender = ""

    for (const index of $range(1, messages.length)) {
      const messageData = messages[index - 1]
      if (messageData === undefined) continue
      const nextSender = string.lower(messageData.sender)
      if (currentHirelingSender !== nextSender) {
        currentHirelingSender = nextSender
        scrollData.push(
          ZO_ScrollList_CreateDataEntry(HIRELING_MESSAGE_HEADER_TYPE, {
            hirelingType: messageData.hirelingType,
            name: zo_strformat(
              SI_LORE_LIBRARY_HIRELING_CORRESPONDENCE_SENDER_FORMATTER,
              currentHirelingSender
            ),
            sortOrder: index,
          })
        )
      }
      messageData.sortOrder = index
      scrollData.push(ZO_ScrollList_CreateDataEntry(HIRELING_MESSAGE_DATA_TYPE, messageData))
    }
  } else {
    const categoryIndex = owner.GetSelectedCategoryIndex()
    const collectionIndex = owner.GetSelectedCollectionIndex()
    const [, , , totalBooks] = loreBooksGetNewLoreCollectionInfo(categoryIndex, collectionIndex)

    if (search !== "" && string.len(search) >= 2) {
      for (const bookIndex of $range(1, totalBooks)) {
        const [bookName] = loreBooksGetNewLoreBookInfo(categoryIndex, collectionIndex, bookIndex)
        const [match] = string.find(string.lower(bookName), search)
        if (match !== undefined) {
          scrollData[scrollData.length] = ZO_ScrollList_CreateDataEntry(BOOK_DATA_TYPE, {
            categoryIndex,
            collectionIndex,
            bookIndex,
          })
        }
      }
    } else {
      for (const bookIndex of $range(1, totalBooks)) {
        scrollData[scrollData.length] = ZO_ScrollList_CreateDataEntry(BOOK_DATA_TYPE, {
          categoryIndex,
          collectionIndex,
          bookIndex,
        })
      }
    }
  }

  return true
}
