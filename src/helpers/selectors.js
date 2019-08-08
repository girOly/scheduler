export function getAppointmentsForDay(state, day) {
  // Find the Right Day out of the [State]
  const days = state.days;
  const output = [];
  for (let dayIndv of days) {
    if (dayIndv.name === day) {
      output = dayIndv.appointment;
    }
    // [1,2,3] etc
  }
  // Get Appointments out of the Day
  return output.map(id => {
    state.appointments[id];
  });
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  let interviewerIndv = interview.interviewer;

  let interviewObject = {
    student: interview.student,
    interviewer: {
      id: state.interviewers[interviewerIndv].id,
      name: state.interviewers[interviewerIndv].name,
      avatar: state.interviewers[interviewerIndv].avatar
    }
  };
  return interviewObject;
}
