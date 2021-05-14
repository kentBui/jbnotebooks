import React, { useEffect } from "react";
import { useActions } from "../hooks/use-actions";
import { useCumulativeCode } from "../hooks/use-cumulative-code";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { Cell } from "../state/cell";
import "./code-cell.css";
import CodeEditor from "./code-editor";
import Preview from "./Preview";
import Resizable from "./resizable";

interface CodeCellProps {
  cell: Cell;
}

let timer: any;

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();

  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  const cumulativeCode = useCumulativeCode(cell.id);
  // const cumulativeCode = useTypedSelector((state) => {
  //   const { data, order } = state.cells;

  //   const orderedCells = order.map((id) => data[id]);

  //   const showFunc = `
  //     import _React from 'react';
  //     import _ReactDOM from 'react-dom';
  //     var show = (val)=> {
  //       const root = document.querySelector('#root');
  //       if(typeof val === 'object'){
  //         if(val.$$typeof && val.props){
  //           _ReactDOM.render(val, root);
  //         } else {
  //           root.innerHTML = JSON.stringify(val);
  //         }
  //       } else {
  //         root.innerHTML = val;
  //       }
  //     };
  //   `;

  //   const showFuncNoop = "var show = () => {}";

  //   const cumulativeCode = [];
  //   for (let c of orderedCells) {
  //     if (c.type === "code") {
  //       if (c.id === cell.id) {
  //         cumulativeCode.push(showFunc);
  //       } else {
  //         cumulativeCode.push(showFuncNoop);
  //       }
  //       cumulativeCode.push(c.content);
  //     }

  //     if (c.id === cell.id) break;
  //   }

  //   return cumulativeCode;
  // });

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createBundle, cell.id, cumulativeCode]);

  return (
    <Resizable direction="vertical">
      <div className="code-cell">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        {/* FIXME donot display when use this code */}
        {/* <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max={100}>
                Loading...
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} error={bundle.error} />
          )}
        </div> */}
        {bundle && <Preview code={bundle.code} error={bundle.error} />}
      </div>
    </Resizable>
  );
};

export default CodeCell;

// allow-same-origin
// if want to follow full resolve => see video 100 - 103
// => need another server for iframe src

// const cumulativeCode = useTypedSelector((state) => {
//   const { data, order } = state.cells;

//   const orderedCells = order.map((id) => data[id]);

//   const cumulativeCode = [];
//   for (let c of orderedCells) {
//     if (c.type === "code") {
//       cumulativeCode.push(c.content);
//     }

//     if (c.id === cell.id) break;
//   }

//   return cumulativeCode;
// });

// console.log(cumulativeCode);
