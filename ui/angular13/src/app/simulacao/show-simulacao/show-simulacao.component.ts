import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar'
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-show-simulacao',
  templateUrl: './show-simulacao.component.html',
  styleUrls: ['./show-simulacao.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowSimulacaoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  refresh: Subject<any> = new Subject();
  viewDate: Date = new Date();
  dayStartHour: number = 6;
  dayEndHour: number = 22;

  events: CalendarEvent[] = [
    {
      title: 'Draggable event',
      start: new Date(),
      draggable: true,
    },
    {
      title: 'A non draggable event',
      start: new Date(),
    }
  ];

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next(null);
  }

  hourSegmentClicked(date: Date, sourceEvent: MouseEvent): void{
    console.log(date.toString());
  }

}
