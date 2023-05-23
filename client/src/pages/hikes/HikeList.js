import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Link, useNavigate} from "react-router-dom";

const HikeList = (user) => {
    const [myHikes, setMyHikes] = useState([]);
    const [otherHikes, setOtherHikes] = useState([]);
    const [participantHikes, setParticipantHikes] = useState([]);

    useEffect(() => {
        fetchMyHikes(user.user.owned_hikes);
        // fetchOtherHikes();
        fetchParticipantHikes(user.participant_hikes);
    }, []);

    const fetchMyHikes = (myHikesData) => {
        // console.log("!!", user.owned_hikes)
        setMyHikes(myHikesData);
    };

    const fetchParticipantHikes = (participantHikesData) => {
        setParticipantHikes(participantHikesData);
    };

    return (<Container>
        <Column>
            <h2>My Hikes</h2>
            <ul>
                {myHikes ? <>
                    {myHikes.map((hike) => (<li key={hike.id}><Link to = {`/hikes/${hike.id}`}>{hike.title}</Link></li>))}
                </> : null}
            </ul>
        </Column>
        <Column>
            <h2>Other Hikes</h2>
            <ul>
                {/*{otherHikes.map((hike) => (*/}
                {/*    <li key={hike.id}>{hike.name}</li>*/}
                {/*))}*/}
            </ul>
        </Column>
        <Column>
            <h2>Participant Hikes</h2>
            <ul>
                {participantHikes ? <>
                    {participantHikes.map((hike) => (<li key={hike.id}>{hike.name}</li>))}
                </> : null}

            </ul>
        </Column>
    </Container>);
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  flex-basis: 30%;
  padding: 20px;
  background-color: #f2f2f2;

  h2 {
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
`;

export default HikeList;