export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
}

let calendarEvents: CalendarEvent[] = [];

export const getCalendarEvents = () => calendarEvents;

export const addEventToCalendar = (event: CalendarEvent) => {
  calendarEvents.push(event);
};