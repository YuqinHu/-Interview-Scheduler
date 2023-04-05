import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {}
  });


  const setDay = day => setState({ ...state, day });

  //sed to fetch data from the API server on page load, and update the state accordingly
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);


  //update the number of spots remaining for each day when appointments are added or deleted
  const updateSpots = (appointments) => {
    const dayOfWeek = state.days.find((day) => day.name === state.day
    );
    let counter = 0;
    dayOfWeek.appointments.forEach((id) => {
      if (appointments[id].interview === null) {
        counter++;
      }
    });
    const newDay = { ...dayOfWeek, spots: counter };
    const newDayArray = [...state.days];
    newDayArray[dayOfWeek.id - 1] = newDay;
    return newDayArray;
  };

  //are used to handle updating appointments
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(appointments); 


    return axios.put(`/api/appointments/${id}`, { interview })
      .then(res => {
        setState({ ...state, appointments, days })
      })
  }


  //are used to handle deleting appointments
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    const days = updateSpots(appointments); 

    return axios.delete(`/api/appointments/${id}`)
      .then(res => {
        setState({ ...state, appointments, days })
      })
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
