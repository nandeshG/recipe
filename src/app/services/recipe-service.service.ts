import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { Recipes } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {

  constructor() { }

  recipes:Recipes[] = [];
  sub = new Subject<Recipes[]>();

  addRecipes(recipeForm:Recipes){
    this.recipes.push(recipeForm);
    this.sub.next(this.recipes);
  }

  updateRecipe(id:number,recipe:Recipes){
    this.recipes[id-1] = recipe;
  }

  getSingleRecipe(id:number){
   return this.recipes[id-1];
  }

  deleteRecipe(id:number){
    this.recipes.splice(id-1,1);
    console.log("onDelete",this.recipes)
  }

  getRecipes(){
    return this.recipes;
  }
}
