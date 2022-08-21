import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/Navbar"
import ExercisesList from "./components/ExercisesList"
import EditExercise from "./components/EditExercise"
import CreateExercise from "./components/CreateExercise"
import CreateUser from "./components/CreateUser"

function App() {
  return (
    <Router>
    <div className='container'>

      <Navbar/>
      <br/>

      <Routes> <Route exact path='/' element={ <ExercisesList/>}> </Route>
      <Route exact path='edit/:id' element={ <EditExercise />}></Route>
      {/* <Route exact path='edit/:id' render={(props) => <EditExercise {...props} /> } ></Route> */}
      <Route exact path='create' element={ <CreateExercise/>}></Route>
      <Route exact path='user' element={ <CreateUser/>}></Route></Routes>
    </div>

    </Router>
  );
}

export default App;
