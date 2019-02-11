import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { UserService } from 'shared/services/user.service';
import { Subscription } from 'rxjs';
import { ThemeService } from 'shared/services/theme.service';
import { Theme } from 'shared/models/theme';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  userSubscription: Subscription;
  userId: string;
  themeSubscription: Subscription;
  themeList: Theme[];

  constructor(
    private auth: AuthService,
    private themeService: ThemeService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.themeSubscription = this.themeService.getAll().subscribe(theme => this.themeList = theme);

  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  saveUser(user: AppUser) {
    console.log(user);
    this.userService.saveChanges(user, this.userId);
  }

  themePreview() {
    this.themeService.setCurrentTheme(this.appUser.theme);
  }
}
