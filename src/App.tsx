import { useContext, useEffect, useState } from "react";
import "./App.css";
import { AppContext } from "./context/context";
import { TableItem } from "./components/tableItem";
import { AdminDataType } from "./types";
import { Pagination } from "./components/pagination";

function App() {
  const { currentPageItems, deleteSelected, selectAll,setSearchText } =
    useContext(AppContext);
  const allChecked = currentPageItems.every((item) => item.isSelected);
  const anyChecked=currentPageItems.some(item=>item.isSelected);
  const [searchString,setSearchString]=useState<string>('');

  const handleSearch = () => {
    setSearchText(searchString);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    searchString === "" ? handleSearch() : null;
  }, [searchString]);

  return (
    <div className="App">
      <header className="App-header">
        <p>Admin UI</p>
        <input
          type="search"
          name=""
          id="search"
          placeholder="Search"
          className="header-search"
          onChange={(e) => setSearchString(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </header>
      {currentPageItems.length > 0 ? (
        <>
          <table className="table-item">
            <thead>
              <tr key="tableHead">
                <th key="selectAll">
                  <input
                    type="checkbox"
                    id="selectAll"
                    onChange={() => selectAll()}
                    checked={allChecked}
                  />
                </th>
                <th key="name">Name</th>
                <th key="email">Email</th>
                <th key="role">Role</th>
                <th key="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPageItems.map((eachAdmin: AdminDataType) => {
                return <TableItem eachAdmin={eachAdmin} />;
              })}
            </tbody>
          </table>
          <div className="navigator">
            <button
              type="button"
              className={`delete-selected ${!anyChecked && 'disable-status'}`}
              onClick={() => deleteSelected()}
              disabled={!anyChecked}
            >
              Delete Selected
            </button>
            <Pagination />
          </div>
        </>
      ) : (
        <div className="no-list">No List found</div>
      )}
    </div>
  );
}

export default App;
