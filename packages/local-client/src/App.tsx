import React, { useEffect } from "react";
import { initializeEsbuild } from "./bundle";
import CellList from "./cells/cell-list";

export default function App() {
  useEffect(() => {
    initializeEsbuild();
  }, []);
  return (
    <div>
      <h2>Basic Editor </h2>
      <h3>test something</h3>
      <CellList />
    </div>
  );
}
