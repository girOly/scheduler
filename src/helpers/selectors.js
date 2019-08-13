export function getAppointmentsForDay(state, day) {
  // Find the Right Day out of the [State]
  const days = state.days;
  let appointments = [];
  for (let dayIndv of days) {
    if (dayIndv.name === day) {
      appointments = dayIndv.appointments;
    }
  }
  return appointments.map(id => state.appointments[id]);
}

export function getInterview(state, interview) {
  if (!interview) {
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

export function getInterviewersForDay(state, day) {
  const days = state.days;
  let interviewers = [];
  for (let dayIndv of days) {
    if (dayIndv.name === day) {
      interviewers = dayIndv.interviewers;
    }
  }
  return interviewers.map(id => state.interviewers[id]);
}
