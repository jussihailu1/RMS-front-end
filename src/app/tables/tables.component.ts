import { SessionService } from './../_services/session.service';
import { Session } from './../_models/session';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  public loading = false;
  public succesNotificationHidden = true;
  public conformationScreenHidden = true;

  public tablesListHidden: boolean = false;
  public addSessionHidden: boolean = true;
  public editSessionHidden: boolean = true;
  public addSessionButtonHidden: boolean = false;
  public editSessionButtonHidden: boolean = true;
  public backButtonHidden: boolean = true;

  public selectedSessionIdForView: number = 0;
  private selectedSessionId: number = 0;

  public sessions: Session[] = [];

  // For child
  public availableTables: number[];
  public reservations: { id: number, customers: number, time: string, name: string }[] = [];

  constructor(private sessionService: SessionService, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.loadSessions();
    this.loadAvailableTables();
    this.loadTodaysReservations();
  }

  loadSessions() {
    this.onLoading(true);
    this.sessionService.findTodaysSessions().subscribe((response: any) => {
      this.sessions = response.map(session => this.mapSession(session));
      this.onLoading(false);
    })
  }

  loadAvailableTables() {
    this.onLoading(true);
    this.availableTables = [];
    this.sessionService.findAvailableTables().subscribe(response => {
      for (const t of response) {
        this.availableTables.push(t.tableNumber);
      }
      this.onLoading(false);
    });
  }

  loadTodaysReservations() {
    this.onLoading(true);
    this.reservationService.findTodaysNotVisitedReservations().subscribe((response: any) => {
      this.reservations = response;
      this.onLoading(false);
    });
  }

  mapSession(session) {
    const reserved: boolean = session.reservation != null;
    const startTime: Date = this.mapSessionStartTime(session.start);
    const done: boolean = session.durationInMinutes != null;

    if (reserved) {
      return new Session(session.tableNumber, session.customers, reserved, startTime, done, session.id, session.reservation.name);
    }

    return new Session(session.tableNumber, session.customers, reserved, startTime, done, session.id, "X");
  }

  mapSessionStartTime(startTime): Date {
    let startTimeToReturn = new Date();
    const hour = startTime.substring(0, 2);
    const minutes = startTime.substring(3, 5);
    startTimeToReturn.setHours(hour, minutes, 0, 0);
    return startTimeToReturn;
  }

  goToAddSession() {
    this.tablesListHidden = true;
    this.addSessionHidden = false;
    this.editSessionHidden = true;
    this.addSessionButtonHidden = true;
    this.editSessionButtonHidden = true;
    this.backButtonHidden = false;
  }

  goToEditSession() {
    this.selectedSessionIdForView = 0;

    this.tablesListHidden = true;
    this.addSessionHidden = true;
    this.editSessionHidden = false;
    this.addSessionButtonHidden = true;
    this.editSessionButtonHidden = true;
    this.backButtonHidden = false;
  }

  goToSessionsList() {
    this.selectedSessionIdForView = this.selectedSessionId;

    this.tablesListHidden = false;
    this.addSessionHidden = true;
    this.editSessionHidden = true;
    this.addSessionButtonHidden = false;
    this.editSessionButtonHidden = this.selectedSessionId == 0;
    this.backButtonHidden = true;
  }

  goToEndSession() {
    this.conformationScreenHidden = false;
  }

  cancelEndSession() {
    this.conformationScreenHidden = true;
  }

  endSession() {
    this.onLoading(true);
    this.conformationScreenHidden = true;
    this.sessionService.endSession(this.selectedSessionId).subscribe(response => {
      this.selectedSessionId = 0;
      this.onSave();
      this.onLoading(false);
    });
  }

  selectSession(id: number) {
    this.selectedSessionIdForView = id;
    this.selectedSessionId = id;
  }

  onSave() {
    this.loadAll();
    this.goToSessionsList();
    this.showSuccesNotification();
  }

  showSuccesNotification(){
    this.succesNotificationHidden = false;
    const _this = this;
    setTimeout(function () { _this.succesNotificationHidden = true }, 2000);
  }

  onLoading(loading: boolean) {
    this.loading = loading;
  }

  hideNotification(element) {
    element.hidden = true;
  }
}
