import styled from 'styled-components';

const ProfileSectionWrapper = styled.div`
    display: flex;

    * {
        padding: .2rem .45rem;
        font-size: .8rem;
        color: #fff;
        transform: skewX(-2.5deg);
        margin: 0 .1rem;
    }
`;

const ProfileSectionTitle = styled.span`
    display: block;
    background: #ff324b;
    font-weight: 700;
    max-height: 1.2rem;
`;

const ProfileSectionContent = styled.div`
    background: #3d3e41;
`;

export default function ProfileSection({ title, content }) {
    return(
        <ProfileSectionWrapper>
            <ProfileSectionTitle>{ title }</ProfileSectionTitle>
            <ProfileSectionContent>{ content }</ProfileSectionContent>
        </ProfileSectionWrapper>
    );
}