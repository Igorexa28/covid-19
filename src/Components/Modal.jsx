import "../Styles/Modal.css";
import ReactDom from "react-dom";

const Modal = ({ open, children, onClose, classModal }) => {
if (!open) return null;

return ReactDom.createPortal(
    <>
        <div className="overlay_styles">
            <div className={classModal}>
                <div>
                    {children}
                </div>
                <div className="closeCont" onClick={onClose}>
                    OK
                </div>
            </div>
        </div>
    </>,
    document.getElementById("root")
);
};

export default Modal;