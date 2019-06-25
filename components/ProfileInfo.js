import styled from 'styled-components';
import ProfileSection from './ProfileSection';

const ProfileGridInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: #fff;
    width: 100%;
`;

const ProfileName = styled.h2`
    margin: 0 0 1rem 0;
    font-size: 1rem;
    
    @media (min-width: 768px) {
        font-size: initial;
    }

    @media (min-width: 992px) {
        font-size: 1.5rem;
    }
`;

const BioWrapper = styled.div`
    display: none;

    @media (min-width: 768px) {
        display: block;
        margin-top: 1rem;
    }
`;

export default function({ name, age, bio, extended = false }) {
    return (
        <ProfileGridInfoWrapper>
            <ProfileName>{ name.slice(0, name.indexOf(' ', name.indexOf(' ') + 1)) }</ProfileName>
            <ProfileSection title='Age' content={ age } />
            { extended && (
                <BioWrapper>
                    <ProfileSection title='Bio' content={ `${bio.slice(0, 350)}...` } />
                </BioWrapper>
            )}
        </ProfileGridInfoWrapper>
    );
}