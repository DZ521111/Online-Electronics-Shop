import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';


@Component({
  selector: 'zs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  errormsg: string;
  password: string;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.errormsg = '';
    this.authService.login(this.email, this.password).subscribe((redirectUrl) => this.router.navigate([redirectUrl]), e => (
      this.errormsg = 'Invalid Credential'
    ));
  }

}
