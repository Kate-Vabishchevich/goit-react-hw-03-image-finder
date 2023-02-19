import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleCloseByEsc )
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleCloseByEsc)
    }

    handleCloseByEsc = event => {
        if (event.code === 'Escape') {
           this.props.onClose(); 
        }
    }

    handleCloseByOverlay = event => {
        if (event.target === event.currentTarget) {
            this.props.onClose();
        }
    }
    
    render() {
        const { largeImageURL, tags } = this.props;
        
        return createPortal(
            <div className={css.overlay} onClick={this.handleCloseByOverlay}>
                <div className={css.modal}>
                    <img
                        src={largeImageURL}
                        alt={tags}
                    />
                </div>
            </div>,
            modalRoot,
        );
    }
};

export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

