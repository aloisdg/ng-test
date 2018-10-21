import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { MeetingMatrix, toModel } from 'projects/first-app/src/models/MeetingMatrix';
import { mmData, MeetingMatrixModel, generateMeetingMatrix } from './meetingMatrix';

@Injectable()
export class Service {
public getTest(): Observable<MeetingMatrixModel> {
    return of(generateMeetingMatrix());
}

    public getMeetingMatrix(): Observable<MeetingMatrix> {
        return of(mmData).pipe(
            map(response => toModel(response))
        );
    }
}