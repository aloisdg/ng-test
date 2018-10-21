import { Component } from '@angular/core';
import { MeetingMatrix } from 'projects/first-app/src/models/MeetingMatrix';
import { Observable } from 'rxjs';
import { Service } from 'api/apiclient';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'first-root',
  templateUrl: './first-comp.component.html',
  styleUrls: ['./first-comp.component.scss']
})
export class FirstComponent {
  public model$: Observable<MeetingMatrix>;

  public test: any;
  public test2: MeetingMatrix;

  constructor(private service: Service) {
    this.service.getTest().subscribe(x => this.test = x);
    this.service.getMeetingMatrix().subscribe(x => this.test2 = x);
    this.model$ = this.service.getMeetingMatrix().pipe(
      tap(x => console.log(x))
    );
  }
}
