import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ClientDto, ClientStatusDto } from '../../models/entities';
import { ApiResponse } from '../../models/responses';

@Injectable({ providedIn: 'root' })
export class ClientsService {
    private base = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    getClients(): Observable<ApiResponse<ClientDto[]>> {
        return this.http.get<ApiResponse<ClientDto[]>>(`${this.base}/clients`);
    }

    getClientStatus(clientId: string): Observable<ApiResponse<ClientStatusDto>> {
        return this.http.get<ApiResponse<ClientStatusDto>>(`${this.base}/clients/status/${clientId}`);
    }
}
