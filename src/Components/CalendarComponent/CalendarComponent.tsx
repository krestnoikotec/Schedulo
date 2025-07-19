import React from "react";
import {
  Calendar,
  momentLocalizer,
  Views,
  DateLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvents, CalendarProps } from "@/Types/Types";
import "moment/locale/uk";

const mLocalizer: DateLocalizer = momentLocalizer(moment);
moment.locale("uk");

const formats = {
  timeGutterFormat: (date: Date) => moment(date).format("HH:mm"),
  eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
    `${moment(start).format("HH:mm")} – ${moment(end).format("HH:mm")}`,
  agendaTimeFormat: (date: Date) => moment(date).format("HH:mm"),
};

const CalendarComponent = ({
  events,
  setCalendarView,
  calendarView,
  selected,
  setSelected,
}: CalendarProps) => {
  return (
    <Calendar
      localizer={mLocalizer}
      events={events.map(
        (task): CalendarEvents => ({
          ...task,
          start: new Date(task.dateStart),
          end: new Date(task.dateEnd),
          title: task.title,
        }),
      )}
      onView={(view) => setCalendarView(view)}
      view={calendarView}
      views={["month", "week", "day", "agenda"]}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 700, width: 800, margin: "10px" }}
      defaultView={Views.MONTH}
      date={selected || new Date()}
      onNavigate={(date) => setSelected(date)}
      formats={formats}
    />
  );
};

export default CalendarComponent;
