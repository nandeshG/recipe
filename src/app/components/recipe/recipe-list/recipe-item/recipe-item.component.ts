import { Component, Input } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Recipes } from 'src/app/models/recipe.model';
import { RecipeServiceService } from 'src/app/services/recipe-service.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipes!:Recipes;
  @Input() id!:number;

  constructor(private router:Router,private route:ActivatedRoute,private recipeService:RecipeServiceService){}

  navigateToEdit(){
    this.router.navigate(['recpeDetails/'+this.id],{relativeTo:this.route})    
  }

 
}
