import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { FirstComponent } from './first-comp.component';
import { MapToArrayPipe } from 'pipes/mapToArray.pipe';
import { PushPipe } from 'pipes/push.pipe';

import { Service } from 'api/apiclient';

const COMPONENTS = [
  FirstComponent
];

const PIPES = [
  MapToArrayPipe,
  PushPipe
];

const SERVICES = [
  Service
];

@NgModule({
  declarations: [
    COMPONENTS,
    PIPES
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    SERVICES
  ],
  entryComponents: [FirstComponent]
})
export class FirstCompModule { 
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const firstApp = createCustomElement(FirstComponent, { injector: this.injector });
    customElements.define('first-root', firstApp);
  }
}
