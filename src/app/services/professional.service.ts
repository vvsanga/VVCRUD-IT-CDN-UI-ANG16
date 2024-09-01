import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {

  //baseUrl: string = "https://localhost:7265/api/professional";
  baseUrl: string = "https://www.vvcruditcdnapi.somee.com/api/Professional"

  constructor(private httpClient: HttpClient) { }

  getProfessionalList(pageNo: number = 1, pageSize: number = 5): Observable<any> {
    return this.httpClient.get(this.baseUrl + `?pageNo=${pageNo}&pageSize=${pageSize}`);
  }

  addProfessional(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl, data);
  }

  updateProfessional(id: number, data: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + `/${id}`, data);
  }

  deleteProfessional(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + `/${id}`);
  }
}
