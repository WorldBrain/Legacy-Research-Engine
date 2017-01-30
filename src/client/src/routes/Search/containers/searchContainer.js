import { connect } from 'react-redux';
import { search } from '../modules/search';

import SearchView from '../components/searchView';

const mapDispatchToProps = {
    search
};

const mapStateToProps = (state) => ({
    results: state.search.results,
    isLoading: state.search.isLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);
