import React from 'react';

import SearchBar from './searchBar';
import './searchView.scss';

/**
 * Responsible for painting and handling interactions with the search page.
 */
class SearchView extends React.Component {
    constructor(props) {
        super(props);

        this.onSearch = this.onSearch.bind(this);
        this.state = {
            searchQuery: ''
        };
    }

    /**
     * Callback responsible for handling search.
     * @param  {string} query The query to search for.
     * @return {void}
     */
    onSearch(query) {
        this.setState({searchQuery: query});
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

                <div className="row">
                    <div className="col-md-8">
                        {this.state.searchQuery && 
                            <p>You searched for {this.state.searchQuery}</p>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchView;