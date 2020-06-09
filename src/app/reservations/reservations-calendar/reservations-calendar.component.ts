import { ReservationService } from './../../_services/reservation.service';
import { Reservation } from './../../_models/reservation';
import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reservations-calendar',
  templateUrl: './reservations-calendar.component.html',
  styleUrls: ['./reservations-calendar.component.scss']
})
export class ReservationsCalendarComponent implements OnChanges {

  @Input() public daySpan: number = 7;
  @Input() public reservations: Reservation[];
  @Input() public selectedReservationId: number;
  
  @Output() select: EventEmitter<number> = new EventEmitter();

  public reservationsForView: {
    id: number,
    date: string,
    customers: number,
    time: string,
    oddReservation: boolean
  }[] = [];

  private previousDateAsNumberString: string = "";
  private dates: string[] = [];
  private odd: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    this.mapReservationsForView();
  }

  selectReservation(id:number){
    this.select.emit(id);
  }

  mapReservationsForView() {
    this.odd = false;
    this.dates = [];
    this.reservationsForView = this.reservations.map(r => this.mapReservationForView(r));
  }

  mapReservationForView(reservation: Reservation): {
    id: number,
    date: string,
    customers: number,
    time: string,
    oddReservation: boolean
  } {
    const rDate = reservation.getDate();
    const thisDateAsNumberString = `${rDate.getDate()}${rDate.getMonth()}${rDate.getFullYear()}`;

    if (!this.dates.includes(thisDateAsNumberString)) {
      this.dates.push(thisDateAsNumberString);
      this.odd = !this.odd;
    }

    const reservationToReturn = {
      id: reservation.getId(),
      date: this.previousDateAsNumberString != thisDateAsNumberString ? rDate.toLocaleDateString("nl") : "",
      customers: reservation.getCustomers(),
      time: rDate.toLocaleTimeString("nl").substring(0, 5),
      oddReservation: this.odd
    };

    this.previousDateAsNumberString = thisDateAsNumberString;
    return reservationToReturn;
  }

}