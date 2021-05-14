import { useActions } from "../hooks/use-actions";
import "./add-cell.css";

interface AddCellProps {
  prevCellId: string | null;
  forceVisible: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId, forceVisible }) => {
  const { insertCellAfter } = useActions();
  return (
    <div className={forceVisible ? "add-cell force-visible" : "add-cell"}>
      <button
        className="button is-primary is-small button-code"
        onClick={() => insertCellAfter(prevCellId, "code")}
      >
        <span className="icon is-small">
          <i className="fa fa-plus" aria-hidden="true"></i>
        </span>
        <span>Code</span>
      </button>
      <button
        className="button is-success is-small button-text"
        onClick={() => insertCellAfter(prevCellId, "text")}
      >
        <span className="icon is-small">
          <i className="fa fa-plus" aria-hidden="true"></i>
        </span>
        <span>Text</span>
      </button>
    </div>
  );
};

export default AddCell;
