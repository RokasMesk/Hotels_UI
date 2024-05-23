// src/Components/BookingModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface BookingModalProps {
    show: boolean;
    onHide: () => void;
    hotelName: string;
    hotelId: string;
    onBookingSuccess: () => void; 
}

interface BookingRequest {
    hotelId: string;
    checkIn: string;
    checkOut: string;
    personCount: number;
    hasBreakfast: boolean;
    roomType: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ show, onHide, hotelName, hotelId, onBookingSuccess }) => {
    const [checkIn, setCheckIn] = useState<string>('');
    const [checkOut, setCheckOut] = useState<string>('');
    const [hasBreakfast, setHasBreakfast] = useState<boolean>(false);
    const [roomType, setRoomType] = useState<string>('Standard');
    const [personCount, setPersonCount] = useState<number>(1);

    useEffect(() => {
        if (!show) {
            setCheckIn('');
            setCheckOut('');
            setHasBreakfast(false);
            setRoomType('Standard');
            setPersonCount(1);
        }
    }, [show]);

    const getRoomRate = (type: string) => {
        switch (type) {
            case 'Standard':
                return 100;
            case 'Deluxe':
                return 150;
            case 'Suite':
                return 200;
            default:
                return 0;
        }
    };
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (new Date(checkIn) >= new Date(checkOut)) {
            toast.error('Check-in date must be before check-out date.');
           return;
        }
       
        const bookingRequest: BookingRequest = {
            hotelId,
            checkIn,
            checkOut,
            hasBreakfast,
            personCount,
            roomType
        };
        
        try {
            const response = await axios.post(`${API_BASE_URL}/api/Booking`, bookingRequest);
            console.log('Booking successful:', response.data);
            onBookingSuccess(); 
            toast.success('Booking has been added!')
            onHide();
        } catch (error) {
            console.error('Booking failed:', error);
            toast.error('Failed to add booking')
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Book a Room at {hotelName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="roomType">
                        <Form.Label>Room Type</Form.Label>
                        <Form.Control
                            as="select"
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                            required
                        >
                            <option value="Standard">Standard (€100/night)</option>
                            <option value="Deluxe">Deluxe (€150/night)</option>
                            <option value="Suite">Suite (€200/night)</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="checkIn" className="mt-3">
                        <Form.Label>Check-In Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="checkOut" className="mt-3">
                        <Form.Label>Check-Out Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="personCount" className="mt-3">
                        <Form.Label>Number of Persons</Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            value={personCount}
                            onChange={(e) => setPersonCount(parseInt(e.target.value))}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="breakfast" className="mt-3">
                        <Form.Check
                            type="checkbox"
                            label="Breakfast Included"
                            checked={hasBreakfast}
                            onChange={(e) => setHasBreakfast(e.target.checked)}
                        />
                    </Form.Group>
                    <div className="mt-3">
                        <strong>Room Rate: €{getRoomRate(roomType)} / night</strong>
                    </div>
                    <Button variant="primary" type="submit" className="mt-3 red-button">
                        Book Now
                    </Button>
                </Form>
               
            </Modal.Body>
        </Modal>
    );
};

export default BookingModal;
