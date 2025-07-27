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
import styles from "./calendarComponent.module.scss";

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
  const getPriorityStyle = (priority: number) => {
    switch (priority) {
      case 0:
        return {
          style: {
            backgroundColor: "#ff4d4f",
          },
        };
      case 1:
        return {
          style: {
            backgroundColor: "#faad14",
          },
        };
      case 2:
        return {
          style: {
            backgroundColor: "#52c41a",
          },
        };
      default:
        return { style: {} };
    }
  };

  return (
    <Calendar
      className={styles.calendar}
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
      defaultView={Views.MONTH}
      date={selected || new Date()}
      onNavigate={(date) => setSelected(date)}
      formats={formats}
      eventPropGetter={(event) => getPriorityStyle(event.priority)}
    />
  );
};

export default CalendarComponent;
