import { createContext, useContext } from "react";
import useSWR from "swr";

const CalendarContext = createContext<{
  events: string[];
  isLoading: boolean;
}>({
  events: [],
  isLoading: true,
});
export function CalendarContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  let url = `/api/calendar/get-events`;

  const { data: eventsToJSON, isLoading } = useSWR(url, async () => {
    const res = await fetch(url);
    return res.json();
  });

  let events = [];
  if (eventsToJSON && eventsToJSON != "[object Object]") {
    events = JSON.parse(eventsToJSON);
  }

  return (
    <CalendarContext.Provider value={{ events, isLoading }}>
      {children}
    </CalendarContext.Provider>
  );
}
export function useCalendarContext() {
  return useContext(CalendarContext);
}

export default CalendarContext;
