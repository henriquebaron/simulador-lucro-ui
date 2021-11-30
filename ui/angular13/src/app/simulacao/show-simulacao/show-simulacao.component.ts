import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/internal/Subject';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar'
import { AgendamentoSimulacao } from 'src/app/agendamento-simulacao';
import { AddEditSimulacaoComponent } from '../add-edit-simulacao/add-edit-simulacao.component';

@Component({
  selector: 'app-show-simulacao',
  templateUrl: './show-simulacao.component.html',
  styleUrls: ['./show-simulacao.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowSimulacaoComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  refresh: Subject<any> = new Subject();
  viewDate: Date = new Date();
  dayStartHour: number = 6;
  dayEndHour: number = 22;

  agendamentos: AgendamentoSimulacao[] = [];
  events: CalendarEvent[] = []

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next(null);
  }

  hourSegmentClicked(date: Date, sourceEvent: MouseEvent): void {
    this.adicionarSimulacao(0, 0);
  }

  adicionarSimulacao(hours: number, minutes: number): void {
    this.openModal();
  }

  openModal(): void {
    this.modalService.open(AddEditSimulacaoComponent).result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log('Dismissed: ' + reason);
    });
  }

}
