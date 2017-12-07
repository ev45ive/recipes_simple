import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-results-page',
  templateUrl: './search-results-page.component.html',
  styleUrls: ['./search-results-page.component.css']
})
export class SearchResultsPageComponent implements OnInit {


  constructor( @Inject('API_URL') private API_URL,
    private http: HttpClient,
    private route: ActivatedRoute) { }

  recipes

  ngOnInit() {
    let query = this.route.snapshot.queryParamMap.get('query')
    this.http.get(this.API_URL + 'data/recipes', {
      params: {
        where: query
      }
    })
      .subscribe(recipes => {
        this.recipes = recipes;
      })

  }
}
