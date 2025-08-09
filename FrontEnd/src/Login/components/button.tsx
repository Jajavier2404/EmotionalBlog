import type {buttonProps} from "../types";
export default function Button({ label, onClick }:buttonProps) {
    return (
        <button className="custom-button" onClick={onClick}>
        {label}
        </button>
    );
}