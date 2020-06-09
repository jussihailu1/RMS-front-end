import { ReservationService } from './../../_services/reservation.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Reservation } from 'src/app/_models/reservation';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent {

  @Input() public timesToChooseFrom: Date[];

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() loading: EventEmitter<boolean> = new EventEmitter();

  public failureNotificationHidden = true;

  constructor(private service: ReservationService) { }

  hideNotification(element) {
    element.hidden = true;
  }

  clearFields(customers, date, time, name) {
    customers.value = "";
    date.value = "";
    time.value = "18:00";
    name.value = "";
  }

  saveReservation(customers: number, date: Date, time: Date, name: string) {
    const dateString = date.toString() + " " + time.toString();
    const reservation = new Reservation(customers, new Date(dateString), name);
    this.loading.emit(true);
    this.service.saveReservation(reservation).subscribe((response: any) => {
      if (response.message == "SUCCES") {
        this.save.emit(true);
      } else {
        this.failureNotificationHidden = false;
        const _this = this;
        setTimeout(function () { _this.failureNotificationHidden = true }, 3000);
      }
      this.loading.emit(false);
    });
  }

}
