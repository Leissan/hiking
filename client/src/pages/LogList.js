import React, {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Box, Button} from "../styles";


function LogList({user, setUser, onDelete}) {
    function handleDeleteLog(id) {
        fetch(`/logs/${id}`, {method: "DELETE"})
        onDelete(id)
    }

    return (
        <>
            <Wrapper>
                <div style={{marginBottom: 24}}>
                    <Button as={Link} to="/new_logs">
                        Add new log
                    </Button>
                </div>
               
                {user.logs.length > 0 ? (
                    user.exercises.map((exercise) => (
                        <>
                        
                        <Log key={exercise.id}>
                            <Box>
                                <h2>{exercise.title}</h2>
                                {exercise.logs.map((log) => (
                                <>
                                
                                <p>
                                    Repetion count: {log.repetition_count}
                                </p>
                                <p>
                                    Repetion type: {log.repetition_type}
                                </p>
                    
                                <p>
                                    Was made at: {log.log_date}
                                </p>
                                
                                <Button as={Link} onClick={() => handleDeleteLog(log.id)}>
                                    Delete log
                                </Button>
                                <Button as={Link} to={`/update_log/${log.id}`}>
                                    Update log
                                </Button>
                            
                                </>))}
                            </Box>
                        </Log>
                        </>
                    ))
                ) : (
                    <h2>No Logs Found</h2>
                )}
            </Wrapper>
        </>
    );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Log = styled.article`
  margin-bottom: 24px;
`;

export default LogList;

////user.exercise.map then inside of it exercise.logs.map