import { Ajax, L10n, loadCldr, setCulture, enableRtl } from '@syncfusion/ej2-base';
import { Month, Schedule, Week } from '@syncfusion/ej2-schedule';

Schedule.Inject(Week, Month);

function loadCultureFiles(name: string, base: boolean = false): void {
    let files: string[] = !base ?
        ['ca-gregorian.json', 'numbers.json', 'timeZoneNames.json', 'currencies.json', 'ca-islamic.json'] : ['numberingSystems.json'];
    for (let prop of files) {
        let val: Object;
        let ajax: Ajax;
        if (base) {
            ajax = new Ajax('./cldr-data/supplemental/' + prop, 'GET', false);
        } else {
            ajax = new Ajax('./cldr-data/main/' + name + '/' + prop, 'GET', false);
        }
        ajax.onSuccess = (value: JSON) => {
            val = value;
        };
        ajax.send();
        loadCldr(JSON.parse(<string>val));
    }
}

loadCultureFiles('en', true);
loadCultureFiles('ar');
loadCultureFiles('de');
loadCultureFiles('fr-CH');
loadCultureFiles('zh');

let ajax: Ajax = new Ajax('./cldr-data/locale.json', 'GET', false);
ajax.onSuccess = (value: string) => { L10n.load(JSON.parse(value)); };
ajax.send();

setCulture('de');

let scheduleObj = new Schedule({
    width: '100%', height: '555px',
    views: ['Week', 'Month'],
    selectedDate: new Date(2021, 0, 5),
    eventSettings: {
        dataSource: [
            {
                Id: 1,
                Subject: 'Recurrence',
                StartTime: new Date(2021, 0, 4, 9),
                EndTime: new Date(2021, 0, 4, 14, 30),
                RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=5',
                IsAllDay: false
            }
        ]
    }
});
scheduleObj.appendTo('#schedule');

document.getElementById('timeFormat').onchange = (args): void => {
    scheduleObj.timeFormat = (args.target as HTMLSelectElement).value;
};

document.getElementById('cultures').onchange = (e) => {
    let ddl: HTMLSelectElement = document.getElementById('cultures') as HTMLSelectElement;
    let value: string = ddl.value;
    enableRtl(value === 'ar');
    setCulture(value);
};