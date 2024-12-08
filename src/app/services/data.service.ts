import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private basePath = 'assets/data';

  constructor(private http: HttpClient) {}

  // Fetch the directory structure
  getActors(): Observable<any> {
    return this.http.get<any>(`${this.basePath}/structure.json`);
  }

  // Get the content of a literary work
  getLiteraryWork(actorName: string, workName: string): Observable<string> {
    return this.http.get(`${this.basePath}/${actorName}/${workName}`, { responseType: 'text' });
  }
}
