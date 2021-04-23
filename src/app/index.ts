import { Schedule, Day, Week, WorkWeek, Month, Agenda, MonthAgenda, Print } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, MonthAgenda, Print);

let scheduleObj = new Schedule({
    currentView: 'Agenda',
    width: '100%', height: '555px',
    selectedDate: new Date(2017, 10, 1),
    eventSettings: {
        dataSource: generateObject()
    }
});
scheduleObj.appendTo('#schedule');

document.getElementById('print').onclick = (): void => {
    scheduleObj.print({
        height: (document.getElementById('printHeight') as HTMLSelectElement).value,
        width: (document.getElementById('printWidth') as HTMLSelectElement).value,
        printView: scheduleObj.currentView
    });
};

function generateObject(): Record<string, any>[] {
    const data: Record<string, any>[] = [];
    const names: string[] = [
        'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
        'Farewell Celebration', 'Wedding Anniversary', 'Alaska: The Last Frontier', 'Deadest Catch', 'Sports Day',
        'MoonShiners', 'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice',
        'Rugby Match', 'Guitar Class', 'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
    ];
    const start: number = new Date(2017, 0, 1).getTime();
    const end: number = new Date(2018, 11, 31).getTime();
    const dayCount: number = 1000 * 60 * 60;
    for (let a: number = start, id: number = 3; a < end; a += (dayCount * 24) * 2) {
        const count: number = Math.floor((Math.random() * 9) + 1);
        for (let b: number = 0; b < count; b++) {
            const hour: number = Math.floor(Math.random() * 100) % 24;
            const minutes: number = Math.round((Math.floor(Math.random() * 100) % 60) / 5) * 5;
            const nCount: number = Math.floor(Math.random() * names.length);
            const startDate: Date = new Date(new Date(a).setHours(hour, minutes));
            const endDate: Date = new Date(startDate.getTime() + (dayCount * 2.5));
            data.push({
                Id: id,
                Subject: names[nCount],
                StartTime: startDate,
                EndTime: endDate,
                IsAllDay: (id % 10) ? false : true
            });
            id++;
        }
    }
    const longerEvent: Record<string, any> = {
        Id: 0,
        StartTime: new Date(2017, 0, 1),
        EndTime: new Date(2017, 0, 10),
        IsAllDay: true,
        Location: 'Chennai'
    };
    const occurrenceEvent: Record<string, any> = {
        Id: 1,
        StartTime: new Date(2017, 0, 1),
        EndTime: new Date(2017, 0, 10),
        IsAllDay: true,
        RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=5',
        RecurrenceId: 0
    };
    const recurrenceEvent: Record<string, any> = {
        Id: 2,
        StartTime: new Date(2017, 0, 1),
        EndTime: new Date(2017, 0, 10),
        IsAllDay: true,
        RecurrenceRule: 'FREQ=DAILY;INTERVAL=1'
    };
    data.push(longerEvent);
    data.push(occurrenceEvent);
    data.push(recurrenceEvent);
    return data;
}
