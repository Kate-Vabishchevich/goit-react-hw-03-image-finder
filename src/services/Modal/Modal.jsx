import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleClose )
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleClose)
    }
    
    handleClose = ({target, currentTarget, code}) => {
        if (target === currentTarget || code === 'Escape') {
            this.props.onClose();
            }
        }
    
    render() {
        const { children } = this.props;
        const { handleClose } = this;
        
        return createPortal(
            <div className={css.overlay} onClick={handleClose}>
                <div className={css.modal}>{children}</div>
            </div>,
            modalRoot,
        );
    }
};

export default Modal;