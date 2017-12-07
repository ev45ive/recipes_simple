import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {


  constructor( @Inject('API_URL') private API_URL,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  products

  order

  placeOrder() {
    this.order['status'] = "WAITING"
    this.http.put(this.API_URL + `data/orders/` + this.order['objectId'], this.order)
      .subscribe(order => {

        this.router.navigate(['/order'], {
          replaceUrl: true,
        })
      })
  }

  updateOrder() {
    if (this.order) {

      this.order['items'] = JSON.stringify(this.products)
      this.http.put(this.API_URL + `data/orders/` + this.order['objectId'], this.order)
        .subscribe(order => { })
    }
  }

  ngOnInit() {

    // czy mamy rozpoczete zamowienie
    this.http.get(this.API_URL + `data/orders?where=status IN ('NEW')`)
      .subscribe(orders => {
        if (orders[0]) {
          this.order = orders[0]
          this.products = JSON.parse(this.order['items'] || '[]')
        }

        let recipeId = this.route.snapshot.queryParamMap.get('recipeId')
        let portions = parseInt(this.route.snapshot.queryParamMap.get('portions'), 10)

        if (recipeId && portions) {
          // If no order create new empty
          this.order = this.order || {
            status: 'NEW',
            products: [],
            items: '[]'
          }
          this.products = this.products || []

          this.http.get(this.API_URL + 'data/recipes/' + recipeId)
            .subscribe(recipe => {
              let products = recipe['products']

              products.forEach(product => {
                product.amount = product.amount * portions
                product.price = product.price * portions

                let existing = this.products.find(prod => prod['objectId'] == product['objectId'])

                if (existing) {
                  existing.amount += product.amount
                  existing.price += product.price
                } else {
                  product.buy = true
                  this.products.push(product)
                }
              })

              this.order['items'] = JSON.stringify(this.products)


              // Update - add products
              if (this.order['objectId']) {
                this.http.put(this.API_URL + `data/orders/` + this.order['objectId'], this.order)
                  .subscribe(order => {
                    this.router.navigate(['/order'], {
                      replaceUrl: true
                    })
                  })

                // Create NEW with products
              } else {
                this.http.post(this.API_URL + `data/orders`, this.order)
                  .subscribe(order => {
                    this.router.navigate(['/order'], {
                      replaceUrl: true
                    })
                  })
              }

            })
        }
      })
  }

}
