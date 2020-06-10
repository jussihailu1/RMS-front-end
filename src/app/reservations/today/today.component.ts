import { Reservation } from './../../_models/reservation';
import { ReservationService } from './../../_services/reservation.service';
import { Component, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnChanges {

  @Input() public reservations: Reservation[];
  @Input() public selectedReservationId: number;

  @Output() select: EventEmitter<number> = new EventEmitter();
  @Output() toggle: EventEmitter<number> = new EventEmitter();

  public reservationsForView: {
    id: number,
    time: string,
    customers: number,
    name: string,
    visited: boolean,
    oddReservation: boolean
  }[] = [];

  public totalReservations: number;

  private times: string[] = []
  private oddReservation: boolean = false;

  constructor(private reservationService: ReservationService){}

  ngOnChanges(changes: SimpleChanges) {
    this.mapReservationsForView();
  }

  selectReservation(id: number) {
    this.select.emit(id);
  }

  mapReservationsForView() {
    this.totalReservations = this.reservations.length;
    this.oddReservation = false;
    this.times = [];
    this.reservationsForView = this.reservations.map(r => this.mapReservationForView(r));
  }

  mapReservationForView(reservation: Reservation): {
    id: number,
    time: string,
    customers: number,
    name: string,
    visited: boolean,
    oddReservation: boolean
  } {
    const time = reservation.getDate().toLocaleTimeString("nl").substring(0, 5);

    if (!this.times.includes(time)) {
      this.times.push(time);
      this.oddReservation = !this.oddReservation;
    }

    return {
      id: reservation.getId(),
      time: time,
      customers: reservation.getCustomers(),
      name: reservation.getName(),
      visited: reservation.getVisited(),
      oddReservation: this.oddReservation
    }
  }
}
