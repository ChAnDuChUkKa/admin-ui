import { useEffect, useState } from "react";
import { AppContext } from "./context";
import { AdminDataResponse, AdminDataType } from "../types";
import axios from "axios";
import { RecordsPerPage } from "../utils";

export const AppProvider = ({ children }: any) => {
  const [adminData, setAdminData] = useState<AdminDataType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageItems, setCurrentPageItems] = useState<AdminDataType[]>([]);
  const [searchAdminRecords, setSearchAdminRecords] = useState<AdminDataType[]>(
    []
  );
  const [searchText, setSearchText] = useState<string>("");
  const [numberOfPages, setNumberOfPages] = useState(1);

  useEffect(() => {
    console.log({ currentPage });
    const startIndex = (currentPage - 1) * RecordsPerPage;
    const endIndex = startIndex + RecordsPerPage;
    setCurrentPageItems(searchAdminRecords.slice(startIndex, endIndex));
  }, [currentPage, searchAdminRecords]);

  useEffect(() => {
    axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((res) => {
        const updatedData: AdminDataType[] = res.data.map(
          (eachData: AdminDataResponse) => {
            return { ...eachData, isSelected: false, isEditMode: false };
          }
        );
        setAdminData(updatedData);
        setSearchAdminRecords(updatedData)
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (searchText === "") {
      setNumberOfPages(Math.ceil(adminData.length / RecordsPerPage));
      setSearchAdminRecords(adminData);
    } else {
      console.log({ adminData });
      const filteredData = adminData.filter((eachAdmin: AdminDataResponse) => {
        return (
          eachAdmin.email.toLowerCase().includes(searchText.toLowerCase()) ||
          eachAdmin.name.toLowerCase().includes(searchText.toLowerCase()) ||
          eachAdmin.role.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setNumberOfPages(Math.ceil(filteredData.length / RecordsPerPage));
      setSearchAdminRecords(filteredData);
    }
  }, [searchText, adminData]);

  const toggleSelection = (currentItem: AdminDataType) => {
    const adminItem = adminData.find((item) => item.id === currentItem.id);
    if (adminItem) {
      const updatedAdminData = adminData.map((eachAdmin) =>
        eachAdmin.id === currentItem.id ? currentItem : eachAdmin
      );
      setAdminData(updatedAdminData);
    }
  };

  const deleteSelected = () => {
    const selectedAdmins = adminData.filter(
      (item) => item.isSelected === false
    );
    setAdminData(selectedAdmins);
    setCurrentPage(1);
  };

  const selectAll = () => {
    const updatedAdminData = adminData.map((item) => {
      if (currentPageItems.some((currentItem) => currentItem.id === item.id)) {
        return { ...item, isSelected: !item.isSelected };
      } else {
        return item;
      }
    });
    setAdminData(updatedAdminData);
  };

  const deleteSingleItem = (id: string) => {
    const filterAdmin = adminData.filter((item) => item.id !== id);
    setAdminData(filterAdmin);
    setSearchAdminRecords(filterAdmin);
  };

  const toggleEdit = (id: string) => {
    const updatedDataItems = adminData.map((item) => {
      return item.id === id ? { ...item, isEditMode: !item.isEditMode } : item;
    });
    setAdminData(updatedDataItems);
    setSearchAdminRecords(updatedDataItems);
  };

  const saveUpdatedValue = (updatedEditData: AdminDataType) => {
    const adminItem = adminData.find((item) => item.id === updatedEditData.id);
    if (adminItem) {
      const updatedAdminData = adminData.map((eachAdmin) =>
        eachAdmin.id === updatedEditData.id
          ? { ...updatedEditData, isEditMode: false }
          : eachAdmin
      );
      setAdminData(updatedAdminData);
      setSearchAdminRecords(updatedAdminData);
    }
  };

  const contextValues = {
    adminData,
    setSearchText,
    currentPageItems,
    setCurrentPage,
    numberOfPages,
    currentPage,
    toggleSelection,
    deleteSelected,
    selectAll,
    deleteSingleItem,
    saveUpdatedValue,
    toggleEdit,
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};
