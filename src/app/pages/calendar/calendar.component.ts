import { Component, NgModule } from '@angular/core';
import { ViewChild, AfterViewInit } from '@angular/core';
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotModule,
  DayPilotMonthComponent,
  DayPilotNavigatorComponent,
} from '@daypilot/daypilot-lite-angular';
import { DataService } from '../../services/data.service'; 
import { CalendarEvent } from '../../interfaces/calendar-event';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [ DayPilotModule, CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

export class CalendarComponent implements AfterViewInit {
  @ViewChild('day') day!: DayPilotCalendarComponent;
  @ViewChild('week') week!: DayPilotCalendarComponent;
  @ViewChild('month') month!: DayPilotMonthComponent;
  @ViewChild('navigator') nav!: DayPilotNavigatorComponent;

  events: DayPilot.EventData[] = [];

  date = DayPilot.Date.today();

  DayPilot = DayPilot;

  selectedDate: Date | any = DayPilot.Date.today();
  selectedDateEvents: CalendarEvent[] = [];

  selectedMonth: number = 0;
  selectedYear: number = 0;

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  years: number[] = [];

  contextMenu = new DayPilot.Menu({
    items: [
      {
        text: 'Delete',
        onClick: (args) => {
          const event = args.source;
          const dp = event.calendar;
          dp.events.remove(event);
        },
      },
    ],
  });

  configNavigator: DayPilot.NavigatorConfig = {
    showMonths: 1,
    cellWidth: 25,
    cellHeight: 25,
    onVisibleRangeChanged: (args) => {
      this.loadEvents();
    },
  };

   constructor (private ds: DataService) {  
    this.viewMonth();
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    this.years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
    this.selectedMonth = currentDate.getMonth();
    this.selectedYear = currentYear;
    this.selectedDate = DayPilot.Date.today(); 
    this.loadEvents();  
  }
  ngOnInit() {
  }
  ngAfterViewInit(): void {
  }

  onMonthChange() {
    this.updateDate();
  }

  onYearChange() {
    this.updateDate();
  }

  updateDate() {
    var month = this.selectedMonth;
    month++;
    const formattedMonth = month.toString().padStart(2, '0');
    this.date = new DayPilot.Date(`${this.selectedYear}-${formattedMonth}-01`);
    this.updateCalendar();
    this.loadEvents();
  }

  backToCurrent() {
    const currentDate = new Date();
    this.selectedMonth = currentDate.getMonth();
    this.selectedYear = currentDate.getFullYear();
    this.updateDate();
  }

  updateCalendar() {
    this.configMonth.startDate = this.date;

    if (this.day) this.day.control.update();
    if (this.week) this.week.control.update();
    if (this.month) this.month.control.update();
  }

  selectTomorrow() {
    this.date = DayPilot.Date.today().addDays(1);
  }

  changeDate(date: DayPilot.Date): void {
       this.configMonth.startDate = date;
  }

  configMonth: DayPilot.MonthConfig = {
    contextMenu: this.contextMenu,
    eventBarVisible: false,
    onEventClick: this.onEventClick.bind(this),
    eventMoveHandling: 'Disabled',
    onTimeRangeSelected: (args) => {
      this.onDateCellClick(args);
    },
    cellHeight: 80,
    eventHeight:23,
    onBeforeCellRender: this.onBeforeCellRender.bind(this),
    onBeforeEventRender: this.onBeforeEventRender.bind(this),

  };

  onBeforeCellRender(args: any) {
    console.log("onBeforeCellRender called for cell:", args.cell.start);

    args.cell.fontColor = "#ffff99";

    const today = DayPilot.Date.today();
    if (args.cell.start.equals(today)) {
      args.cell.backColor = "#ffeb3b";
    }
  }

  async loadEvents() {
    const from = this.date.firstDayOfMonth();
    const to = this.date.lastDayOfMonth();
    this.ds.getEvents(from, to).subscribe((result: DayPilot.EventData[]) => {
      this.events = result;
      this.updateSelectedDateEvents();
      return result;
    });
    
  }

  viewMonth(): void {
    this.configNavigator.selectMode = 'Month';
    this.configMonth.visible = true;
  }

  onBeforeEventRender(args: any) {
  args.data.backColor = "#e0d9d9";
  // args.data.fontColor = "#00ff3c";
  args.data.fontColor = "#fa0d0d";

  }

  onDateClick(date: DayPilot.Date) {
    this.selectedDate = date;
    this.updateSelectedDateEvents();
  }

  onDateCellClick(args: any) {
    this.onDateClick(args.start);
  }

  onEventClick(args: any) {
    this.onDateClick(args.e.start());
  }

  updateSelectedDateEvents() {
    if (this.selectedDate) {
      const selectedDateString = this.selectedDate.toString('yyyy-MM-dd');

      this.selectedDateEvents = this.events.filter((event) => {
        let eventStart: DayPilot.Date;
        if (typeof event.start === 'string') {
          eventStart = DayPilot.Date.parse(event.start, 'yyyy-MM-ddTHH:mm:ss');
        } else {
          eventStart = event.start;
        }
        return eventStart.toString('yyyy-MM-dd') === selectedDateString;
      });
    } else {
      this.selectedDateEvents = [];
    }

  }

  getFormattedTime(time: string | DayPilot.Date): string {
    if (typeof time === 'string') {
      return DayPilot.Date.parse(time, 'yyyy-MM-ddTHH:mm:ss').toString('HH:mm');
    } else {
      return time.toString('HH:mm');
    }
  }

}
