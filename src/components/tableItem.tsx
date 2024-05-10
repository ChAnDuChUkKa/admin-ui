import { AdminDataType } from "../types";
import "../App.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/context";

type TableItemProps = {
  eachAdmin: AdminDataType;
};

export const TableItem = (props: TableItemProps) => {
  const { eachAdmin } = props;
  const { toggleSelection, deleteSingleItem, toggleEdit, saveUpdatedValue } =
    useContext(AppContext);
  const [updateValue, setUpdateValue] = useState<AdminDataType>({
    ...eachAdmin,
  });

  useEffect(() => {
    setUpdateValue({ ...eachAdmin });
  }, [eachAdmin]);

  return (
    <tr
      key={eachAdmin.id}
      className={`table-row ${eachAdmin.isSelected && "selected"}`}
    >
      <td>
        <input
          type="checkbox"
          id={eachAdmin.id}
          checked={eachAdmin.isSelected}
          onChange={(e) =>
            toggleSelection({ ...eachAdmin, isSelected: e.target.checked })
          }
          disabled={eachAdmin.isEditMode}
        />
      </td>
      <td>
        <input
          type="text"
          id={eachAdmin.id}
          value={updateValue.name}
          // value={eachAdmin.name}
          disabled={!eachAdmin.isEditMode}
          onChange={(e) =>
            setUpdateValue((prev) => {
              return { ...prev, name: e.target.value };
            })
          }
          className={`inputbox ${eachAdmin.isEditMode && 'show'}`}
        />
      </td>
      <td>
        <input
          type="email"
          id={eachAdmin.id}
          disabled={!eachAdmin.isEditMode}
          value={updateValue.email}
          onChange={(e) =>
            setUpdateValue((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
          className={`inputemailbox ${eachAdmin.isEditMode && 'show'}`}
        />
      </td>
      <td>
        <input
          type="text"
          value={updateValue.role}
          id={eachAdmin.id}
          disabled={!eachAdmin.isEditMode}
          onChange={(e) =>
            setUpdateValue((prev) => {
              return { ...prev, role: e.target.value };
            })
          }
          className={`inputbox ${eachAdmin.isEditMode && 'show'}`}

        />
      </td>
      <td className="action-buttons">
        {!eachAdmin.isEditMode ? (
          <button
            type="button"
            className="edit edit-button"
            onClick={() => toggleEdit(eachAdmin.id)}
          >
            Edit
          </button>
        ) : (
          <button type="button" onClick={() => saveUpdatedValue(updateValue)} className="save save-button">
            Save
          </button>
        )}
        <button
          type="button"
          className="delete delete-button"
          onClick={() => deleteSingleItem(eachAdmin.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
