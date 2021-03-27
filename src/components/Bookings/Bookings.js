import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings =() => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(() =>{
        fetch('http://localhost:4000/bookings?email='+loggedInUser.email,{
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setBookings(data));
    }, [])

    return(
        <div>
            <h4> Your {bookings.length} bookings</h4>
            {
                bookings.map(book => <li key={book._id}>{book.name} from : {new Date(book.checkIn).toDateString('dd/MM/YYYY')} to : {new Date(book.checkOut).toDateString('dd/MM/YYYY')}</li>)
            }
        </div>
    )
};

export default Bookings;