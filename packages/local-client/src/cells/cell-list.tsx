import React, { useEffect } from "react";
import AddCell from "../components/add-cell";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellItem from "./cell-item";
import "./cell-list.css";
import { useActions } from "../hooks/use-actions";

const CellList: React.FC = () => {
  const cells = useTypedSelector((state) => state.cells);
  const { fetchCells, saveCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  // useEffect(() => {
  //   saveCells();
  // }, [JSON.stringify(cells)]);

  return (
    <div>
      {cells.order.map((id) => (
        <CellItem key={id} cell={cells.data[id]} />
      ))}
      {cells.order.length === 0 && (
        <AddCell
          forceVisible={cells.order.length === 0 ? true : false}
          prevCellId={null}
        />
      )}
    </div>
  );
};

export default CellList;
