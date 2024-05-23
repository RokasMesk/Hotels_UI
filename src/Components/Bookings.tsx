import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Booking {
    checkIn: string;
    checkOut: string;
    personCount: number;
    hasBreakfast: boolean;
    roomType: string;
    hotelAdress: string;
    hotelName: string;
    price: number;
}
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const Bookings: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/Booking`);
                setBookings(response.data);
               
                console.log('Bookings fetched:', response.data);
            } catch (error) {
                console.error('Failed to fetch bookings', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (bookings.length === 0) {
        return <div>No bookings available.</div>;
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4">All Bookings</h1>
            <div className="row">
                {bookings.map((booking, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{booking.hotelName}</h5>
                                <p className="card-text">
                                    <b>Adress</b>: {booking.hotelAdress}<br />
                                    <b>Check-in</b>: {booking.checkIn}<br />
                                    <b>Check-out</b>: {booking.checkOut}<br />
                                    <b>Person count</b>: {booking.personCount}<br />
                                    <b>Breakfast?</b>: {booking.hasBreakfast ? 'Yes' : 'No'}<br />
                                    <b>Room-type</b>: {booking.roomType}<br />
                                    <b>Price: €</b>{booking.price}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bookings;
