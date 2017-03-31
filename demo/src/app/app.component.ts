import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as _ from 'lodash';
import { TreeviewConfig, TreeviewItem, TreeviewI18n } from 'ng2-dropdown-treeview';
import { I18n } from './i18n';
import { DefaultTreeviewI18n } from './default-treeview-i18n';
import { AppService } from './app.service';

@Component({
    selector: 'leo-app',
    template: `
<div class="container">
    <h2>Angular 2 dropdown-treeview component demo</h2>
    <hr />
    <br />
    <div class="row">
        <label for="item-category" class="col-3 col-form-label">Language</label>
        <div class="col-9">
            <select class="form-control" [(ngModel)]="language">
                <option value="en">
                    English
                </option>
                <option value="vi">
                    Tiếng Việt
                </option>
            </select>
        </div>
    </div>
    <hr>
    <h4>Example 1: Primary features</h4>
    <div class="row">
        <div class="col-12">
            <div class="alert alert-success" role="alert">
                Selected books: {{bookValue}}
            </div>
        </div>
        <div class="col-12">
            <div class="form-check">
                <label class="form-check-label">
                    <input class="form-check-input" type="checkbox" [(ngModel)]="enableDropdownButton">
                    Check/uncheck to enable/disable dropdown button
                </label>
            </div>
            <div class="form-group row">
                <label for="book-category" class="col-3 col-form-label">Book category</label>
                <div class="col-9">
                    <leo-dropdown-treeview [config]="bookConfig" [items]="bookItems" (selectedChange)="bookValue = $event"
                        [disabled]="!enableDropdownButton" [leoDisabledOnSelector]="'button.dropdown-toggle'">
                    </leo-dropdown-treeview>
                </div>
            </div>
        </div>
    </div>
    <br />
    <h4>Example 2: 1000 items</h4>
    <div class="row">
        <div class="col-12">
            <div class="alert alert-success" role="alert">
                Selected items: {{itemValue}}
            </div>
        </div>
        <div class="col-12">
            <div class="form-group row">
                <label for="item-category" class="col-3 col-form-label">Item category</label>
                <div class="col-9">
                    <leo-dropdown-treeview [config]="itemConfig" [items]="items" (selectedChange)="itemValue = $event">
                    </leo-dropdown-treeview>
                </div>
            </div>
        </div>
    </div>
    <br />
    <h4>Example 3: Using pipe & i18n</h4>
    <leo-city></leo-city>
    <br />
    <h4>Example 4: Tree-view without drop-down & custom TreeviewConfig & custom TreeviewEventParser</h4>
    <leo-product></leo-product>
</div>
  `,
    providers: [
        { provide: TreeviewI18n, useClass: DefaultTreeviewI18n }
    ]
})
export class AppComponent implements OnInit {
    enableDropdownButton = true;

    bookItems: TreeviewItem[];
    bookValue: number[];
    bookConfig: TreeviewConfig = {
        isShowAllCheckBox: true,
        isShowFilter: true,
        isShowCollapseExpand: true,
        maxHeight: 500
    };

    items = this.createItems();
    itemValue: any[];
    itemConfig: TreeviewConfig = {
        isShowAllCheckBox: true,
        isShowFilter: true,
        isShowCollapseExpand: false,
        maxHeight: 500
    };

    constructor(
        private i18n: I18n,
        private service: AppService
    ) { }

    set language(language: string) {
        this.i18n.language = language;
    }

    get language() {
        return this.i18n.language;
    }

    ngOnInit() {
        this.bookItems = this.createBooks();
    }

    private createBooks(): TreeviewItem[] {
        return this.service.getBooks();
    }

    private createItems(): TreeviewItem[] {
        const items: TreeviewItem[] = [];
        for (let i = 0; i < 1000; i++) {
            const value: any = i === 0 ? { name: `${i}` } : i;
            const checked = i % 100 === 0;
            const item = new TreeviewItem({ text: `Item ${i}`, value: value, checked: checked });
            items.push(item);
        };
        return items;
    }
}
