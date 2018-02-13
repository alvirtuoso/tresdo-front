import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/observable';
import { AngularFireDatabase } from 'angularfire2/database';
import '../style/app.scss';

@Component({
  selector: 'app-root', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  url = 'https://github.com/preboot/angular2-webpack';
  items: Observable<any[]>;
  constructor(af: AngularFireAuth, afdb: AngularFireDatabase) {
     this.items = afdb.list('/items').valueChanges();
  }
}
