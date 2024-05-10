import React from "react"

export type AdminDataResponse={
    id: string
  name: string
  email: string
  role: string
}

export type AdminDataType={
  id: string
  name: string
  email: string
  role: string
isSelected:boolean
isEditMode:boolean
}

export type ContextProps={
    adminData:AdminDataType[],
    setSearchText:React.Dispatch<React.SetStateAction<string>>,
    currentPageItems:AdminDataType[],
    setCurrentPage:React.Dispatch<React.SetStateAction<number>>
    numberOfPages:number,
    currentPage:number,
    toggleSelection:(toggleSelection:AdminDataType)=>void,
    deleteSelected:()=>void,
    selectAll:()=>void,
    deleteSingleItem:(id:string)=>void,
    toggleEdit:(x:string)=>void,
    saveUpdatedValue:(x:AdminDataType)=>void
}
