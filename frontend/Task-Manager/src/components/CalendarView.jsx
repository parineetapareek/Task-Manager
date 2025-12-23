import React from "react";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

// ------------------- DATE LOCALIZER SETUP -------------------
const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

// ------------------- EVENT STYLING -------------------
const eventStyleGetter = (event) => {
  let color =
    event.priority === "High"
      ? "#D32F2F" // red
      : event.priority === "Medium"
      ? "#8C6D44" // muted beige/brown
      : "#2E7D32"; // green

  return {
    style: {
      backgroundColor: color,
      color: "white",
      borderRadius: "8px",
      border: "none",
      paddingLeft: "6px",
      paddingRight: "6px",
    },
  };
};

const CalendarView = ({ tasks, onEventClick }) => {
  const events = tasks
    .filter((t) => t.dueDate) // only show tasks with a due date
    .map((t) => ({
      id: t.id,
      title: t.title,
      start: new Date(t.dueDate),
      end: new Date(t.dueDate),
      priority: t.priority,
      originalTask: t,
    }));
  return (
    <div
      style={{
        height: "500px",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        onSelectEvent={(event) => onEventClick(event.originalTask)}
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
        }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default CalendarView;
