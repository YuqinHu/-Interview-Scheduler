export function getAppointmentsForDay(state, day) {
  let results = [];
  state.days.forEach((dayAppointment) => {
    if (dayAppointment.name === day) {
      dayAppointment.appointments.forEach((appointment) =>
        results.push(state.appointments[appointment])
      );
    }
  });
  return results;
}


export function getInterview(state, interview) {
  if (interview === null) return null;

  for (let person in state.interviewers) {
    if (state.interviewers[person].id === interview.interviewer) {
      return {
        student: interview.student,
        interviewer: state.interviewers[person],
      };
    }
  }
}

export function getInterviewersForDay(state, day) {
  let results = [];
  state.days.forEach((dayAppointment) => {
    if (dayAppointment.name === day) {
      dayAppointment.interviewers.forEach((person) =>
        results.push(state.interviewers[person])
      );
    }
  });
  return results;
}