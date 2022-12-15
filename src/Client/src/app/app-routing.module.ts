import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectComponent } from './redirect/redirect.component';
import { DashboardComponent } from './team/dashboard/dashboard.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: '',
    component: RedirectComponent,
  },
  {
    path: ':slug',
    component: TestComponent,
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
