import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoeteToevoegenComponent } from './boete-toevoegen/boete-toevoegen.component';
import { FormsModule } from '@angular/forms';
import { BoetelijstComponent } from './boetelijst/boetelijst.component';



@NgModule({
  declarations: [
    DashboardComponent,
    BoeteToevoegenComponent,
    BoetelijstComponent
  ],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [DashboardComponent, BoeteToevoegenComponent]
})
export class TeamModule { }
