import ReactModal from 'react-modal';
import styled from 'styled-components';

const StyledReactModal = styled(ReactModal)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export default function Modal({ isOpen, children, ...props }) {
    return (
        <StyledReactModal isOpen={ !(isOpen == false) } {...props} ariaHideApp={ false }>
            { children }
        </StyledReactModal>
    );
}