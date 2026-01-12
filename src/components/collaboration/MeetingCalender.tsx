import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// TypeScript Error fix karne ke liye interface
interface CalendarEvent {
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
  backgroundColor?: string;
  borderColor?: string;
}

const MeetingCalendar: React.FC = () => {
  // Calendar Events State
  const [events, setEvents] = useState<CalendarEvent[]>([
    { 
      title: 'Investor Meet', 
      start: '2026-01-15T10:00:00', 
      end: '2026-01-15T11:00:00', 
      backgroundColor: '#4f46e5' 
    }
  ]);

  // Naya Event add karne ka function
  const handleDateClick = (arg: any) => {
    const title = prompt('Meeting ka title likhein:');
    if (title) {
      const newEvent: CalendarEvent = {
        title,
        start: arg.dateStr,
        allDay: arg.allDay,
        backgroundColor: '#10b981' // New events will be green
      };
      setEvents([...events, newEvent]);
    }
  };

  return (
    <div className="space-y-6">
      {/* --- CALENDAR SECTION --- */}
      <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Meeting Schedule</h2>
          <p className="text-gray-500">Manage your availability and meetings</p>
        </div>

        <div className="calendar-custom-style">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek'
            }}
            events={events}
            selectable={true}
            dateClick={handleDateClick}
            height="65vh"
            eventClassNames="rounded-md border-none px-2 py-1 text-xs shadow-sm"
            dayMaxEvents={true}
          />
        </div>
      </div>

      {/* --- PENDING REQUESTS SECTION (Milestone 2) --- */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-2 h-6 bg-indigo-600 rounded-full mr-2"></span>
          Pending Meeting Requests
        </h3>
        
        <div className="space-y-3">
          {[
            { id: 1, name: "Sarah Khan", role: "Investor", time: "Jan 18, 02:00 PM" },
            { id: 2, name: "Zeeshan Ahmed", role: "Entrepreneur", time: "Jan 20, 11:30 AM" }
          ].map((request) => (
            <div key={request.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 gap-4">
              <div>
                <p className="font-semibold text-gray-900">{request.name}</p>
                <p className="text-sm text-gray-500">{request.role} • {request.time}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => alert(`${request.name}'s meeting accepted!`)}
                  className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition shadow-sm"
                >
                  Accept
                </button>
                <button 
                  onClick={() => alert('Meeting declined')}
                  className="px-4 py-2 bg-white text-red-600 border border-red-200 text-sm font-medium rounded-md hover:bg-red-50 transition"
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Styling */}
      <style>{`
        .fc .fc-toolbar-title { font-size: 1.25rem; font-weight: 700; color: #1f2937; }
        .fc .fc-button-primary { background-color: #4f46e5; border: none; font-weight: 500; text-transform: capitalize; }
        .fc .fc-button-primary:hover { background-color: #4338ca; }
        .fc .fc-button-active { background-color: #3730a3 !important; }
        .fc th { padding: 10px 0; background-color: #f9fafb; color: #6b7280; font-weight: 600; }
        .fc-daygrid-day:hover { background-color: #f3f4f6; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default MeetingCalendar;