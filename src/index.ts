import { Schedule, Day, Week, Month, Year, DragAndDrop, Resize } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, Month, Year, DragAndDrop, Resize);

let scheduleObj = new Schedule({
    width: '100%', height: '555px',
    selectedDate: new Date(2020, 0, 1),
    views: ['Day', 'Week', 'Month', 'Year'],
    currentView: 'Month',
    group: {
        resources: ['Projects', 'Categories']
    },
    resources: [
        {
            field: 'ProjectId', title: 'Choose Project', name: 'Projects',
            dataSource: [
                { text: 'PROJECT 1', id: 1, color: '#cb6bb2' },
                { text: 'PROJECT 2', id: 2, color: '#56ca85' },
                { text: 'PROJECT 3', id: 3, color: '#df5286' }
            ],
            textField: 'text', idField: 'id', colorField: 'color'
        }, {
            field: 'TaskId', title: 'Category',
            name: 'Categories', allowMultiple: true,
            dataSource: [
                { text: 'Nancy', id: 1, groupId: 1, color: '#df5286' },
                { text: 'Steven', id: 2, groupId: 2, color: '#7fa900' },
                { text: 'Robert', id: 3, groupId: 3, color: '#ea7a57' },
                { text: 'Smith', id: 4, groupId: 1, color: '#5978ee' },
                { text: 'Micheal', id: 5, groupId: 2, color: '#df5286' },
                { text: 'Root', id: 6, groupId: 3, color: '#00bdae' }
            ],
            textField: 'text', idField: 'id', groupIDField: 'groupId', colorField: 'color'
        }
    ],
    eventSettings: { dataSource: yearDataGenerator(500, new Date(2020, 0, 1), 2) }
});
scheduleObj.appendTo('#schedule');

function yearDataGenerator(count: number = 100, date: Date = new Date(), yearCount: number = 0): Record<string, any>[] {
    const startDate: Date = new Date(date.getFullYear(), 0, 1);
    const endDate: Date = new Date(date.getFullYear() + yearCount, 11, 31);
    const dateCollections: Record<string, any>[] = [];
    for (let a: number = 0, id: number = 1; a < count; a++) {
        const start: Date = new Date(Math.random() * (endDate.getTime() - startDate.getTime()) + startDate.getTime());
        const end: Date = new Date(new Date(start.getTime()).setHours(start.getHours() + 1));
        dateCollections.push({
            Id: id,
            Subject: id.toString(),
            StartTime: new Date(start.getTime()),
            EndTime: new Date(end.getTime()),
            IsAllDay: (id % 10) ? true : false,
            ProjectId: (id % 3) + 1,
            TaskId: (id % 6) + 1
        });
        id++;
    }
    return dateCollections;
}
