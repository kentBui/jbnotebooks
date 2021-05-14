import { useActions } from "../hooks/use-actions";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./action-bar.css";
import AddCell from "./add-cell";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id, children }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className="wrapper">
      <div className="action-bar">
        <button
          className="button is-primary is-small mx-1"
          onClick={() => moveCell(id, "up")}
        >
          <div className="icon">
            <i className="fa fa-chevron-up" aria-hidden="true"></i>
          </div>
        </button>
        <button
          className="button is-primary is-small mx-1"
          onClick={() => moveCell(id, "down")}
        >
          <span className="icon">
            <i className="fa fa-chevron-down" aria-hidden="true"></i>
          </span>
        </button>
        <button
          className="button is-primary is-small mx-1"
          onClick={() => deleteCell(id)}
        >
          <span className="icon">
            <i className="fa fa-times" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      {children}
      <AddCell forceVisible={false} prevCellId={id} />
    </div>
  );
};

export default ActionBar;
