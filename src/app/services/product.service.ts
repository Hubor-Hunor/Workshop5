import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = "products";
  private commentUrl = "comments";

  constructor(private http: HttpClient) { }

  public getProducts() {
    return this.http.get(`https://dummyjson.com/${this.productUrl}?limit=100`);
  }

  public getComments() {
    return this.http.get(`https://dummyjson.com/${this.commentUrl}?limit=200`);
  }

  public deleteProduct(id: number){
    return this.http.delete(`https://dummyjson.com/${this.productUrl}/${id}`);
  }
}
