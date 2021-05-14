import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;

    const orderedCells = order.map((id) => data[id]);

    const showFunc = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';
      var show = (val)=> {
        const root = document.querySelector('#root');
        if(typeof val === 'object'){
          if(val.$$typeof && val.props){
            _ReactDOM.render(val, root);
          } else {
            root.innerHTML = JSON.stringify(val);
          }
        } else {
          root.innerHTML = val;
        }
      };
    `;

    const showFuncNoop = "var show = () => {}";

    const cumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === "code") {
        if (c.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoop);
        }
        cumulativeCode.push(c.content);
      }

      if (c.id === cellId) break;
    }

    return cumulativeCode;
  }).join("\n");
};
