import styled from 'styled-components';

const ButtonWrapper = styled.div`
    opacity: ${({ disabled }) => disabled ? '.6' : '1'};
    width: ${({ fullWidth }) => fullWidth ? '100%' : 'initial'};
    text-align: center;
    background-color: #ff324b;
    color: #fff;
    padding: .8rem 1rem;
    transform: skewX(-2.5deg);
    cursor: pointer;
    font-family: "Open Sans", sans-serif;
    font-weight: 700;
`;

export default class Button extends React.Component {
    handleClick = ev => {
        !this.props.disabled && this.props.onClick(ev);
    }

    render() {
        const { children } = this.props;
        return (
            <ButtonWrapper onClick={ this.handleClick } >{ children }</ButtonWrapper>
        );
    }
}