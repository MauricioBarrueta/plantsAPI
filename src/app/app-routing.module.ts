import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeciesComponent } from './pages/species/species.component';
import { SpecieComponent } from './pages/species/specie/specie.component';
import { CaresComponent } from './pages/cares/cares.component';
import { PestComponent } from './pages/pest/pest.component';

const routes: Routes = [
  { path: '', redirectTo: 'species-list/by', pathMatch: 'full' },

  { path: 'species-list/by', component: SpeciesComponent },
  { path: 'specie-details', component: SpecieComponent },
  { path: 'specie-details/pest-diseases', component: PestComponent },
  { path: 'specie-details/cares-guide', component: CaresComponent },  
  
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
