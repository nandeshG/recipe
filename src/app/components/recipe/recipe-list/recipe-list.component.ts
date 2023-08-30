import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipes } from 'src/app/models/recipe.model';
import { RecipeServiceService } from 'src/app/services/recipe-service.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes:Recipes[] = [];
  subscripion!:Subscription;
  constructor(private router:Router,private route:ActivatedRoute,private recipeService:RecipeServiceService){}
  
  ngOnInit(): void {
    this.recipes = this.getRecipes();
  }

  navigateToEdit(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }

  getRecipes(){
    this.subscripion = this.recipeService.sub.subscribe((res:Recipes[])=>{
      this.recipes = res
    });
    return this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    this.subscripion.unsubscribe();
  }
}
