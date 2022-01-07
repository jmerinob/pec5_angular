import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.interface';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }

  getProductById(id: String): Observable<Product> {
    return this.http.get<Product>('https://fakestoreapi.com/products/' + id);
  }

  getProductCategories(): Observable<any>{
    return this.http.get<any>('https://fakestoreapi.com/products/categories');
  }

  getProductsByCategory(category: String): Observable<Product[]>{
    return this.http.get<Product[]>('https://fakestoreapi.com/products/category/' + category);

  }
}
