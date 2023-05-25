import React, {useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import UserContext from '../../components/UserContext';

const CreateLocation = () => {
    const { user, setUser } = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const history = useHistory();

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            // Simulated API request to create a new hike
            const response = await fetch('/location', {
                method: 'POST', body: JSON.stringify({
                    location: {
                        title, address
                    }
                }), headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                
                response.json().then ((newlocation) => {

                   const locations = user.locations
                   setTitle("")
                   setAddress("")
                   setUser({...user, locations: [...locations, newlocation]})
                     } )
                history.push("/")
            } else {
                // Handle unsuccessful creation, e.g., display an error message
            }
        } catch (error) {
            console.error('Error creating hike:', error);
        }
    };

    return (<div>
        <h1>Create Location</h1>
        <form onSubmit={handleCreate}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label>Address:</label>
                <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                ></textarea>
            </div>
            <button type="submit">
                {'Create Location'}
            </button>
        </form>
    </div>);
};

export default CreateLocation;
