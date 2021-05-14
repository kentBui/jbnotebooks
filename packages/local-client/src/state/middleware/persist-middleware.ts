import { Dispatch } from "redux";
import { saveCells } from "../action-creators";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { RootState } from "../reducers";

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: any;
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);
      if (
        [
          ActionType.MOVE_CELL,
          ActionType.UPDATE_CELL,
          ActionType.DELETE_CELL,
          ActionType.INSERT_CELL_AFTER,
        ].includes(action.type)
      ) {
        console.log(" i want to save cell");
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 300);
      }
    };
  };
};
