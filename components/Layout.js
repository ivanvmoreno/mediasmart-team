import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: grid;
  grid-template-rows:
    [header] 6rem
    [profiles-filter] 3rem
    [profiles-grid] 1fr
    [pagination] 6rem;
  padding: 1rem;
  color: #383d48;
  font-family: "Open Sans", sans-serif;
  font-weight: 400;


  @media (min-width: 768px) {
    padding: 1rem 3rem;
  }

  @media (min-width: 992px) { 
    height: 90vh;
    grid-template-rows:
      [header] 8rem
      [profiles-filter] 6rem
      [profiles-grid] 1fr
      [pagination] 8rem;
    padding: 1rem 3rem;
  }
`;

export default function Layout({ children }) {
  return (
    <LayoutContainer>
      { children }
    </LayoutContainer>
  );
}