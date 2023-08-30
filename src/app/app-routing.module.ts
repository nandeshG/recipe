import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipeEditComponent } from './components/recipe/recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './components/recipe/recipe-details/recipe-details.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'recipe',
    component: RecipeComponent,
    canActivate:[authGuard],
     children: [
      { path: 'new', component: RecipeEditComponent },
      { path: 'recpeDetails/:id', component: RecipeDetailsComponent },
      {path:'edit/:id',component:RecipeEditComponent}
    ],
  },
  {path:"shoppingList",component:ShoppingListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
