import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ROLE, Session } from './dto/session.dto';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private currentSession$ = new BehaviorSubject<Session | undefined>(undefined);

  mockedSession: Session = {
    id: "1",
    role: ROLE.ADMIN,
    token: "token"
  }

  constructor() {
    this.currentSession$.next(this.mockedSession)
  }

  getCurrentSession() {
    return this.currentSession$;
  }
}
