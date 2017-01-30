import React, { PropTypes } from 'react';

/**
 * Component to display search results.
 * @param  {array} results  A list of search results to display.       
 */
const SearchResults = ({results}) => {

    /**
     * Shortens a chunk of text and concats an ellipses if required.
     * @param  {string} text The text to be shortened.
     * @return {string}      Shortened text.
     */
    function summarize(text) {
        const summarized = text.slice(0, 200);
        return summarized[199] ? summarized.concat('...') : summarized;
    }

    const resultElements = results.map((result) => {
        return (
            <li className="search-results__list__item" key={result.id}>
                <div>
                    <p className="search-results__list__item__title">
                        <a href={result.link} className="search-results__list__item__title__link">
                            {result.title}
                        </a>
                    </p>

                    <p className="search-results__list__item__link-text">
                        <a href={result.link}>{result.link}</a>
                    </p>

                    <p className="search-results__list__item__summary">
                        {summarize(result.summary)}
                    </p>
                </div>
            </li>
        );
    });

    return (
        <div className="search-results">
            <ul className="search-results__list">
                { resultElements }
            </ul>
        </div>
    );
};

/**
 * Defines the properties accpted by this component.
 * @type {Object}
 */
SearchResults.propTypes = {
    results: PropTypes.array.isRequired
};

export default SearchResults;