import React from 'react';

const SearchBar = ({ value, onChange, placeholder = 'Search products...' }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="search-input"
            />
            <span className="search-icon">🔍</span>
        </div>
    );
};

export default SearchBar;
