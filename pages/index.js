import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import styled from 'styled-components';
import { DebounceInput } from 'react-debounce-input';
import Layout from '../components/Layout';
import ProfileExtended from '../components/ProfileExtended';
import Profile from '../components/Profile';
import Modal from '../components/Modal';
import Button from '../components/Button';

const Logo = styled.img`
    grid-row: header;
    display: block;
    height: 100%;
    max-width: 100%;
    justify-self: center;

    @media (min-width: 992px) {
        justify-self: start;
    }
`;

const FilterInput = styled(DebounceInput)`
    grid-row: profiles-filter;
    box-sizing: border-box;
    transform: skewX(-2.5deg);
    padding: .5rem 1rem;
    font-size: 1.3rem;
    height: 100%;
    border: 1px solid rgba(56,61,72, 0.4);
    align-self: center;
    
    @media (min-width: 576px) { 
        font-size: 1.5rem;
        justify-content: space-between;
    }
    
    @media (min-width: 992px) {
        font-size: 1.8rem;
        padding: 0 1rem;
        max-height: 3.5rem;
    }
`;

const ProfileGrid = styled.div`
    grid-row: profiles-grid;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    max-height: 100%;
    margin: 1rem 0;

    @media (min-width: 576px) { 
        justify-content: space-between;
    }

    @media (min-width: 992px) {
        align-items: flex-start;
        margin: 0;
    }
`;
    
const PaginationWrapper = styled.div`
    grid-row: pagination;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const PaginationControls = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: .8rem;

    div {
        margin: 0 1rem;
    }
`;

const PaginationSelect = styled.select`
    height: 100%;
    width: 3.5rem;
    transform: skewX(-2.5deg);
    border-radius: 0;
    font-size: 1rem;
    border: 0;
    border-bottom: 3px solid red;
    text-align-last: center;
    background: transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
`;

const PaginationInfo = styled.span`
    padding: .45rem 1rem;
    font-size: .8rem;
    background: #3d3e41;
    color: #fff;
    transform: skewX(-2.5deg);
`;

class Index extends React.Component {
    state = {
        selectedUser: false,
        profilesFilter: '',
        paginationSize: this.props.pageSize,
        currentPage: this.props.pageNumber,
        totalProfiles: this.props.totalProfiles,
        profilesData: this.props.profilesData
    };

    static propTypes = {
        profilesFilter: PropTypes.string,
        profilesData: PropTypes.object.isRequired,
        totalProfiles: PropTypes.number.isRequired,
        pageNumber: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired
    };

    static async getInitialProps({ query: { pageNumber, pageSize, name } }) {
        pageNumber = parseInt(pageNumber) || 1;
        pageSize = parseInt(pageSize) || 9;
        name = name ? name : '';
        const { ['profiles']: profilesData , totalProfiles } = await fetch(`http://localhost:3000/profiles?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}`).then(res => res.json());
        return {
            name,
            profilesData,
            totalProfiles,
            pageNumber,
            pageSize
        };
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            const { profilesData, totalProfiles, ['pageNumber']: currentPage, ['pageSize']: paginationSize, ['name']: profilesFilter } = this.props;
            this.setState({
                profilesFilter,
                profilesData,
                totalProfiles,
                paginationSize,
                currentPage
            });
        }
    };

    /**
     * Handles behavior when clicking on a user profile
     * @param {string} profileId - Unique profile ID of the clicked profile
     */
    handleProfileClick = profileId => {
        this.setState({
            selectedUser: profileId
        });
    };

    /**
     * Closes the profile details modal
     */
    handleModalClose = () => {
        this.setState({
            selectedUser: false
        });
    };

    /**
     * Jumps to a particular page number
     * @param {number} pageNumber 
     */
    handleChangePageNumber = pageNumber => {
        const { paginationSize, profilesFilter } = this.state; 
        let query = {
            pageSize: paginationSize,
            pageNumber
        };
        if (profilesFilter) {
            query['name'] = profilesFilter;
        }
        Router.push({
            pathname: '/',
            query
        });
    };

    /**
     * Changes the number of profiles shown per page
     * @param {Event} event 
     */
    handleChangePaginationSize = pageSize => {
        const { currentPage, profilesFilter } = this.state; 
        let query = {
            pageSize,
            pageNumber: currentPage
        };
        if (profilesFilter) {
            query['name'] = profilesFilter;
        }
        Router.push({
            pathname: '/',
            query
        });
    };

    /**
     * Handles formatting of the profiles to be displayed on the grid
     * @returns {Profile[]}
     */
    renderProfiles = () => {
        return Object.keys(this.state.profilesData).map(id => {
            const { name, image, age, bio } = this.state.profilesData[id];
            return <Profile key={ id } id={ id } name={ name } img={ image } age={ age } bio={ bio } handleClick={ this.handleProfileClick }></Profile>; 
        });
    };

    /**
     * Query profiles by name
     * @param {string} profilesFilter - Filter to apply
     */
    handleFilterProfilesChange = profilesFilter => {
        const { paginationSize } = this.state;
        let query = {
            pageSize: paginationSize
        };
        if (profilesFilter) {
            query['name'] = profilesFilter
        }
        Router.push({
            pathname: '/',
            query
        });
    };

    render() {
        const { profilesFilter, selectedUser, currentPage, paginationSize, totalProfiles, profilesData } = this.state;
        return (
            <Layout>
                { selectedUser && (
                    <Modal onRequestClose={ this.handleModalClose }>
                        <ProfileExtended profile={ profilesData[selectedUser] } onClick={ this.handleModalClose } />
                    </Modal>  
                ) }
                <Logo src='/static/img/logo.png' />
                <FilterInput 
                    minLength={2}
                    debounceTimeout={300} 
                    value={ profilesFilter } 
                    onChange={ ev => this.handleFilterProfilesChange(ev.target.value) }
                    placeholder='Filter by name...' />
                <ProfileGrid>{ this.renderProfiles() }</ProfileGrid>
                <PaginationWrapper>
                    <PaginationControls>
                        <Button onClick={() => this.handleChangePageNumber(currentPage - 1)} disabled={ currentPage === 1 }>Previous</Button>
                        <PaginationSelect value={ paginationSize } onChange={ ev => this.handleChangePaginationSize(ev.target.value) }>
                            <option value={9}>9</option>
                            <option value={27}>27</option>
                            <option value={45}>45</option>
                            <option value={90}>90</option>
                        </PaginationSelect>
                        <Button onClick={() => this.handleChangePageNumber(currentPage + 1)} disabled={ (currentPage * paginationSize) >= totalProfiles }>Next</Button>
                    </PaginationControls>
                    <PaginationInfo>Displaying { ((currentPage - 1) * paginationSize) + 1 } - { currentPage * paginationSize } out of { totalProfiles } profiles</PaginationInfo>
                </PaginationWrapper>
            </Layout>
        );
    }
};

export default withRouter(Index);