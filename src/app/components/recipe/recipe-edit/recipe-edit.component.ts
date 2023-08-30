import { Component,OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredients } from 'src/app/models/ingredients.model';
import { RecipeServiceService } from 'src/app/services/recipe-service.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{

  constructor(private fb:FormBuilder,private router: Router,private recipeService:RecipeServiceService,private route:ActivatedRoute){}
  isEditMode = false;
  id!:number;
  recipeEditForm = this.fb.group({
    name:['',[Validators.required] ],
    imgUrl:['',[Validators.required]],
    description:[''],
    ingredients:this.fb.array([])
  })

  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      if(param['id']){
        let recipe = this.recipeService.getSingleRecipe(param['id']);
        this.isEditMode = true;
        this.id = param['id'];   
        this.inItForm()
      }
    })
  }


  inItForm(){    
    let recipe = this.recipeService.getSingleRecipe(this.id)

    if(this.isEditMode){
      this.recipeEditForm.patchValue({
        name:recipe.name,
        imgUrl:recipe.imgUrl,
        description:recipe.description
      })


      recipe.ingredients.forEach(ingredient=>{
        this.addIngredient(ingredient)
      })
    }
    console.log(this.recipeEditForm.value)
  }

  get ingredients(){
    return this.recipeEditForm.controls["ingredients"] as FormArray
  }

  deleteControl(index:number){
    this.ingredients.removeAt(index)
  }

  addIngredient(ingredient:Ingredients = {ingName:'',amount:0}){
    let ing!:FormGroup;
    if(this.isEditMode){
       ing = this.fb.group({
        ingName:[ingredient.ingName],
        amount:[ingredient.amount]
      })
    }
    else{
       ing = this.fb.group({
        ingName:[ingredient.ingName],
        amount:[ingredient.amount]
      })
    }   
    this.ingredients.push(ing);
  }

  saveRecipe(form:FormGroup){
    if(this.isEditMode){
      if(this.id){
        this.recipeService.updateRecipe(this.id,form.value)
      }
    }
    else{
      this.recipeService.addRecipes(form.value)
    }
    this.router.navigate(['recipe'])
    form.reset();
  }

  cancelRecipe(){
    this.router.navigate(['recipe'])
  }

  // onAddIngredients(){
  //   const ingredient:FormGroup = this.fb.group({
  //     ingName:[''],
  //     amount:['']
  //   })
  //   this.ingredients.push(ingredient);
  // }

}
