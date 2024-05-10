import { useContext } from "react";
import { AppContext } from "../context/context";

export const Pagination = () => {
  const { setCurrentPage, currentPage, numberOfPages } = useContext(AppContext);
  return (
    <>
      {numberOfPages > 0 ? (
        <div className="pagination-container">
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="first-page pagination-button"
          >{`<<`}</button>
          <button
            type="button"
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
            disabled={currentPage === 1}
            className="previous-page pagination-button"
          >{`<`}</button>

          {Array.from({ length: numberOfPages }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentPage(index + 1)}
              className={`${index + 1} pagination-button ${
                currentPage === index + 1 && "active-button"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
            disabled={currentPage === numberOfPages}
            className="next-page pagination-button"
          >{`>`}</button>

          <button
            type="button"
            onClick={() => setCurrentPage(numberOfPages)}
            disabled={currentPage === numberOfPages}
            className="last-page pagination-button"
          >{`>>`}</button>
        </div>
      ) : null}
    </>
  );
};
