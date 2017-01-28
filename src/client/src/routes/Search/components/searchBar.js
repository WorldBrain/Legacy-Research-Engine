import React, { PropTypes } from 'react';

/**
 * Component to handle user search input.
 */
class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { query: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.clearQuery = this.clearQuery.bind(this);
    }

    /**
     * Callback to handle change events from the search input.
     * @param  {Event} event
     * @return {void}
     */
    handleChange(event) {
        this.setState({query: event.target.value});
    }

    /**
     * Callback to handle keypress events from the search input.
     * @param  {Event} event
     * @return {void}
     */
    handleKeyPress(event) {
        if(event.key === 'Enter' && this.state.query) {
            this.props.onSearch(this.state.query);
            event.target.blur();
        }
    }

    /**
     * Mutates state to clear the search query.
     * @return {void}
     */
    clearQuery() {
        this.setState({query: ''});
        this.searchInput.focus();
    }

    /**
     * Paints the search bar component.
     * @return {void}
     */
    render() {
        return (
            <div className="search-bar">
                <input 
                    ref={(input) => { this.searchInput = input; }}
                    type="text"
                    placeholder="Search your local database..."
                    className="search-bar__input"
                    value={this.state.query}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                    autoFocus />

                { this.state.query &&
                    <a onClick={this.clearQuery} className="search-bar__clear-btn">x</a>
                }
            </div>
        );
    }
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired
};

export default SearchBar;