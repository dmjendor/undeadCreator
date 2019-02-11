import { Component } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'shared/services/user.service';
import { ThemeService } from 'shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private userService: UserService,
    public themeService: ThemeService,
    private auth: AuthService,
    private router: Router) {
      auth.user$.subscribe(user => {
        if (user) {
          userService.save(user);
          const returnUrl = localStorage.getItem('returnUrl');
          if (returnUrl) {
            localStorage.removeItem('returnUrl');
            router.navigateByUrl(returnUrl);
          }
        }
      });
  }
}
