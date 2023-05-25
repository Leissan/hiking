
import React, {useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import UserContext from '../../components/UserContext';

const CreateHikePage = ({onCreateHike}) => {
    const { user } = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('');
    const [locationId, setLocationId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory()

    const handleCreate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Simulated API request to create a new hike
            const response = await fetch('/hikes', {
                method: 'POST', body: JSON.stringify({
                    hike: {
                        title, description, level, location_id: locationId,
                    }
                }), headers: {
                    'Content-Type': 'application/json',
                },
            }).then((r) => r.json())
                .then((t) => {
                    onCreateHike(t)
                    history.push("/")
                });
        } catch (error) {
            console.error('Error creating hike:', error);
        }

        setIsLoading(false);
    };

    const handleSelect = (e) => {
        setLocationId(e.target.value);
    };

    return (<div>
        <h1>Create Hike</h1>
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
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <div>
                <label>Level:</label>
                <input
                    type="text"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                />
            </div>
            <div>
                <label>Location:</label>
                <select onChange={handleSelect}>
                    {user.locations.map(item => {
                        
                        return (<option value={item.id} key={item.id}>{item.title}, address: {item.address}</option>);
                    })}
                </select>
            </div>
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Hike'}
            </button>
        </form>
    </div>);
};

export default CreateHikePage;