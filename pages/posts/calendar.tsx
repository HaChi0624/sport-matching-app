import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import listPlugin from "@fullcalendar/list";

const Calendar = () => {
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        locales={[jaLocale]}
        locale="ja"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek listWeek",
        }}
        events={[
          { title: "交流戦", start: "2023-05-30", end: "2023-06-18" },
          { title: "オリ姫Day", start: "2023-06-06", end: "2023-06-11" },
        ]}
      />
    </>
  );
};

export default Calendar;

//