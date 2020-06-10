import { ReservationService } from './../../_services/reservation.service';
import { SessionService } from './../../_services/session.service';
import { Reservation } from './../../_models/reservation';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Session } from 'src/app/_models/session';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss']
})
export class AddSessionComponent implements OnInit {

  @Input() public reservationsToSchooseFrom: Reservation[];

  @Output() public save: EventEmitter<any> = new EventEmitter();
  @Output() public loading: EventEmitter<boolean> = new EventEmitter();

  public selectedReservationCustomers = 0;
  public failureNotificationHidden = true;
  public reserved: boolean = false;
  public reservations: { id: number, customers: number, time: string, name: string }[] = [];
  public availableTables = [];

  // Validation
  public reservationErrorHidden: boolean = true;
  public customersErrorHidden: boolean = true;
  public tableErrorHidden: boolean = true;

  constructor(private sessionService: SessionService, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.loadTodaysReservations();
    this.loadAvailableTables();
  }

  loadTodaysReservations() {
    this.reservationService.findTodaysNotVisitedReservations().subscribe((response: any) => {
      this.reservations = response;
    });
  }

  loadAvailableTables() {
    this.availableTables = [];
    this.sessionService.findAvailableTables().subscribe(response => {
      for (const t of response) {
        this.availableTables.push(t.tableNumber);
      }
    });
  }

  hideNotification(element) {
    element.hidden = true;
  }

  clearFields(customers, table, reservation) {
    customers.value = "";
    if (this.reserved) { reservation.value = 0; }
    table.value = 0;
    this.reserved = false;
  }

  saveSession(customers: number, table: number, reservationId: number) {
    this.loading.emit(true);
    if (this.validation(customers, table, reservationId)) {
      if (!this.reserved) { reservationId = 0; }
      this.sessionService.saveSession(customers, table, reservationId).subscribe((response: any) => {
        if (response.message == "SUCCES") {
          this.loadTodaysReservations();
          this.loadAvailableTables();
          this.save.emit();
        } else {
          this.failureNotificationHidden = false;
          const _this = this;
          setTimeout(function () { _this.failureNotificationHidden = true }, 3000);
        }
        this.loading.emit(false);
      });
    } else {
      this.loading.emit(false);
    }
  }

  validation(customers: number, table: number, reservationId: number): boolean {
    let valid = true;
    if (customers == 0) { this.customersErrorHidden = false; valid = false; } else { this.customersErrorHidden = true }
    if (table == 0) { this.tableErrorHidden = false; valid = false; } else { this.tableErrorHidden = true }
    if (this.reserved) { if (reservationId == 0) { this.reservationErrorHidden = false; valid = false; } else { this.reservationErrorHidden = true } }
    return valid;
  }

  reservationToString(reservation: { id: number, customers: number, time: string, name: string }): string {
    const time = reservation.time.substring(0, 5);
    return `${reservation.name} | ${time} | ${reservation.customers}`;
  }

  selectReservation(reservationId: number) {
    this.selectedReservationCustomers = this.reservations.find(r => r.id == reservationId).customers;
  }
}
