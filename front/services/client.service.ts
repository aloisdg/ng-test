import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

import { ApiClient } from "api/apiclient";
import { ClientModel } from "models/ClientModel";

@Injectable()
export class ClientService {
    private client: Subject<ClientModel>;

    public get client$(): Observable<ClientModel> {
        return this.client.asObservable();
    }

    constructor(private service: ApiClient) {
        this.client = new Subject<ClientModel>();
    }
}