import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// 1. Event ke liye Interface banayein taake TypeScript ko pata ho data kaisa hai
interface CalendarEvent {
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
}

const MeetingCalendar = () => {
  // 2. State ko type dein <CalendarEvent[]>
  const [events, setEvents] = useState<CalendarEvent[]>([
    { title: 'Investor Meet', start: '2026-01-15T10:00:00', end: '2026-01-15T11:00:00' }
  ]);

  // 3. 'arg' ko 'any' type dein taake error khatam ho jaye
  const handleDateClick = (arg: any) => {
    const title = prompt('Meeting ka title likhein:');
    if (title) {
      setEvents([...events, { 
        title, 
        start: arg.dateStr, 
        allDay: arg.allDay 
      }]);
    }
  };

  return (
    <div className="calendar-container" style={{ padding: '20px', background: '#fff', color: '#000' }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        selectable={true}
        dateClick={handleDateClick}
      />
    </div>
  );
};

export default MeetingCalendar;