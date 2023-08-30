import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipes } from 'src/app/models/recipe.model';
import { RecipeServiceService } from 'src/app/services/recipe-service.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit{

  constructor(private recipeService:RecipeServiceService,private route:ActivatedRoute,private router:Router,private shopService:ShoppingListService){}
  id!:number;
  recipe!:Recipes;

  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      this.id = param['id'];
      this.recipe = this.recipeService.getSingleRecipe(this.id);
      console.log(this.recipe)
    })
  }

  addIngToShoppingList(){
    if(this.recipe.ingredients){
      this.shopService.addIngFromRecipe(this.recipe.ingredients)
    }
  }

  onDeleteRecipe(){
    if(this.id)
      this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipe']);
  }

  NavigateToEdit(){
    this.router.navigate(['recipe/edit/'+this.id]);
  }
}
