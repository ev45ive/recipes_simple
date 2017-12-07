import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters-page',
  templateUrl: './filters-page.component.html',
  styleUrls: ['./filters-page.component.css']
})
export class FiltersPageComponent implements OnInit {

  constructor(private router:Router) { }

  //{"kuchnia":{ "Amerykanska":"", "Polska":"", "Wloska":"" }
  //,"rodzaj_miesa":{ "Drob":"", "Wieprzowina":"", "Wolowina":"" }
  //,"rodzaj_dania":{ "Sniadanie":"", "Obiad":"", "Kolacja":"" }
  //,"czas_przygotowania":{ "10":"", "30":"", "60":"" },
  //"cena_potrawy":{ "10":"", "15":"", "50":"" } }

  search(filters) {
    let kuchnia = this.getOptions(filters.kuchnia)
    let rodzaj_miesa = this.getOptions(filters.rodzaj_miesa)
    let rodzaj_dania = this.getOptions(filters.rodzaj_dania)
    let czasy = this.getOptions(filters.czas_przygotowania)
    let ceny = this.getOptions(filters.cena_potrawy)

    let params = []

    if (kuchnia.length) {
      params.push(`cuisine IN ('${kuchnia.join("','")}')`)
    }

    if (rodzaj_miesa.length) {
      params.push(`meat_type IN ('${rodzaj_miesa.join("','")}')`)
    }

    if (rodzaj_dania.length) {
      params.push(`dish_type IN ('${rodzaj_dania.join("','")}')`)
    }

    if (!params['time'] && czasy.length) {
      params.push(`cooking_time < ${czasy.pop()} `)
    }

    if (ceny.length) {
        params.push( `price < ${ceny.pop()}` )
    }

    if(filters['time'] ){
      params.push(` cooking_time < ${filters['time']} `)
    }

      let query = params.join(' AND ')
    console.log(query)


    this.router.navigate(['/search','results'],{
      queryParams:{
        query
      }
    })
  }


  private getOptions(group) {
    var options = []
    for (let option in group) {
      if (group[option] == true) {
        options.push(option)
      }
    }
    return options
  }

  ngOnInit() {
  }

}
