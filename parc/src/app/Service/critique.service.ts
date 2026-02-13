import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { CritiqueInterface } from '../Interface/critique.interface';

@Injectable({
    providedIn: 'root',
})
export class CritiqueService {

    constructor(private dataService: DataService) {

    }

    public getCritiquesByAttraction(attractionId: number): Observable<any> {
        const url = `http://127.0.0.1:5000/critique/${attractionId}`;
        const data = this.dataService.getData(url);
        return data;
    }

    public postCritique(critique: CritiqueInterface): Observable<any> {
        const url = "http://127.0.0.1:5000/critique";
        const data = this.dataService.postData(url, critique);
        return data;
    }
}
