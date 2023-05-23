import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {Link} from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";


function ExerciseList({user}) {
  
    return (
        <>
        
            <Wrapper>
            
                 {
                 user.all_exercises.map((exercise) => (
                       
                     <Exercise key={exercise.id}>
                         <Box>
                             <h2>{exercise.title}</h2>
                             <ReactMarkdown>{exercise.description}</ReactMarkdown>
                         </Box>
                     </Exercise>
                    ))
                    } 

            </Wrapper>
        </>
    );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Exercise = styled.article`
  margin-bottom: 24px;
`;

export default ExerciseList;
