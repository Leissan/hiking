import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import UserContext from '../../components/UserContext';

const UpdateHikePage = ({onUpdateHike}) => {
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const history = useHistory();
    const [hike, setHike] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('');
    const [locationId, setLocationId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Simulated fetch to retrieve hike data based on the ID
        const fetchHikeData = async () => {
            try {
                const response = await fetch(`/hikes/${id}`);
                const hikeData = await response.json();
                setHike(hikeData);
                setTitle(hikeData.title);
                setDescription(hikeData.description);
                setLevel(hikeData.level);
                setLocationId(hikeData.location_id);
            } catch (error) {
                console.error('Error retrieving hike data:', error);
            }
        };

        fetchHikeData();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Simulated API request to update the hike data
            await fetch(`/hikes/${id}/owners`, {
                method: 'PUT',
                body: JSON.stringify({
                    hike: {title, description, level, location_id: locationId},
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((r) => r.json())
                .then((t) => {
                    onUpdateHike(t)
                    setIsLoading(false);
                    history.push(`/hike/${id}`);
                });
        } catch (error) {
            console.error('Error updating hike:', error);
            setIsLoading(false);
        }
    };

    const handleSelect = (e) => {
        setLocationId(e.target.value);
    };

    if (!hike) {
        return <div>Loading hike data...</div>;
    }

    return (
        <div>
            <h1>Update Hike</h1>
            <form onSubmit={handleUpdate}>
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
                    {isLoading ? 'Updating...' : 'Update Hike'}
                </button>
            </form>
        </div>
    );
};

export default UpdateHikePage;