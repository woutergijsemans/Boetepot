import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoeteToevoegenComponent } from './boete-toevoegen/boete-toevoegen.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    BoeteToevoegenComponent
  ],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [DashboardComponent, BoeteToevoegenComponent]
})
export class TeamModule { }
