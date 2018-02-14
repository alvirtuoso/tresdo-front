import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AlertService } from './shared/alertService/alert.service';
import { UserService } from './shared/userService/user.service';
import { BoardService } from './shared/boardService/board.service';
import { CardService } from './shared/cardService/card.service';
import { ItemService } from './shared/itemService/item.service';

import { routing } from './app.routing';

// Third party modules
import { MaterializeModule } from 'angular2-materialize';
// import { ModalModule } from 'angular2-modal';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import { ClarityModule } from 'clarity-angular';
import {DragulaModule, DragulaService} from 'ng2-dragula/ng2-dragula';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { QuillModule } from 'ngx-quill';
import { MyDatePickerModule } from 'mydatepicker';
// import { Ng2UploaderModule } from 'ng2-uploader';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { NavComponent } from './nav/nav.component';
import { UserComponent } from './user/user.component';
import { BoardFormComponent } from './board-form/board-form.component';
import { CardComponent } from './card/card.component';
import { BoardComponent } from './board/board.component';

import { Global } from './shared/global';
import { ItemComponent } from './item/item.component';
// import { UploadComponent } from './upload/upload.component';
import { TestComponent } from './test/test.component';

// This projects modules
import { AuthModule } from './+auth/auth.module';
import {AuthService} from './+auth/auth-service';
import { AuthGuard } from './+auth/auth-guard.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DialogComponent } from './dialog/dialog.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DebounceDirective } from './debounce/debounce.directive';
import { environment } from '../environments/environment';


// Must export the config
// export const firebaseConfig = {
//     apiKey: "AIzaSyD6gNNeGT-BvkbH7q5raokXw4TM-u2DTLs",
//     authDomain: "someday-735c3.firebaseapp.com",
//     databaseURL: "https://someday-735c3.firebaseio.com",
//     storageBucket: "someday-735c3.appspot.com",
//     messagingSenderId: "723760278825"
// };

// const firebaseAuthConfig = {
//   provider: AuthProviders.Password,
//   method: AuthMethods.Password
// }

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ClarityModule.forRoot(),
    BootstrapModalModule,
    MaterializeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    DragulaModule,
    QuillModule,
    MyDatePickerModule,
    AuthModule,
    // Ng2UploaderModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    // MaterializeDirective,
    NavComponent,
    UserComponent,
    BoardFormComponent,
    CardComponent,
    BoardComponent,
    ItemComponent,
    // authComponents,
    UserProfileComponent,
    DialogComponent,
    NavigationComponent,
    DebounceDirective,
    // UploadComponent,
    TestComponent
],
  providers: [
    AlertService,
    UserService,
    BoardService,
    CardService,
    ItemService,
    DragulaService,
    HttpModule,
    AuthService,
    AuthGuard,
    Global
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
