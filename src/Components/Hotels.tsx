import React, { useEffect, useState } from 'react';
import { getHotels } from '../Services/hotelService';
import BookingModal from './BookingModal';
import axios from 'axios';
import SearchBar from './SearchBar';
import '../App.css'
import 'react-toastify/dist/ReactToastify.css';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface HotelDTO {
    id: string;
    name: string;
    city: string;
    country: string;
    streetAndNumber: string;
    photoUrl: string;
}

const Hotels = () => {
    const [hotels, setHotels] = useState<HotelDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedHotel, setSelectedHotel] = useState<HotelDTO | null>(null);
   

    const handleBookingSuccess = () => {
        console.log('Booking was successful!');
    };
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const fetchHotels = async () => {
        try {
            const data = await getHotels();
            setHotels(data);
        
            console.log('Hotels set:', data); // Debugging line
        } catch (error) {
            console.error('Failed to fetch hotels', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHotels();
    }, []);

    const searchHotels = async (city: string, country: string) => {
        try {
            const queryParams = new URLSearchParams();
            if (city) queryParams.append('city', city);
            if (country) queryParams.append('country', country);

            const response = await axios.get(`${API_BASE_URL}/api/Hotel/search?${queryParams.toString()}`);
            setHotels(response.data);
            if (response.data.length === 0) {
                toast.error('No hotels found');
            }
            console.log('Search results:', response.data);
        } catch (error) {
            console.error('Failed to search hotels', error);
        }
    };

    const handleBookClick = (hotel: HotelDTO) => {
        setSelectedHotel(hotel);
        setShowModal(true);
    };

   

    if (loading) {
        return <div>Loading...</div>;
    }

    if (hotels.length === 0) {
        return <div>No hotels available.</div>;
    }

    return (
        <div className="container mt-4">
           
            <h1 className="mb-4">Hotels</h1>
            <SearchBar onSearch={searchHotels} /> 
            <div className="row"></div>
            <div className="row">
                {hotels.map(hotel => (
                    <div key={hotel.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={hotel.photoUrl} className="card-img-top" alt={hotel.name} />
                            <div className="card-body">
                                <h5 className="card-title">{hotel.name}</h5>
                                <p className="card-text">{hotel.streetAndNumber}, {hotel.city}, {hotel.country}</p>
                                <button className="btn btn-dark" onClick={() => handleBookClick(hotel)}>Book it!</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedHotel && (
                <BookingModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    hotelName={selectedHotel.name}
                    hotelId={selectedHotel.id}
                    onBookingSuccess={handleBookingSuccess}
                />
            )}
        </div>
    );
};

export default Hotels;
