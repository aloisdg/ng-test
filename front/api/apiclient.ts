import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from 'rxjs/operators';

/*
 Mock a a real back-end
**/

@Injectable()
export class ApiClient {
    private _cache: { [id: number]: ClientViewModel } = {
        51017: {
            id: 51017,
            name: 'BOUYGUES',
            level: ClientLevel.Root
        }
    }


    public getClient(clientId: number): Observable<ClientViewModel> {
        return of<ClientViewModel>(this._cache[clientId])
            .pipe(
                delay(150)
            );
    }
}

export class ClientViewModel {
    id: number;
    name: string;
    level: ClientLevel;
    subClients?: Array<ClientViewModel> | undefined;
}

export enum ClientLevel {
    Root = 0,
    Node = 1,
    Leaf = 2
}