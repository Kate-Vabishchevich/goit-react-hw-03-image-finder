import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

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
        const { largeImageURL, tags } = this.props;
        const { handleClose } = this;
        
        return createPortal(
            <div className={css.overlay} onClick={handleClose}>
                <div className={css.modal}>
                    <img
                        src={largeImageURL}
                        alt={tags}
                        source={largeImageURL}
                        className={css.img} />
                </div>
            </div>,
            modalRoot,
        );
    }
};

export default Modal;

Modal.propTypes = {
//   id: PropTypes.number.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PromiseRejectionEvent,
  onClose: PropTypes.func.isRequired,
};

