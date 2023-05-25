import React, {useEffect, useState, useContext} from "react";
import {Switch, Route} from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import HikeList from "../pages/hikes/HikeList";
import HikePage from "../pages/hikes/HikePage";
import CreateHikePage from "../pages/hikes/CreateHikePage";
import UpdateHikePage from "../pages/hikes/UpdateHikePage";
import CreateLocation from "../pages/locations/CreateLocation";
import UserContext from './UserContext';

function App() {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        fetch("/me").then((r) => {
            if (r.ok) {
                r.json().then(
                    (u) => {
                        setUser(u);
                    }
                );
            }
        });
    }, []);


    // Add hike to owned_hikes
    function handleAddOwnedHike(hike) {
        return setUser({...user, owned_hikes: [...user.owned_hikes, hike]})
    }

    // Delete hike from owned_hikes
    function handleDeleteOwnedHike(hikeId) {
        setUser((prevUser) => {
            const updatedOwnedHikes = prevUser.owned_hikes.filter((hike) => hike.id !== parseInt(hikeId));
            return {
                ...prevUser,
                owned_hikes: updatedOwnedHikes,
            };
        });
    }

    function handleUpdateOwnedHike(hike) {
        // setUser((prevUser) => {
        //     const updatedOwnedHikes = prevUser.owned_hikes.filter((hike) => hike.id !== parseInt(hike.Id));
        //     return {
        //         ...prevUser,
        //         owned_hikes: updatedOwnedHikes,
        //     };
        // });

        setUser((prevUser) => {
            const updatedOwnedHikes = prevUser.owned_hikes.map((h) => {
                if (h.id === hike.id) {
                    return {
                        ...h,
                        title: hike.title,
                    };
                }
                console.log("h", h)
                console.log("hike", hike)
                return h;
            });

            return {
                ...prevUser,
                owned_hikes: updatedOwnedHikes,
            };
        });
    }

    // Add hike to participant_hikes
    function handleAddParticipantHike(hike) {
        setUser({...user, participated_hikes: [...user.participated_hikes, hike]})
    }

    // Delete hike from participant_hikes
    function handleDeleteParticipantHike(hikeId) {
        setUser((prevUser) => {
            const updatedParticipantHikes = prevUser.participated_hikes.filter((hike) => hike.id !== parseInt(hikeId));
            return {
                ...prevUser,
                participated_hikes: updatedParticipantHikes,
            };
        });
    }

    if (!user) return <UserContext.Provider value={{user, setUser}} ><Login/></UserContext.Provider>;

    return (
        <>
          <UserContext.Provider value={{ user, setUser }}>
            <NavBar/>
            <main>
                <Switch>
                    <Route path="/hikes/:id/update">
                        <UpdateHikePage  onUpdateHike={handleUpdateOwnedHike}/>
                    </Route>
                    <Route path="/hikes/:id">
                        <HikePage  onDeleteHike={handleDeleteOwnedHike} onJoinHike={handleAddParticipantHike} onLeaveHike={handleDeleteParticipantHike}/>
                    </Route>
                    <Route path="/hike/create">
                        <CreateHikePage  onCreateHike={handleAddOwnedHike}/>
                    </Route>
                    <Route path="/location/create">
                        <CreateLocation/>
                    </Route>
                    <Route path="/">
                        <HikeList />
                    </Route>
                </Switch>
            </main>
            </UserContext.Provider>
        </>
    );
}

export default App;
