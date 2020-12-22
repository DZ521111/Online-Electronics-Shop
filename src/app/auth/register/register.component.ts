import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

console.log('in register');

@Component({
  selector: 'zs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    cpassword: new FormControl('', [Validators.required, this.passwordMatch])
  });


  constructor(private router: Router, private authService: AuthService) {
    console.log('in reg ctor');
  }

  ngOnInit(): void {
  }

  passwordMatch(control: FormControl)
  {
    const password = control.root.get('password');
    return password && control.value !== password.value?
    {
      passwordMatch: true,
    }:null;
  }

  register()
  {
    if (!this.userForm.valid)
    {
      return;
    }
    const user = this.userForm.getRawValue();
    this.authService.register(user).subscribe(s => this.router.navigate(['/']));
  }

  get fname()
  {
    return this.userForm.get('fname');
  }

  get lname()
  {
    return this.userForm.get('lname');
  }

  get email()
  {
    return this.userForm.get('email');
  }

  get password()
  {
    return this.userForm.get('password');
  }

  get cpassword()
  {
    return this.userForm.get('cpassword');
  }

}
