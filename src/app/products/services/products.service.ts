import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import IProduct from 'src/app/interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl: string = 'https://my-json-server.typicode.com/fernandoAlonsoV/AngularProjectMockedData/products'

  constructor(private http:HttpClient) { }

  getProducts(params: string): Observable<HttpResponse<IProduct[]>> {
    const URL: string = `${this.apiUrl}${params}`

    return this.http.get<IProduct[]>(URL, {
      observe: 'response'
    });
  }

}
