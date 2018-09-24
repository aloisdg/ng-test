import { TestBed, async } from '@angular/core/testing';
import { FirstComponent } from './first-comp.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FirstComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(FirstComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'first-app'`, async(() => {
    const fixture = TestBed.createComponent(FirstComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('first-app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(FirstComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to first-app!');
  }));
});
