import React, {useEffect, useState, useContext} from 'react';
import styled from 'styled-components';
import {Link, useHistory} from "react-router-dom";
import {Button} from "../../styles";
import UserContext from '../../components/UserContext';

const HikeList = () => {
    const { user } = useContext(UserContext);
    const [myHikes, setMyHikes] = useState([]);
    const [allHikes, setAllHikes] = useState([]);
    const [participantHikes, setParticipantHikes] = useState([]);

    useEffect(() => {
        if (user) {
            fetchMyHikes(user.owned_hikes);
            fetchAllHikes(user.all_hikes);
            fetchParticipantHikes(user.participated_hikes);
        }
    }, [user]);

    const fetchMyHikes = (myHikesData) => {
        // console.log("!!", user.owned_hikes)
        setMyHikes(myHikesData);
    };

    const fetchAllHikes = (allHikesData) => {
        // console.log("!!", user.owned_hikes)
        setAllHikes(allHikesData);
    };

    const fetchParticipantHikes = (participantHikesData) => {
        setParticipantHikes(participantHikesData);
    };

    if (user) {
        return (<Container>
            <Button as={Link} to={`/hike/create`}>
                Create hike
            </Button>
            <Column>
                <h2>My Hikes</h2>
                <ul>
                    {myHikes ? <>
                        {myHikes.map((hike) => (
                            <li key={hike.id}> Hike Title: <Link to={`/hikes/${hike.id}`}>{hike.title}</Link></li>
                        ))}
                    </> : null}
                </ul>
            </Column>
            <Column>
                <h2>All Hikes</h2>
                <ul>
                    {allHikes.map((hike) => (
                        <li key={hike.id}>Hike Title: <Link to={`/hikes/${hike.id}`}>{hike.title}</Link></li>
                    ))}
                </ul>
            </Column>
            <Column>
                <h2>Participant Hikes</h2>
                <ul>
                    {participantHikes ? <>
                        {participantHikes.map((hike) => (
                            <li key={hike.id}> Hike Title: <Link to={`/hikes/${hike.id}`}>{hike.title}</Link></li>
                        ))}
                    </> : null}

                </ul>
            </Column>
            <Button as={Link} to={`/location/create`}>
                Create location
            </Button>
        </Container>);
    }
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  flex-basis: 30%;
  padding: 20px;
  background-color: #f2f2f2;
  border-right: 1px solid #ccc;

  h2 {
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  &:last-child {
    border-right: none;
  }
`;

export default HikeList;