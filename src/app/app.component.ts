import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ProductsService } from './services/products.service';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Product Tree',
    children: [
      {
        name: 'electronics',
        children: [
          { name: 'Laptops' },
          { name: 'Monitors' },
          { name: 'Keyboard' },
        ],
      },
      {
        name: 'jewelry',
        children: [
          { name: 'Rings' },
          { name: 'Earrings' },
          { name: 'Bracelet' },
          { name: 'Necklace' },
        ],
      },
      {
        name: "men's clothing",
        children: [
          { name: 'Jeans' },
          { name: 'Swatshirts' },
          { name: 'Jogers' },
          { name: 'Polo shirts' },
          { name: 'T-Shirts' },
        ],
      },
      {
        name: "women's clothing",
        children: [
          { name: 'Jeans' },
          { name: 'Swatshirts' },
          { name: 'Jogers' },
          { name: 'Polo shirts' },
          { name: 'T-Shirts' },
        ],
      },
    ],
  },
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

  
})
export class AppComponent {
  title = 'angular-pwa-introduction';
  categories!: any[];
  showFiller = false;

  treeControl = new NestedTreeControl<FoodNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();
  constructor(private productsService: ProductsService) {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {
    this.productsService
      .getProductCategories()
      .subscribe((categories) => (this.categories = categories));
  }
  hasChild = (_: number, node: FoodNode) =>
    !!node.children && node.children.length > 0;
}
