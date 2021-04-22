import React, { useState, useEffect } from "react";

export default function GridCell(props) {
  const { row, column, value, isDefault, UpdateBoard } = props;
  const [cellValue, setCellValue] = useState(value);

  function UpdateCellValue(e) {
    if (!isNaN(e.target.value)) {
      setCellValue(e.target.value);
      UpdateBoard(e.target.value, row, column);
    } else {
      setCellValue(0);
    }
  }

  function CellSelect(e) {
    e.target.select();
  }

  return (
    <div className="GridCell">
      {isDefault ? (
        <div>{value}</div>
      ) : (
        <input
          type="input"
          maxLength="1"
          value={cellValue}
          onChange={UpdateCellValue}
          onSelect={CellSelect}
          required
        ></input>
      )}
    </div>
  );
}
