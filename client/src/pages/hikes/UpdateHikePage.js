import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateHikePage = ({ currentUser }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hike, setHike] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Simulated fetch to retrieve hike data based on the ID
        const fetchHikeData = async () => {
            try {
                const response = await fetch(`/api/hikes/${id}`);
                const hikeData = await response.json();
                setHike(hikeData);
                setTitle(hikeData.title);
                setDescription(hikeData.description);
                setLevel(hikeData.level);
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
            await fetch(`/api/hikes/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title,
                    description,
                    level,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setIsLoading(false);
            navigate(`/hike/${id}`);
        } catch (error) {
            console.error('Error updating hike:', error);
            setIsLoading(false);
        }
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
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update Hike'}
                </button>
            </form>
        </div>
    );
};

export default UpdateHikePage;