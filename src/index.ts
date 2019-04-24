import { Schedule, ScheduleModel, Week, Month, ResourceDetails, TreeViewArgs, Agenda, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';

/**
 * schedule resources group sample
 */
Schedule.Inject(Week, Month, Agenda, Resize, DragAndDrop);

interface TemplateFunction extends Window {
  getAirlineImage?: Function;
  getAirlineName?: Function;
  getAirlineModel?: Function;
  getAirlineSeats?: Function;
}

let scheduleOptions: ScheduleModel = {
  width: '100%',
  height: '650px',
  selectedDate: new Date(2018, 3, 1),
  views: ['Week', 'Month', 'Agenda'],
  resourceHeaderTemplate: '#restemplate',
  group: {
    resources: ['Airlines']
  },
  resources: [{
    field: 'AirlineId', title: 'Airline Name',
    name: 'Airlines', allowMultiple: true,
    dataSource: [
      { AirlineName: 'Airways 1', AirlineId: 1, AirlineColor: '#EA7A57' },
      { AirlineName: 'Airways 2', AirlineId: 2, AirlineColor: '#357cd2' },
      { AirlineName: 'Airways 3', AirlineId: 3, AirlineColor: '#7fa900' }
    ],
    textField: 'AirlineName', idField: 'AirlineId', colorField: 'AirlineColor'
  }]
};

let scheduleObj: Schedule = new Schedule(scheduleOptions, document.getElementById('Schedule'));

(window as TemplateFunction).getAirlineImage = (value: ResourceDetails | TreeViewArgs) => {
  let airlineName: string = (window as TemplateFunction).getAirlineName(value);
  return airlineName.replace(' ', '-').toLowerCase();
};
(window as TemplateFunction).getAirlineName = (value: ResourceDetails | TreeViewArgs) => {
  return ((value as ResourceDetails).resourceData) ?
    (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] : (value as TreeViewArgs).resourceName;
};
(window as TemplateFunction).getAirlineModel = (value: ResourceDetails | TreeViewArgs) => {
  let airlineName: string = (window as TemplateFunction).getAirlineName(value);
  return (airlineName === 'Airways 1') ? 'CRJ 700' : (airlineName === 'Airways 2') ? 'Airbus A330' : 'ATR 72-600';
};
(window as TemplateFunction).getAirlineSeats = (value: ResourceDetails | TreeViewArgs) => {
  let airlineName: string = (window as TemplateFunction).getAirlineName(value);
  return (airlineName === 'Airways 1') ? 50 : (airlineName === 'Airways 2') ? 75 : 100;
};
