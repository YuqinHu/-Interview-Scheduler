import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });


  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(res => {
        setState({...state, appointments})
      })
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(res => {
      setState({...state, appointments})
    })
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
   } 
}
