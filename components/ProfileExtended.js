import styled from 'styled-components';
import Profile from './Profile';
import ProfileInfo from './ProfileInfo';
import Button from './Button';
import ProfileSection from './ProfileSection';

const ProfileExtendedContainer = styled.div`
    height: 100vh;
    width: 85vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ProfileWrapper = styled.div`
    display: flex;
    height: 10rem;
    width: 100%;
    box-shadow: 0 9px 46px 8px rgba(0,0,0,0.14), 0 11px 15px -7px rgba(0,0,0,0.12), 0 24px 38px 3px rgba(0,0,0,0.2);
    margin: 1rem 0;
    transform: skewX(-2.5deg);
    font-family: "Open Sans", sans-serif;
    
    @media (min-width: 576px) { 
        height: 15rem;
    }
    
    @media (min-width: 768px) { 
        height: 20rem;
    }
`;

const ProfileAvatar = styled.img`
    display: block;
    height: 100%;
`;

const BioWrapper = styled.div`
    max-width: 100%;
    padding: 1rem;
    margin-bottom: .8rem;
    background: #fff;
    box-shadow: 0 9px 46px 8px rgba(0,0,0,0.14), 0 11px 15px -7px rgba(0,0,0,0.12), 0 24px 38px 3px rgba(0,0,0,0.2);
    transform: skewX(-2.5deg);
    font-family: "Open Sans", sans-serif;

    @media (min-width: 768px) {
        display: none;
    }
`;

export default function ProfileExtended({ profile: { id, name, image, age, bio }, onClick }) {
    return (
        <ProfileExtendedContainer>
            <ProfileWrapper>
                <ProfileAvatar src={ image } />
                <ProfileInfo name={ name } age={ age } bio={ bio } extended={ true } />
            </ProfileWrapper>
            <BioWrapper>
                <ProfileSection title='Bio' content={ `${bio.slice(0,500)}...` } />
            </BioWrapper>
            <Button fullWidth={ true } onClick={ onClick }>Close</Button>
        </ProfileExtendedContainer>
    );
}