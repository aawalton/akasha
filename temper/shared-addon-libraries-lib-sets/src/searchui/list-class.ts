const listClass = ZO_SortFilterList.Subclass<LibSetsSearchUIListClass>()

export function getSearchUIListClass(this: void): LibSetsSearchUIListClass {
  return listClass
}

LibSets_SearchUI_List = listClass
