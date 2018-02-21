import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './+auth/auth-guard.service';
import { BoardFormComponent } from './board-form/board-form.component';
import { BoardComponent } from './board/board.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TestComponent } from './test/test.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, //, canActivate: [AuthGuard] },
  { path: 'board-form', component: BoardFormComponent },
  { path: 'about', component: AboutComponent },
  { path: 'test', component: TestComponent },
  { path: 'board/:id', component: BoardComponent },
   { path: 'profile/:user', component: UserProfileComponent },
  // { path: 'test', component: NavigationComponent },
   // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

 export const routing = RouterModule.forRoot(routes,
                        { useHash: false, preloadingStrategy: PreloadAllModules })
