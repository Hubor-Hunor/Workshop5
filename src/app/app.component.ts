import { Component } from '@angular/core';

import { Product } from './product';
import { ProductService } from './services/product.service';
import { Comment } from './comment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wapp-5_v1.0';

  products: Product[] = []
  selectedProduct: Product = new Product();
  
  comments: Comment[] = [];
  
  constructor(private productService: ProductService) { }


  ngOnInit() {
    this.productService.getComments().subscribe((data: any) => {
      this.comments = data.comments;
      console.log(this.comments);
    });

    this.productService.getProducts().subscribe((data: any) => {
      this.products = data.products;
      console.log(this.products);

      this.products.forEach(product => {
        product.comments = this.comments.filter(comment => comment.postId === product.id);
      });
    });
  }


  public async deleteProduct(product: Product) {
    const data = await (await fetch('https://dummyjson.com/products/' + product.id)).json()
    console.log(data)
    let i = this.products.findIndex(x => x.id === product.id)
    this.products.splice(i, 1)
  }


  public select(product: Product) {
    this.selectedProduct = product
  }


  public close() {
    this.selectedProduct = new Product()
  }


  public addColor(product: Product) {
    let colorClass = ''
    if (product.stock <= 50) {
      colorClass = 'table-danger'
    }
    else if (product.stock <= 100) {
      colorClass = 'table-warning'
    }
    else {
      colorClass = 'table-success'
    }
    return colorClass
  }


  public countCategory() {
    let s = ''
    let categories: string[] = []
    let counts: number[] = []
    for (let i = 0; i < this.products.length; i++) {
      let has = false
      for (let x = 0; x < categories.length; x++) {
        if (this.products[i].category === categories[x]) {
          counts[x] += 1
          has = true
          break
        }
      }
      if (has == false) {
        categories.push(this.products[i].category)
        counts.push(1)
      }
    }
    for (let i = 0; i < categories.length; i++) {
      s += categories[i] + ' ' + counts[i] + '\n'
    }
    alert(s)
  }


  public maxDiscount() {
    let max = 0
    for (let i = 0; i < this.products.length; i++) {
      if (max < this.products[i].discountPercentage) {
        max = this.products[i].discountPercentage
      }
    }
    alert(max)
  }


  public priceLevel() {
    let s = ''
    let avg = 0
    let ps: Product[] = []
    for (let i = 0; i < this.products.length; i++) {
      avg += this.products[i].price
    }
    avg /= this.products.length
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].price > avg) {
        ps.push(this.products[i])
      }
    }
    for (let i = 0; i < ps.length; i++) {
      s += ps[i].id + ' ' + ps[i].title + '\n'
    }
    alert(s)
  }
}