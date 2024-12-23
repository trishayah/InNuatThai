import React, { useState } from "react";

function SelectAndDelete() {
  const [items, setItems] = useState([
    { id: 1, name: "Item 1", selected: false },
    { id: 2, name: "Item 2", selected: false },
    { id: 3, name: "Item 3", selected: false },
  ]);

  // Tracks whether all items are selected
  const [selectAll, setSelectAll] = useState(false);

  // Toggle selection for a single item
  const toggleSelect = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Toggle "Select All" checkbox
  const toggleSelectAll = () => {
    const newState = !selectAll;
    setSelectAll(newState);
    setItems((prevItems) =>
      prevItems.map((item) => ({ ...item, selected: newState }))
    );
  };

  // Delete selected items
  const deleteSelected = () => {
    setItems((prevItems) => prevItems.filter((item) => !item.selected));
    setSelectAll(false); // Reset "Select All" after deletion
  };

  return (
    <div>
      <h2>Select and Delete Items</h2>

      {/* Select All Checkbox */}
      <div>
        <input
          type="checkbox"
          checked={selectAll}
          onChange={toggleSelectAll}
        />
        <label>Select All</label>
      </div>

      {/* List of Items */}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.selected}
              onChange={() => toggleSelect(item.id)}
            />
            {item.name}
          </li>
        ))}
      </ul>

      {/* Delete Button */}
      <button onClick={deleteSelected} disabled={items.every((item) => !item.selected)}>
        Delete Selected
      </button>
    </div>
  );
}

export default SelectAndDelete;
