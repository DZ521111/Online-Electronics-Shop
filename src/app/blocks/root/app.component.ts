import { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/user';


@Component({
  selector: 'zs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy , OnInit {
  title = 'Z-shopping';
  user: Observable<User>;
  userSubscription: Subscription;
  constructor(public authService: AuthService, private router: Router)
  {
  }

  ngOnInit(): void {
    this.user = this.authService.user;
    this.userSubscription = this.authService.findMe().subscribe(user => {this.user = user; console.log(user);});
  }
  ngOnDestroy(): void
  {
    if (this.userSubscription)
    {
      this.userSubscription.unsubscribe();
    }
  }

  logout()
  {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
