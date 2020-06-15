import { ReservationService } from './../_services/reservation.service';
import { Component, OnInit } from '@angular/core';
import { Reservation } from '../_models/reservation';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  public loading = false;

  public daySpan = 7;
  public reservationsNDays: Reservation[] = [];
  public reservationsToday: Reservation[] = [];
  public selectedReservation: Reservation;
  public selectedReservationId: number = 0;

  public succesNotificationHidden = true;
  public errorNotificationHidden = true;
  public errorMessage: string;

  public reservationsHidden = false;
  public addReservationsHidden = true;
  public editReservationsHidden = true;

  public timesToChooseFrom = [
    new Date("1/1/1 18:00"),
    new Date("1/1/1 18:30"),
    new Date("1/1/1 19:00"),
    new Date("1/1/1 19:30"),
    new Date("1/1/1 20:00"),
    new Date("1/1/1 20:30"),
    new Date("1/1/1 21:00"),
    new Date("1/1/1 21:30"),
    new Date("1/1/1 22:00")
  ];

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations() {
    this.loadReservationsToday();
    this.loadReservationsNDays();
  }

  loadReservationsToday() {
    this.loading = true;
    this.reservationService.findTodaysReservations()
      .subscribe((reservations: any) => {
        this.reservationsToday = reservations
          .map((reservation: any) => this.mapReservation(reservation));
        this.loading = false;
      });
  }

  loadReservationsNDays() {
    this.loading = true;
    this.reservationService.findReservationsOfNextNDays(this.daySpan)
      .subscribe((reservations: any) => {
        this.reservationsNDays = reservations
          .map((reservation: any) => this.mapReservation(reservation));
        this.loading = false;
      });
  }

  mapReservation(reservation): Reservation {
    const date = new Date(`${reservation.date} ${reservation.time}`);
    return new Reservation(reservation.customers, date, reservation.name, reservation.id, reservation.visited);
  }

  hideNotification(element) {
    element.hidden = true;
  }

  goToReservations() {
    this.addReservationsHidden = true;
    this.editReservationsHidden = true;
    this.reservationsHidden = false;
  }

  goToAddReservation() {
    this.addReservationsHidden = false;
    this.editReservationsHidden = true;
    this.reservationsHidden = true;
  }

  goToEditReservation() {
    if (this.selectedReservationId != 0) {
      this.loading = true;

      this.reservationService.findReservationById(this.selectedReservationId)
        .subscribe((reservation: Reservation) => {
          this.selectedReservation = this.mapReservation(reservation);

          this.addReservationsHidden = true;
          this.editReservationsHidden = false;
          this.reservationsHidden = true;

          this.loading = false;
        })
    } else {
      this.showErrorNotification("No reservation selected");
    }
  }

  showErrorNotification(message: string) {
    this.errorMessage = message;
    this.errorNotificationHidden = false;
    setTimeout(() => {
      this.errorNotificationHidden = true;
    }, 2000);
  }

  onSave() {
    this.showSuccesNotification();
    this.selectedReservationId = 0;

    this.loadReservations();
    this.goToReservations();
  }

  showSuccesNotification() {
    this.succesNotificationHidden = false;
    const _this = this;
    setTimeout(function () { _this.succesNotificationHidden = true }, 2000);
  }

  onSelectReservation(id: number) {
    this.selectedReservationId = this.selectedReservationId != id ? id : 0;
    // console.log("selected a reservation: " + this.selectedReservationId);
    // console.log("the selected reservation: " + this.selectedReservation);
  }

<<<<<<< Updated upstream
=======
  onToggleVisited(id: number) {
    // this.loadReservationsToday();
  }

>>>>>>> Stashed changes
  onLoading(loading: boolean) {
    this.loading = loading;
  }

}
