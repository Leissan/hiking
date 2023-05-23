import React, { useState } from 'react';

const CreateHikePage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('');
    const [locationId, setLocationId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCreate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Simulated API request to create a new hike
            const response = await fetch('/hikes', {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    description,
                    level,
                    location_id: locationId,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Handle successful creation, e.g., navigate to the newly created hike page
            } else {
                // Handle unsuccessful creation, e.g., display an error message
            }
        } catch (error) {
            console.error('Error creating hike:', error);
        }

        setIsLoading(false);
    };

    return (
        <div>
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
                    <label>Location ID:</label>
                    <input
                        type="text"
                        value={locationId}
                        onChange={(e) => setLocationId(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Hike'}
                </button>
            </form>
        </div>
    );
};

export default CreateHikePage;