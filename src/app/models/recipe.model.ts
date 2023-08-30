import { Ingredients } from "./ingredients.model";

export interface Recipes{
    name:string;
    description:string;
    imgUrl:string;
    ingredients:Ingredients[]
}