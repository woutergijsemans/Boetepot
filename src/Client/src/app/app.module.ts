import { HttpClientModule } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import localenl from '@angular/common/locales/nl';
import { AppComponent } from './app.component';
import { TeamModule } from './team/team.module';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { registerLocaleData } from '@angular/common';
import { TestComponent } from './test/test.component';
import { RedirectComponent } from './redirect/redirect.component';
registerLocaleData(localenl, 'nl-BE');

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    TestComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TeamModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'nl-BE' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

