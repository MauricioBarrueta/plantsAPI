import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { SpeciesComponent } from './species/species.component';
import { SpecieComponent } from './species/specie/specie.component';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { CaresComponent } from './cares/cares.component';
import { PestComponent } from './pest/pest.component';

@NgModule({
  declarations: [
    SpeciesComponent,
    SpecieComponent,
    HeaderComponent,
    CaresComponent,
    PestComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ], 
  exports: [
    HeaderComponent,
    SpeciesComponent,
    SpecieComponent,
    CaresComponent,
    PestComponent
  ]
})
export class PagesModule { }
