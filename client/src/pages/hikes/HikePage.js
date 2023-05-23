import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Button} from "../../styles";

const HikePage = (currentUser) => {
    const {id} = useParams();
    const [hike, setHike] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [isJoined, setIsJoined] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        // Simulated fetch to retrieve hike data based on the ID
        fetch(`/hikes/${id}`)
            .then((r) => r.json())
            .then(setHike);
        setUser(currentUser.user);

    }, [id]);

    console.log("hike", hike)

    useEffect(() => {
        if(hike) {
            setIsOwner(user.id === hike.owner_id);
        }
    }, [hike])

    const handleEdit = () => {
        // Handle edit functionality
    };

    const handleDelete = () => {
        // Simulated API request to delete the hike
        fetch(`/hikes/${id}/owners`, {
            method: 'DELETE',
        })
            .then((r) => {
                if (r.ok) {
                    // Handle successful deletion, e.g., navigate to a different page
                    navigate("/")
                } else {
                    // Handle unsuccessful deletion, e.g., display an error message
                }
            })
            .catch((error) => {
                console.error('Error deleting hike:', error);
            });
    };

    const handleJoin = () => {
        // Handle join functionality
    };

    const handleLeave = () => {
        // Handle leave functionality
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();

        // Simulated API request to add a comment
        const newComment = {
            user: currentUser.id,
            text: comment,
        };

        // Update the comments state with the new comment
        setComments((prevComments) => [...prevComments, newComment]);

        // Clear the comment input field
        setComment('');
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    if (!hike) {
        return <div>Loading hike data...</div>;
    }

    console.log("!!!!!!!!!!!", user)

    return (
        <div>
            <h1>{hike.title}</h1>
            <p>{hike.description}</p>
            <p>Level: {hike.level}</p>
            <p>Location ID: {hike.location_id}</p>
            <p>Owner ID: {user.id}</p>

            {isOwner ? (
                <>
                    <Button as={Link} to={`/hikes/${hike.id}/update`}>
                        Edit hike
                    </Button>
                    <Button onClick={handleDelete}>Delete hike</Button>
                </>
            ) : (
                <>
                    {isJoined ? (
                        <button onClick={handleLeave}>Leave Hike</button>
                    ) : (
                        <button onClick={handleJoin}>Join Hike</button>
                    )}
                </>
            )}

            <h2>Comments</h2>
            <div>
                {comments ?
                    comments.map((comment, index) => (
                        <div key={index}>
                            <p>User: {comment.user}</p>
                            <p>Comment: {comment.text}</p>
                        </div>
                    ))
                 : <>Put you comment here</>}

            </div>

            {currentUser && (
                <form onSubmit={handleCommentSubmit}>
          <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Write a comment..."
          ></textarea>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default HikePage;