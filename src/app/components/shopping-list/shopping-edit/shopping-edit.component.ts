import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { ShoppingListComponent } from '../shopping-list.component';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit{

  constructor(private fb:FormBuilder,private shopService:ShoppingListService,private shopComp:ShoppingListComponent){}
  
  editIng = false;
  ingId!:number;
  
  ngOnInit(): void {
    this.shopComp.ingSub.subscribe(ingredient=>{
      if(ingredient){
        this.editIng = true;
        this.ingId = this.shopService.ingId;
        this.ingForm.patchValue({
          ingName:ingredient.ingName,
          amount:ingredient.amount.toString()
        })
      }
    })
  }

  ingForm = this.fb.group({
    ingName:['',Validators.required],
    amount:['',Validators.required]
  })

  onAddIngredients(form:FormGroup){
    if(form.valid){
      if(this.editIng){
        this.shopService.updateIng(this.ingId,form.value)
      }
      else{
        this.shopService.addIngredients(form.value)
      }
    }
    this.resetForm();
  }

  OnDelete(){
    this.shopService.deleteIngredient(this.ingId);
    this.resetForm();
  }

  resetForm(){
    this.editIng = false;
    this.ingForm.reset()
  }
}
