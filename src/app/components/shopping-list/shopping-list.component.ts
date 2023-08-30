import { Component ,OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredients } from 'src/app/models/ingredients.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{

  ingredients!:Ingredients[];
  ingSub = new Subject<Ingredients>();

  constructor(private shopService:ShoppingListService){}

  ngOnInit(): void {
    this.getIngredients()
  }

  getIngredients(){
    this.shopService.ingSub.subscribe(ing=>{
      if(ing){
        this.ingredients = ing
      }
    })

    this.ingredients = this.shopService.getIngredients()
  }

  editIngredient(index:number){
    this.shopService.ingId = index;
    this.ingSub.next(this.ingredients[index]);
  }
  
}
