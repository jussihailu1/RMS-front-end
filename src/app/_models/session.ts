export class Session {
    constructor(
        private tableNumber: number,
        private customers: number,
        private reserved: boolean,
        private startTime: Date,
        private done: boolean,
        private id?: number,
        private reservationName?: string
    ) {

        this.tableNumber = tableNumber;
        this.customers = customers;
        this.reserved = reserved;
        this.startTime = startTime;
        this.done = done;
        this.id = id;
        this.reservationName = reservationName;
    }

    getId() { return this.id; }
    getCustomers() { return this.customers; }
    getTableNumber() { return this.tableNumber }
    getStartTime() { return this.startTime; }
    getReserved() { return this.reserved; }
    getReservationName() { return this.reservationName; }
    getDone() { return this.done; }
}