import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-image',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(2000, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ProductComponent implements OnInit {
  product!: Product;
  isLoading!: boolean;
  constructor(
    private ProductsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    const identifier = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Identifier --> ', identifier);

    this.ProductsService.getProductById(identifier!).subscribe((product) => {
      if (!product) {
        this.isLoading = false;
        return this.router.navigateByUrl('/');
      }

      this.product = product;
      console.log('Product -->', this.product);
      this.isLoading = false;
      return null;
    });
  }
}
