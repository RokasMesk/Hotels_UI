import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import '../styles.css'; // Import your custom CSS

interface SearchBarProps {
    onSearch: (city: string, country: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [city, setCity] = useState<string>('');
    const [country, setCountry] = useState<string>('');

    const handleSearch = () => {
        onSearch(city, country);
    };

    return (
    <div className='container'>
        <div className='row'></div>
            <div className='col-lg-12'>
                <div className='row'>
                    <div className='col-lg-3 col-md-3 col-sm-12 p-0'>
                    
            <InputGroup className="mb-3">
                <Form.Control
                    className='form-control search-slt'
                    type="text"
                    placeholder="Search by city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </InputGroup>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-12 p-0'>
            <InputGroup className="mb-3">
                <Form.Control
                    className='form-control search-slt'
                    type="text"
                    placeholder="Search by country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </InputGroup>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-12 ml-2'>
            <Button onClick={handleSearch} className='btn btn-dark'>
                Search
            </Button>
            </div>
                    
                </div>
            </div>
    </div>
    );
};

export default SearchBar;
