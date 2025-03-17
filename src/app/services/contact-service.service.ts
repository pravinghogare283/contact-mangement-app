import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  apiUrl = 'http://localhost:3000/result';

  public id = new BehaviorSubject("1");
  public data = new BehaviorSubject("");

  contactId = this.id.asObservable();
  contactData = this.data.asObservable();
  

  constructor(private http : HttpClient) { }


  getContactDetails(){
    return this.contactId,this.contactData;
  }

  getContactDetailsById(id:any, data:any){
    this.id.next(id);
    this.data.next(data);
  }

  fetchContactDetailsList(){
    return this.http.get(this.apiUrl);
  }

  addNewContact(data:any){
    return this.http.post(this.apiUrl,data);
  }

  updateContact(id: any, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  

  deleteContact(id: any) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}
