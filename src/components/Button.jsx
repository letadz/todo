/* eslint-disable react/prop-types */
import FaIcon from "@/components/FaIcon";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Button({ onClick, title }) {
  return (
    <>
      <button onClick={onClick} className="rounded-lg px-4 py-3">
        <div className="flex items-center gap-1.5 md:gap-2">
          <FaIcon icon={faPlus} />
          <span>{title}</span>
        </div>
      </button>
    </>
  );
}
