import { bundle } from "../../bundle";
import { ActionType } from "../action-types";
import { Middleware } from "./middleware";

// create middleware thay the cho thunk trong viec dispatch

let timer: any;

export const bundleMiddleware: Middleware = ({ getState, dispatch }) => (
  next
) => (action) => {
  next(action);

  if (action.type !== ActionType.UPDATE_CELL) return;

  const {
    cells: { data: cellData },
  } = getState();

  const cell = cellData[action.payload.id];

  if (cell.type === "text") return;

  dispatch({
    type: ActionType.BUNDLE_START,
    payload: {
      cellId: action.payload.id,
    },
  });

  clearTimeout(timer);
  timer = setTimeout(async () => {
    const output = await bundle(action.payload.content);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId: action.payload.id,
        bundle: output,
      },
    });
  }, 700);
};
