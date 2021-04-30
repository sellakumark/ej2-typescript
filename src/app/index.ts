import { Schedule, Day, Week, WorkWeek, Month } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month);

let scheduleObj = new Schedule({
    width: '100%', height: '600px',
    selectedDate: new Date(2021, 3, 28),
    enableAllDayScroll: true,
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
            field: 'TaskId', title: 'Category', name: 'Categories', allowMultiple: true,
            dataSource: [
                { text: 'Nancy', id: 1, groupId: 1, color: '#df5286' },
                { text: 'Steven', id: 2, groupId: 1, color: '#7fa900' },
                { text: 'Robert', id: 3, groupId: 2, color: '#ea7a57' },
                { text: 'Smith', id: 4, groupId: 2, color: '#5978ee' },
                { text: 'Micheal', id: 5, groupId: 3, color: '#df5286' },
                { text: 'Root', id: 6, groupId: 3, color: '#00bdae' }
            ],
            textField: 'text', idField: 'id', groupIDField: 'groupId', colorField: 'color'
        }
    ],
    eventSettings: {
        dataSource: generateObject()
    }
});
scheduleObj.appendTo('#schedule');

document.getElementById('allday').onchange = (e: Event) => {
    scheduleObj.enableAllDayScroll = (e.target as HTMLSelectElement).value === 'true';
};

document.getElementById('height').onchange = (e: Event) => {
    scheduleObj.height = (e.target as HTMLSelectElement).value;
};

document.getElementById('grouping').onchange = (e: Event) => {
    scheduleObj.group.resources = (e.target as HTMLSelectElement).value === 'true' ? ['Projects', 'Categories'] : [];
};

function generateObject(): Record<string, any>[] {
    const data: Record<string, any>[] = [];
    for (let a: number = 0; a < 25; a++) {
        data.push({
            Id: a + 1,
            Subject: 'Testing',
            StartTime: new Date(2021, 3, 28),
            EndTime: new Date(2021, 3, 29),
            IsAllDay: true,
            ProjectId: 1,
            TaskId: 2
        });
    }
    return data;
}
