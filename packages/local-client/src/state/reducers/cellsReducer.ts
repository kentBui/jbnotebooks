import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

const cellsReducer = produce((state: CellsState, action: Action) => {
  switch (action.type) {
    case ActionType.FETCH_CELLS:
      state.loading = true;
      state.error = null;
      return;

    case ActionType.FETCH_CELLS_SUCCESS:
      state.loading = false;

      state.order = action.payload.map((cell) => cell.id);
      state.data = action.payload.reduce((acc, cell) => {
        acc[cell.id] = cell;
        return acc;
      }, {} as CellsState["data"]);
      return;

    case ActionType.FETCH_CELLS_ERROR:
      state.loading = false;
      state.error = action.payload;
      return;

    case ActionType.SAVE_CELLS_ERROR:
      state.loading = false;
      state.error = action.payload;
      return;

    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) return;

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;

      return;

    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      const delIndex = state.order.findIndex((id) => id === action.payload);
      state.order.splice(delIndex, 1);
      return;

    case ActionType.INSERT_CELL_AFTER:
      const cell: Cell = {
        content: "",
        type: action.payload.type,
        id: randomId(),
      };

      state.data[cell.id] = cell;

      const insertIndex = state.order.findIndex(
        (id) => id === action.payload.id
      );

      if (insertIndex < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(insertIndex + 1, 0, cell.id);
      }

      return;

    case ActionType.UPDATE_CELL:
      const { content } = action.payload;
      state.data[action.payload.id].content = content;
      return;

    default:
      return state;
  }
}, initialState);

export default cellsReducer;

// {
//   loading: false,
//   error: null,
//   data: {
//     'key1': {
//       id: 'key1',
//       type: 'code',
//       content: 'const a = 1;'
//     }
//   },
//   loading: false,
//   error: null,
//   data: {
//     'key2': {
//       id: 'key2',
//       type: 'text',
//       content: 'Header'
//     }
//   },
// }
