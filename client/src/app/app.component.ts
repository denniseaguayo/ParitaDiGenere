import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'informazione';
  results : Object[];
  obs : Observable<object>;
 constructor(private http : HttpClient, private sanitizer: DomSanitizer){}

  load10dati()
  {
    this.obs = this.http.get("https://3000-e4d7abd6-5299-4985-b65d-a5da8ea05e20.ws-eu03.gitpod.io/dati");
    this.obs.subscribe(this.getData);
  }

  getData = (data) => {
    this.results = data;
  }
  photoURL(urltoSanitize) {
    console.log(urltoSanitize);
    return this.sanitizer.bypassSecurityTrustUrl(urltoSanitize);
}
}
