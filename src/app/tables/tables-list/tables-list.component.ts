import { Component, OnChanges, Input, SimpleChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { Session } from 'src/app/_models/session';

@Component({
  selector: 'app-tables-list',
  templateUrl: './tables-list.component.html',
  styleUrls: ['./tables-list.component.scss']
})
export class TablesListComponent implements OnInit, OnChanges {

  @Input() public sessions: Session[];

  @Output() public add: EventEmitter<any> = new EventEmitter<any>();
  @Output() public select: EventEmitter<any> = new EventEmitter<any>();

  public reservedSessionsCount: number;
  public tabs = ["Active", "Done"];
  public selectedTab = "";
  public selectedSessionId: number = 0;

  public activeSessions: Session[] = [];
  public doneSessions: Session[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setSessions();
  }

  setSessions() {
    this.reservedSessionsCount = 0;

    this.activeSessions = this.sessions.filter(s => !s.getDone());
    this.doneSessions = this.sessions.filter(s => s.getDone());

    this.selectTab(this.selectedTab == "" ? "Active" : this.selectedTab);
  }

  selectTab(selectedTab: string) {
    this.selectedTab = selectedTab;
    this.reservedSessionsCount = selectedTab == "Active" ?
      this.activeSessions.filter(as => as.getReserved()).length :
      this.doneSessions.filter(ds => ds.getReserved()).length;
  }

  selectSession(id: number) {
    this.selectedSessionId != id ? this.selectedSessionId = id : this.selectedSessionId = 0;
    this.select.emit(this.selectedSessionId);
  }
}
