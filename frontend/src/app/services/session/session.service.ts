import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Session } from './dto/session.dto';
import { HttpClient } from '@angular/common/http';
import { env } from '../../../env/env';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private apiUrl: string;
  private currentSession$: BehaviorSubject<Session | undefined> = new BehaviorSubject<Session|undefined>(undefined);

  constructor(private http: HttpClient) {
    if (env.backend === undefined) {
      throw new Error('env.backend is undefined');
    }
    this.apiUrl = env.backend.protocol + '://' + env.backend.host + '/' + env.backend.endpoints.authentication;
  }

  getCurrentSession(): Observable<Session | undefined> {
    return this.currentSession$.asObservable();
  }

  login(username: string, password: string) {
    const loginData = { username, password };
    this.http.post<Session>(`${this.apiUrl}/signin`, loginData).subscribe({
      next: (response: Session) => {
        localStorage.setItem('accessToken', response.accessToken);
        this.currentSession$.next(response);
      }
    })
  }

  logout(){
    this.currentSession$.next(undefined);
  }
}
