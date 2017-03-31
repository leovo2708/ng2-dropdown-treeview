import { Component, Injectable, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {
    TreeviewI18n, TreeviewItem, TreeviewConfig,
    TreeviewEventParser, OrderDownlineTreeviewEventParser, DownlineTreeviewItem
} from 'ng2-dropdown-treeview';
import { ProductService } from './product.service';

@Injectable()
export class ProductTreeviewConfig extends TreeviewConfig {
    isShowAllCheckBox = true;
    isShowFilter = true;
    isShowCollapseExpand = false;
    maxHeight = 500;
}

@Component({
    selector: 'leo-product',
    template: `
<div class="row">
    <div class="col-6">
        <div class="form-group">
            <div class="d-inline-block">
                <leo-treeview [items]="items" (selectedChange)="onSelectedChange($event)">
                </leo-treeview>
            </div>
        </div>
    </div>
    <div class="col-6">
        <div class="alert alert-success" role="alert">
            Selected products:
            <div *ngFor="let row of rows">{{row}}</div>
        </div>
    </div>
</div>
`, providers: [
        ProductService,
        { provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser },
        { provide: TreeviewConfig, useClass: ProductTreeviewConfig }
    ]
})
export class ProductComponent implements OnInit {
    items: TreeviewItem[];
    rows: string[];

    constructor(
        private service: ProductService
    ) { }

    ngOnInit() {
        this.items = this.service.getProducts();
    }

    onItemCheckedChange(item: TreeviewItem) {
        console.log(item);
    }

    onSelectedChange(downlineItems: DownlineTreeviewItem[]) {
        this.rows = [];
        downlineItems.forEach(downlineItem => {
            const item = downlineItem.item;
            const value = item.value;
            const texts = [item.text];
            let parent = downlineItem.parent;
            while (!_.isNil(parent)) {
                texts.push(parent.item.text);
                parent = parent.parent;
            }
            const reverseTexts = _.reverse(texts);
            const row = `${reverseTexts.join(' -> ')} : ${value}`;
            this.rows.push(row);
        });
    }
}
