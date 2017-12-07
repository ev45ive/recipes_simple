import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SessionModule } from "./session/session.module";
import { SigninPageComponent } from "./signin-page/signin-page.component";
import { SignupPageComponent } from "./signup-page/signup-page.component";
import { SessionPanelComponent } from "./components/session-panel/session-panel.component";
import { SearchPageComponent } from './search-page/search-page.component';
import { SearchResultsPageComponent } from './search-results-page/search-results-page.component';
import { FiltersPageComponent } from './filters-page/filters-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { RecipePageComponent } from './recipe-page/recipe-page.component';
import { OrderPageComponent } from './order-page/order-page.component';


const routes: Routes = [
  { path: '', redirectTo:'search', pathMatch: 'full' },
  { path: 'user/signin', component: SigninPageComponent, pathMatch: 'full' },
  { path: 'user/signup', component: SignupPageComponent, pathMatch: 'full' },
  { path: 'search', component: SearchPageComponent, pathMatch: 'full' },
  { path: 'search/results', component: SearchResultsPageComponent, pathMatch: 'full' },
  { path: 'search/filters', component: FiltersPageComponent, pathMatch: 'full' },
  { path: 'product/:id', component: ProductPageComponent, pathMatch: 'full' },
  { path: 'recipe/details/:id', component: RecipePageComponent, pathMatch: 'full' },
  { path: 'order', component: OrderPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    SigninPageComponent,
    SignupPageComponent,
    SessionPanelComponent,
    SearchPageComponent,
    SearchResultsPageComponent,
    FiltersPageComponent,
    ProductPageComponent,
    RecipePageComponent,
    OrderPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    }),
    FormsModule,
    SessionModule
  ],
  providers: [
    { provide: 'API_URL', useValue: 'https://api.backendless.com/A055A2AD-8F3A-3AC5-FF6D-CB7F6FC7FC00/538D19D8-06B4-A162-FFC3-3489A8D80300/' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
