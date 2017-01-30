import React from 'react';

import SearchBar from './searchBar';
import SearchResults from './SearchResults';
import './searchView.scss';

/**
 * Responsible for painting and handling interactions with the search page.
 */
class SearchView extends React.Component {
    constructor(props) {
        super(props);

        this.onSearch = this.onSearch.bind(this);
    }

    /**
     * Callback responsible for handling search.
     * @param  {string} query The query to search for.
     * @return {void}
     */
    onSearch(query) {
        this.props.search(query);
    }

    /**
     * Renders the search view.
     */
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">
                        <SearchBar onSearch={this.onSearch}  />
                    </div>
                </div>

                { this.props.results && !this.props.isLoading &&
                    <div className="row">
                        <div className="col-md-8">
                            <SearchResults results={this.props.results} />
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default SearchView;