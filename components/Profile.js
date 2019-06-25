import styled from 'styled-components';
import ProfileInfo from './ProfileInfo';

const ProfileGridWrapper = styled.div`
    display: flex;
    height: 7rem;
    width: 85vw;
    box-shadow: 0 9px 46px 8px rgba(0,0,0,0.14), 0 11px 15px -7px rgba(0,0,0,0.12), 0 24px 38px 3px rgba(0,0,0,0.2);
    margin: .8rem 0;
    transform: skewX(-2.5deg);
    cursor: pointer;
    
    @media (min-width: 576px) { 
        width: 40vw;
        margin: .8rem 0;
    }
    
    @media (min-width: 768px) { 
        margin: 1rem 0;
        height: 8rem;
    }

    @media (min-width: 992px) { 
        margin: 1.2rem 0;
        height: 8.5rem;
        width: 30vw;
    }
`;

const ProfileGridAvatar = styled.img`
    display: block;
    height: 100%;
`;

export default function ProfileGrid({ id, name, img, age, bio, handleClick }) {
    return (
        <ProfileGridWrapper onClick={ () => handleClick(id) }>
            <ProfileGridAvatar src={ img } />
            <ProfileInfo name={ name } age={ age } bio={ bio }></ProfileInfo>
        </ProfileGridWrapper>    
    );
}