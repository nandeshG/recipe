import { Injectable } from '@angular/core';
import { Ingredients } from '../models/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor() { }

  ingredients:Ingredients[] = [];
  ingSub = new Subject<Ingredients[]>();
  ingId!:number;

  addIngredients(form:Ingredients){
    this.ingredients.push(form);
    this.ingSub.next(this.ingredients)
    //console.log("shop",this.ingredients)
  }

  addIngFromRecipe(value:Ingredients[]){
    this.ingredients.push(...value)
  }

  getIngredients(){
    return this.ingredients;
  }

  updateIng(index:number,form:Ingredients){
    this.ingredients[index] = form;
    this.ingSub.next(this.ingredients)
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
  }

}
