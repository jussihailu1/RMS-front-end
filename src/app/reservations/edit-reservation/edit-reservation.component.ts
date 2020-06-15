import { Component, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ReservationService } from 'src/app/_services/reservation.service';
import { Reservation } from 'src/app/_models/reservation';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss']
})
export class EditReservationComponent implements OnChanges {

  @Input() public timesToChooseFrom: Date[];
  @Input() public reservation: Reservation;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() loading: EventEmitter<boolean> = new EventEmitter();

  public customers: number;
  public date: string;
  public time: string;
  public name: string;

  public customersInputChanged = "";
  public dateInputChanged = "";
  public timeInputChanged = "";
  public nameInputChanged = "";

  public conformationScreenHidden = true;

  public failureNotificationHidden = true;

  constructor(private service: ReservationService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.reservation != null) {
      this.setToOriginalValues();
    }
  }

  hideNotification(element) {
    element.hidden = true;
  }

  resetToOriginal() {
    this.setToOriginalValues();
  }

  setToOriginalValues() {
    this.customers = this.reservation.getCustomers();
    this.date = this.toDateString(this.reservation.getDate());
    this.time = this.toTimeString(this.reservation.getDate());
    this.name = this.reservation.getName();

    this.valueChanged();
  }

  valueChanged() {
    this.customersInputChanged = this.reservation.getCustomers() == this.customers ? "" : "changed";
    this.dateInputChanged = this.toDateString(this.reservation.getDate()) == this.date ? "" : "changed";
    this.timeInputChanged = this.toTimeString(this.reservation.getDate()) == this.time ? "" : "changed";
    this.nameInputChanged = this.reservation.getName() == this.name ? "" : "changed";
  }

  saveReservation() {
    const dateString = this.date + " " + this.time;
    const reservation = new Reservation(this.customers, new Date(dateString), this.name, this.reservation.getId());
    this.save.emit(true);
    this.service.editReservation(reservation).subscribe((response: any) => {
      if (response.message == "SUCCES") {
        this.save.emit();
      } else {
        this.failureNotificationHidden = false;
        const _this = this;
        setTimeout(function () { _this.failureNotificationHidden = true }, 3000);
      }
      this.save.emit(false);
    });
  }

  toDateString(date: Date) {
    return date.toISOString().substring(0, 10);
  }

  toTimeString(date: Date) {
    return date.toLocaleTimeString("nl").substring(0, 5);
  }

  goToCancelReservation() {
    this.conformationScreenHidden = false;
  }

  cancelCanceling() {
    this.conformationScreenHidden = true;
  }

  confirmCanceling() {
    this.conformationScreenHidden = true;
    this.cancelReservation();
  }

  cancelReservation() {
    this.save.emit(true);
    this.service.cancelReservation(this.reservation.getId()).subscribe((response: any) => {
      if (response.message == "SUCCES") {
        this.save.emit();
      } else {
        console.log(response);
      }
      this.save.emit(false);
    })
  }
}
