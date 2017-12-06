import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../../session/session.service';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-session-panel',
  templateUrl: './session-panel.component.html',
  styleUrls: ['./session-panel.component.css']
})
export class SessionPanelComponent implements OnInit {

  constructor(
    @Inject('API_URL') private API_URL,
    private http:HttpClient,
    private router:Router,
    public sessionService:SessionService) { }

  session

  ngOnInit() {
    this.session = this.sessionService.getSession()
  }

  logout(){
    this.http.get(this.API_URL+'users/logout')
    .toPromise()
    .then(()=>{
      this.sessionService.removeSession()
      this.session = null
      this.router.navigate(['/'])
    })
  }

}
