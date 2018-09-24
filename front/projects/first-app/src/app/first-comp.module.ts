import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { FirstComponent } from './first-comp.component';

@NgModule({
  declarations: [
    FirstComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [FirstComponent]
})
export class FirstCompModule { 
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const firstApp = createCustomElement(FirstComponent, { injector: this.injector });
    customElements.define('first-root', firstApp);
  }
}
