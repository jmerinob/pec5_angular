import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(2000, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class CategoryComponent implements OnInit {
  products!: Product[];
  isLoading = false;
  constructor(
    private ProductsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    const category = this.activatedRoute.snapshot.paramMap.get('category');

    this.ProductsService.getProductsByCategory(category!).subscribe(
      (productsByCategory) => {
        if (!productsByCategory) {
          this.isLoading = false;
          return this.router.navigateByUrl('/');
        }

        this.products = productsByCategory;
        console.log('Products -->', this.products);
        this.isLoading = false;
        return null;
      }
    );
  }
}
