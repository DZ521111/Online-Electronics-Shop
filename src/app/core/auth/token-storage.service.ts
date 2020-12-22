import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  TOKEN_KEY = 'Z-shopping.AuthToken';
  constructor() { }

  setToken(token: string)
  {
    // console.log("before if")
    if (!token)
    {
      return;
    }
    // console.log("out if")
    console.log(token);
    this.removeToken();
    window.localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken()
  {
    return window.localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken()
  {
    // console.log("in remove")
    window.localStorage.removeItem(this.TOKEN_KEY);
    //window.localStorage.clear();
  }
}
