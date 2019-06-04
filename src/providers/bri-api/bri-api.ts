import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../models/user";
import {Bri} from "../../models/bri";

/*
  Generated class for the BriApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BriApiProvider {

  private briUrl = 'http://127.0.0.1:9428/api/users';


  /**
   * Observable which contains the list of the tickets.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */

  constructor(private http: HttpClient) {
  }

  getBriById(id: string): Observable<User> {
    return this.http.get<User>(this.briUrl + '/' + id);
  }

  addTimeSlot(userId: string, dateDep: Date, dateEnd: Date) {
    return this.http.post<User>(this.briUrl + '/bri/' + userId + '/timeSlot', {
      departureTime: dateDep,
      endTime: dateEnd
    });
  }

  getAllAppointment() {
    return this.http.get<User[]>(this.briUrl + '/bri/appointment');
  }

  getAppointmentOfTheDay(id: string): Observable<any[]> {
    const date = new Date();
    return this.http.get<any[]>(this.briUrl + '/bri/' + id + '/appointment/' + date.toISOString() );
  }

  studentReserveTimeSlot(briId: string, timeSlotId: string, studentId: string) {
    return this.http.put<User>(this.briUrl + '/bri/' + briId + '/appointment/available/' + timeSlotId, {
      reservedBy: studentId
    });
  }

  findTimeSlotByDate(date: Date, bri: Bri) {
    return bri.appointment.filter(a => {
      const curDate = new Date(a.timeSlot.departureTime);
      if (curDate.getDate() === date.getDate() && curDate.getMonth() === date.getMonth()
        && curDate.getFullYear() === date.getFullYear()) {
        return true;
      }
    });
  }

  findTimeSlotByhour(bri: Bri, hourDep: number, date: Date) {
    const bo = bri.appointment.filter(a => {
      const curDate = new Date(a.timeSlot.departureTime);
      if (curDate.getDate() === date.getDate() && curDate.getMonth() === date.getMonth()
        && curDate.getFullYear() === date.getFullYear()) {
        return true;
      }
    })[0];
    return bo.available.filter(av => {
      if (av.reservedBy === undefined && av.slot.departureTime.getHours() === hourDep) {
        return true;
      }
    });
  }

}
