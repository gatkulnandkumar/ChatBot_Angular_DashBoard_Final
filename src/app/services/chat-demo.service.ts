import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChatBot } from '../Model/chatbot.model';
import { Observable, throwError } from 'rxjs';
import { Login } from '../Model/login.model';
import { catchError, map } from 'rxjs/operators';

import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

type JwtToken = {
  id_token: string;
};

@Injectable({
  providedIn: 'root'
})
export class ChatDemoService {
  //  
  constructor(private http: HttpClient) { }
  // ,private localStorageService: LocalStorageService,  private sessionStorageService: SessionStorageService

  baseUrl = "http://192.168.11.21:8086/chatBot";
  tokenUrl = "http://192.168.11.21:8086/token";
  registerUrl = "http://192.168.11.21:8086/chatBot";

  public logging(url: string,payload: any) {
    console.log("Data is Entering through:-->", payload);
    return this.http.post(url, payload)
  }

  getAllTemplate(url: string): Observable<ChatBot[]> {
    console.log("inside service call");
    return this.http.get<ChatBot[]>(url);
  }

  insertTemplate(url: string,formData: any): Observable<ChatBot[]> {
    console.log("inside insertTemplate call");
    return this.http.post<ChatBot[]>(url, formData);
  }

  updateTemplateData(url: string, data: ChatBot) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.put<ChatBot>(url + '/' + data.id, data, { headers });
  }

  deleteTemplate(url: string,id: any): Observable<ChatBot[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.delete<ChatBot[]>(url + "/" + id, { headers });
  }

  getById(url: string,id: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get<ChatBot>(url + "/" + id);
  }

  signUp(loginData: any){
    console.log("Data is Entering through:-->", loginData);
    console.log("daata resp", this.http.post(this.baseUrl + '/insertUserData', loginData));
    // return this.http.post(this.baseUrl, loginData)
    return this.http.post(this.registerUrl + "/insertUserData", loginData);
  }

  logout() {
    // Clear localStorage
    localStorage.clear();
  }

  update(formData: any): Observable<ChatBot[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.put<ChatBot[]>(this.baseUrl + '/' + formData.id, formData, { headers });
  }

  login(credentials: Login): Observable<any> {
    console.log("inside service ===>", credentials);
    return this.http.post<JwtToken>(this.tokenUrl, credentials)
      .pipe(map((response: JwtToken) =>  {
        console.log("inside mapppppppp",response);
        localStorage.setItem('authenticationToken', response.id_token);
        console.log("authenticationToken has been set",response.id_token);
        
      } ));
  }


  
}
