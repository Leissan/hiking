import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Button, Error, FormField, Input, Label, Textarea} from "../styles";


function NewLog({user, onCreateLog}) {
    const [exerciseId, setExerciseId] = useState(user.all_exercises[0].id)
    const [repetitionCount, setRepetitionCount] = useState(null)
    const [repetitionType, setRepetitionType] = useState(null)
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const history = useHistory();
    const navigate = useNavigate();

    const [logs, setLogs] = useState(user.logs);

    const handleSelect = (e) => {
        setExerciseId(e.target.value);
    };


    function handleSubmit(e) {
        e.preventDefault();
        const logData = { exercise_id: exerciseId, repetition_count: repetitionCount, repetition_type: repetitionType };
        fetch("/logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(logData),
        })
            .then((r) => r.json())
            .then((log) => {
                setLogs((prevLogs) => [log, ...prevLogs]);
                setIsLoading(false);
                onCreateLog(log); // call callback function here
                navigate("/history");
            })
            .catch((err) => {
                setErrors(["Something went wrong. Please try again."]);
                setIsLoading(false);
            });
    }

    return (
        <Wrapper>
            <WrapperChild>
                <h2>Create Log</h2>
                <form onSubmit={handleSubmit}>
                    <FormField>
                        <select onChange={handleSelect}>
                            {user.all_exercises.map(item => {
                                return (<option value={item.id} key={item.id}>Logging my {item.title}</option>);
                            })}
                        </select>
                    </FormField>
                    <h3>Don't see the exercise you want to log? Create it here! </h3>
                    <div style={{marginBottom: 24}}>
                        <Button as={Link} to="/new_exercise">
                            Add new exercise
                        </Button>
                    </div>
                    <FormField>
                        <Label htmlFor="repetitionCount">Repetition count</Label>
                        <Input
                            type="number"
                            id="repetitionCount"
                            value={repetitionCount}
                            onChange={(e) => setRepetitionCount(e.target.value)}
                        />
                    </FormField>
                    <FormField>
                        <Label htmlFor="repetitionType">Repetition type</Label>
                        <Input
                            type="text"
                            id="repetitionType"
                            value={repetitionType}
                            onChange={(e) => setRepetitionType(e.target.value)}
                        />
                    </FormField>
                    <FormField>
                        <Button color="primary" type="submit">
                            {isLoading ? "Loading..." : "Submit Log"}
                        </Button>
                    </FormField>
                    <FormField>
                        {errors.map((err) => (
                            <Error key={err}>{err}</Error>
                        ))}
                    </FormField>
                </form>
            </WrapperChild>
        </Wrapper>
    );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default NewLog;