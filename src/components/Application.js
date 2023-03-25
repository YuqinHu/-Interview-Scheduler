import React, { useState, useEffect } from "react";
import axios from "axios";
import Appointment from "components/Appointment";
import "components/Application.scss";
import DayList from "./DayList";
import {getAppointmentsForDay, getInterview}  from "helpers/selectors";




export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });


  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    axios.get("http://localhost:8001/api/days").then(response => setDays(response.data));
  }, []);

  Promise.all([
    Promise.resolve(axios.get('http://localhost:8001/api/days')),
    Promise.resolve(axios.get('http://localhost:8001/api/appointments')),
    Promise.resolve(axios.get('http://localhost:8001/api/interviewers'))
  ]).then((all) => {
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}));
  });
  
  const dailyAppointments = getAppointmentsForDay(state, state.day)

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
          setDays={setDays}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => (
          <Appointment 
            key={appointment.id} 
            id={appointment.id} 
            time={appointment.time} 
            interview={appointment.interview} 
          />
          ))}
          <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
