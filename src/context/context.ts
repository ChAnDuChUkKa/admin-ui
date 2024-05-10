import { createContext } from "react";
import { ContextProps } from "../types";

export const AppContext=createContext<ContextProps>({
adminData:[],
setSearchText:()=>{},
currentPageItems:[],
setCurrentPage:()=>{},
numberOfPages:0,
currentPage:1,
toggleSelection:()=>{},
deleteSelected:()=>{},
selectAll:()=>{},
deleteSingleItem:()=>{},
toggleEdit:()=>{},
saveUpdatedValue:()=>{}
});