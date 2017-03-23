import { Component, Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as _ from 'lodash';
import { TreeviewConfig, TreeviewItem, TreeviewI18n } from 'ng2-dropdown-treeview';
import { I18n } from './i18n';
import { DefaultTreeviewI18n } from './default-treeview-i18n';

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
			<div class="form-group row">
				<label for="book-category" class="col-3 col-form-label">Book category</label>
				<div class="col-9">
					<leo-dropdown-treeview [config]="bookConfig" [items]="bookItems"
                        (selectedChange)="bookValue = $event">
                    </leo-dropdown-treeview>
				</div>
			</div>
		</div>
	</div>
	<br />
	<h4>Example 2: Using pipe & i18n</h4>
    <leo-city></leo-city>
	<br />
	<h4>Example 3: 1000 items</h4>
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
	<h4>Example 4: Tree-view without drop-down</h4>
	<div class="row">
		<div class="col-12">
			<div class="alert alert-success" role="alert">
		        Selected items: {{bookValue2}}
		    </div>
		</div>
		<div class="col-12">
			<div class="form-group">
                <div class="d-inline-block">
                    <leo-treeview [items]="bookItems2" [config]="bookConfig2" (selectedChange)="bookValue2 = $event"></leo-treeview>
                </div>
            </div>
		</div>
	</div>
</div>
  `,
    providers: [
        { provide: TreeviewI18n, useClass: DefaultTreeviewI18n }
    ]
})
export class AppComponent {
    // example 1
    bookItems = this.createBooks();
    bookValue: number[];
    bookConfig: TreeviewConfig = {
        isShowAllCheckBox: true,
        isShowFilter: true,
        isShowCollapseExpand: true,
        maxHeight: 500
    };

    // example 2

    // example 3
    items = this.createItems();
    itemValue: any[];
    itemConfig: TreeviewConfig = {
        isShowAllCheckBox: true,
        isShowFilter: true,
        isShowCollapseExpand: false,
        maxHeight: 500
    };

    // example 4
    bookItems2 = this.createBooks();
    bookValue2: number[];
    bookConfig2: TreeviewConfig = {
        isShowAllCheckBox: true,
        isShowFilter: true,
        isShowCollapseExpand: true,
        maxHeight: 500
    };

    constructor(
        private i18n: I18n
    ) { }

    set language(language: string) {
        this.i18n.language = language;
    }

    get language() {
        return this.i18n.language;
    }

    private createBooks(): TreeviewItem[] {
        const childrenCategory = new TreeviewItem({
            text: 'Children', value: 1, collapsed: true, children: [
                { text: 'Baby 3-5', value: 11 },
                { text: 'Baby 6-8', value: 12 },
                { text: 'Baby 9-12', value: 13 }
            ]
        });
        const itCategory = new TreeviewItem({
            text: 'IT', value: 9, children: [
                {
                    text: 'Programming', value: 91, children: [
                        { text: 'Angular 1', value: 911 },
                        { text: 'Angular 2', value: 912 },
                        { text: 'ReactJS', value: 913 }
                    ]
                },
                {
                    text: 'Networking', value: 92, children: [
                        { text: 'Internet', value: 921 },
                        { text: 'Security', value: 922 }
                    ]
                }
            ]
        });
        const teenCategory = new TreeviewItem({
            text: 'Teen', value: 2, collapsed: true, disabled: true, children: [
                { text: 'Adventure', value: 21 },
                { text: 'Science', value: 22 }
            ]
        });
        const othersCategory = new TreeviewItem({ text: 'Others', value: 3, collapsed: true, disabled: true });
        return [childrenCategory, itCategory, teenCategory, othersCategory];
    }

    private createItems(): TreeviewItem[] {
        const items: TreeviewItem[] = [];
        for (let i = 0; i < 1000; i++) {
            const value: any = i === 0 ? { name: `${i}` } : i;
            const checked = i % 100 === 0;
            const item = new TreeviewItem({ text: `Item ${i}`, value: value });
            item.checked = checked;
            items.push(item);
        };
        return items;
    }
}
