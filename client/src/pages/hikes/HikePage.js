import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import {Button} from "../../styles";

const HikePage = ({user, onDeleteHike, onJoinHike, onLeaveHike}) => {
    const {id} = useParams();
    const [hike, setHike] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [isJoined, setIsJoined] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const history = useHistory()

    useEffect(() => {
        // Simulated fetch to retrieve hike data based on the ID
        fetch(`/hikes/${id}`)
            .then((r) => r.json())
            .then(setHike);

    }, [id]);

    useEffect(() => {
        if (hike) {
            setIsOwner(user.id === hike.owner_id);
            setComments(hike.comments)
            const isHikeIncluded = user.participated_hikes.some(
                (participatedHike) => participatedHike.id === hike.id
            );

            setIsJoined(isHikeIncluded)
        }
    }, [hike])



    const handleDelete = () => {
        // Simulated API request to delete the hike
        fetch(`/hikes/${id}/owners`, {
            method: 'DELETE',
        })
            .then((r) => r.json())
            .then(() => {
                onDeleteHike(id)
                history.push("/")
            })
            .catch((error) => {
                console.error('Error deleting hike:', error);
            });
    };


    const handleJoin = () => {
        fetch(`/hikes/${id}/participants/join`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((r) => {
                if (r.ok) {
                    const participated_hikes = user.participated_hikes
                    onJoinHike(hike)
                    setIsJoined(true)
                }
            })
    };

    const handleLeave = () => {
        fetch(`/hikes/${id}/participants/leave`, {
            method: 'DELETE',
        }).then((r) => r.json())
            .then(() => {
                onLeaveHike(id)
                setIsJoined(false)
                history.push("/")
            })
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();

        const newComment = {
            user: user.id, text: comment,
        };

        setComments((prevComments) => [...prevComments, newComment]);

        setComment('');

        fetch(`/hikes/${id}/comments`, {
            method: 'POST', body: JSON.stringify({comment: {text: comment}}), headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((r) => r.json())
            .then(setComments);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleDeleteComment = (comment_id) => {
        fetch(`/hikes/${hike.id}/comments/${comment_id}`, {
            method: 'DELETE',
        })
            .then((r) => r.json())
            .then(setComments)
            .catch((error) => {
                console.error('Error deleting hike:', error);
            });
    }

    if (!hike) {
        return <div>Loading hike data...</div>;
    }

    return (
        <div>
            <h1>{hike.title}</h1>
            <p>{hike.description}</p>
            <p>Level: {hike.level}</p>
            <p>Location title: {hike.location_title}</p>
            <p>Location address: {hike.location_address}</p>
            <p>Owner ID: {user.id}</p>

            {isOwner ? (<>
                <Button as={Link}>
                    <Link to={`/hikes/${hike.id}/update`} params={{qwe: "hello"}}>Edit hike</Link>
                </Button>
                <Button onClick={handleDelete}>Delete hike</Button>
            </>) : (<>
                {isJoined ? (<button onClick={handleLeave}>Leave Hike</button>) : (
                    <button onClick={handleJoin}>Join Hike</button>)}
            </>)}

            <h2>Comments</h2>
            <div>
                {comments ? (
                    comments.map((comment, index) => (
                        <div key={index} className="comment-frame">
                            <p>User: {comment.user_id}</p>
                            <p>Comment: {comment.text}</p>
                            {(user.id === comment.user_id || hike.owner_id === user.id) ?
                                <>
                                    <button
                                        className="delete-comment"
                                        onClick={() => handleDeleteComment(comment.id)}
                                    >
                                        Delete
                                    </button>
                                </>
                                : null
                            }
                        </div>
                    ))
                ) : (
                    <>Put your comment here</>
                )}
            </div>


                <form onSubmit={handleCommentSubmit}>
    <textarea
        value={comment}
        onChange={handleCommentChange}
        placeholder="Write a comment..."
    />
                    <button type="submit">Submit</button>
                </form>

        </div>);
};

export default HikePage;