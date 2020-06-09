export class Reservation {
    private id: number;
    private customers: number;
    private date: Date;
    private name: string;
    private visited: boolean;

    constructor(customers: number, date: Date, name: string,id?: number, visited?: boolean) {
        this.customers = customers;
        this.date = date;
        this.name = name;
        this.id = id;
        this.visited = visited;
    }

    getCustomers() { return this.customers; }
    getDate() { return this.date; }
    getName() { return this.name; }
    getId() { return this.id; }
    getVisited() { return this.visited; }
}