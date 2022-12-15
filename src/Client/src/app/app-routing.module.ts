import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectComponent } from './redirect/redirect.component';
import { BoeteToevoegenComponent } from './team/boete-toevoegen/boete-toevoegen.component';
import { BoetelijstComponent } from './team/boetelijst/boetelijst.component';
import { DashboardComponent } from './team/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: RedirectComponent,
  },
  {
    path: ':slug',
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'boete-toevoegen',
        component: BoeteToevoegenComponent
      },
      {
        path: 'boetelijst',
        component: BoetelijstComponent
      }
    ]
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
