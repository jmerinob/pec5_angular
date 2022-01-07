import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.interface';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(2000, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  categories!: any[];
  isLoading = false;
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.productsService
      .getProductCategories()
      .subscribe((categories) => (this.categories = categories));
    this.productsService.getAllProducts().subscribe((products) => {
      this.products = products;
      this.isLoading = false;
    });
  }

  getProductsByCategory(category: string) {
    this.productsService
      .getProductsByCategory(category)
      .subscribe((products) => (this.products = products));
  }
}
