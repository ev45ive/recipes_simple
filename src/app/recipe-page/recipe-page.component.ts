import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit {

  constructor( @Inject('API_URL') private API_URL,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  portions = 2
  recipe

  order(recipe, portions){
    this.router.navigate(['/order'],{
      queryParams:{
        recipeId: recipe['objectId'],
        portions
      }
    })
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id')
    this.http.get(this.API_URL + 'data/recipes/' + id)
      .subscribe(recipe => {
        this.recipe = recipe;
      })

  }

}
