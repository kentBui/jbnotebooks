import React from "react";
import ActionBar from "../components/action-bar";
import CodeCell from "../components/code-cell";
import TextEditor from "../components/text-editor";
import { Cell } from "../state/cell";

interface CellItemProps {
  cell: Cell;
}

const CellItem: React.FC<CellItemProps> = ({ cell }) => {
  return (
    <ActionBar id={cell.id}>
      {cell.type === "text" ? (
        <TextEditor cell={cell} />
      ) : (
        <CodeCell cell={cell} />
      )}
    </ActionBar>
  );
};

export default CellItem;
