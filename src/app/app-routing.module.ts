import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeciesComponent } from './pages/species/species.component';
import { SpecieComponent } from './pages/species/specie/specie.component';
import { CaresComponent } from './pages/cares/cares.component';
import { PestComponent } from './pages/pest/pest.component';

const routes: Routes = [
  { path: '', redirectTo: 'species-list/page/1', pathMatch: 'full' },
  { path: 'species-list/page/:page', component: SpeciesComponent },
  { path: 'specie-details/:id', component: SpecieComponent },
  { path: 'pest-disease/:id', component: PestComponent },
  { path: 'care-guide/:id', component: CaresComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
