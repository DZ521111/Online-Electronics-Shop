import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, of, Subject, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { User } from 'src/app/user';
import { TokenStorageService } from './token-storage.service';




interface UserDto
{
  user: User;
  token: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = '/api/auth/';
  private redirectUrlAfterLogin = '';

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService)
  {

  }

  private user$ = new BehaviorSubject<User>(null);

  get isUserLoggedIn()
  {
    return this.user$.value !== null;
  }

  set redirectUrl(url: string)
  {
    this.redirectUrlAfterLogin = url;
  }

  register(userToSaved: any)
  {
    /*this.setUser(user);
    console.log(`Registration successfully`, user);
    return of(user);*/
    return this.httpClient.post<any>(`${this.apiUrl}register`, userToSaved).pipe
    (
      switchMap(({user, token}) => {
        this.setUser(user);
        this.tokenStorage.setToken(token);
        console.log(`user register succesfully`, user);
        return of(user);
      }),
      catchError(e => {
        console.error(`error occured`, e);
        return throwError(`registration failed! admin`);
      })
    );
  }



  findMe()
  {
    const token = this.tokenStorage.getToken();
    if (!token)
    {
      return EMPTY;
    }
    return this.httpClient.get<any>(`${this.apiUrl}findme`).pipe(
      switchMap(({user}) => {
          this.setUser(user);
          console.log(`user Found!`, user);
          return of(user);
        }
      ),
      catchError(e => {
        console.error(`invalid login credentials`, e);
        return throwError(`Email and Password are Incorrect!`);
      })
    );
  }



  get user()
  {
    return this.user$.asObservable();
  }



  private setUser(user)
  {
    this.user$.next(user);
  }



  login(email: string, password: string)
  {
    const loginCredentials = { email, password };
    return this.httpClient.post<UserDto>(`${this.apiUrl}login`, loginCredentials).pipe(
      switchMap(({user, token}) => {
          this.setUser(user);
          this.tokenStorage.setToken(token);
          console.log(`user Found!`, user);
          return of(this.redirectUrlAfterLogin);
        }
      ),
      catchError(e => {
        console.log(`invalid login credentials`, e);
        return throwError(`Email and Password are Incorrect!`);
      })
    );
  }


  logout(): void
  {
    // remove user from Subject
    // remove token from local storage
    this.tokenStorage.removeToken();
    this.setUser(null);
    console.log(`user has been looged out`);
  }
}
