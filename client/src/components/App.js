import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import HikeList from "../pages/hikes/HikeList";
import HikePage from "../pages/hikes/HikePage";
import CreateHikePage from "../pages/hikes/CreateHikePage";
import UpdateHikePage from "../pages/hikes/UpdateHikePage";
import CreateLocation from "../pages/locations/CreateLocation";

function App() {
    const [user, setUser] = useState(null);
    const [myHikes, setMyHikes] = useState([]);
    const [otherHikes, setOtherHikes] = useState([]);
    const [participantHikes, setParticipantHikes] = useState([]);

    useEffect(() => {
        // auto-login
        fetch("/me").then((r) => {
            if (r.ok) {
                r.json().then(
                    (u) => {
                        setUser(u);
                    }
                );
            }
        });

        // fetchMyHikes();
        // fetchOtherHikes();
        // fetchParticipantHikes();
    }, []);

    useEffect(() => {
        // auto-login
        if(user) {
            setMyHikes(user.owned_hikes);
            setParticipantHikes(user.participated_hikes);
        }

        // fetchMyHikes();
        // fetchOtherHikes();
        // fetchParticipantHikes();
    }, [user]);

    if (!user) return <Login onLogin={setUser}/>;

    return (
        <>
            <NavBar user={user} setUser={setUser}/>
            <main>
                <Routes>
                    <Route path="/hikes/:id/update" element ={<UpdateHikePage/>}>
                    </Route>
                    <Route path="/hikes/:id" element={<HikePage user={user}/>} >
                    </Route>
                    <Route path="/hike/create" element ={<CreateHikePage user={user}/>}>
                    </Route>
                    <Route path="/location/create" element ={<CreateLocation/>}>
                    </Route>
                    <Route path="/" element={<HikeList user={user}/>}>
                    </Route>

                </Routes>
            </main>
        </>
    );
}

export default App;