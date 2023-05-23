import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import HikeList from "../pages/hikes/HikeList";
import NewExercise from "../pages/NewExercise";
import List from "../pages/exercise/List";
import Update from "../pages/exercise/Update";
import Show from "../pages/exercise/Show";

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
          <HikeList user={user}/>
          {/*<main>*/}
          {/*  <Switch>*/}
          {/*    <Route path="/new_exercise">*/}
          {/*      <NewExercise user={user} />*/}
          {/*    </Route>*/}
          {/*    <Route path="/exercises/:exercise_id/update_log/:id">*/}
          {/*      <Update/>*/}
          {/*    </Route>*/}
          {/*    <Route path="/exercises/:id">*/}
          {/*      <Show/>*/}
          {/*    </Route>*/}
          {/*    <Route path="/exercises">*/}
          {/*      <List />*/}
          {/*    </Route>*/}
          {/*    <Route path="/">*/}
          {/*      <List user={user} />*/}
          {/*    </Route>*/}
          {/*  </Switch>*/}
          {/*</main>*/}
      </>
  );
}

export default App;

