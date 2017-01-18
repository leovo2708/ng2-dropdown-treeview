import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as _ from 'lodash';
import { DropdownTreeviewModule, DropdownTreeviewConfig, TreeItem } from 'ng2-dropdown-treeview';

interface City {
    id: number;
    name: string;
    postCode: number;
}

@Component({
    selector: 'leo-app',
    template: `
<div class="container">
	<h2>Angular 2 dropdown-treeview component demo</h2>
	<hr />
	<br />
	<h5>Example 1: Primary features</h5>
	<div class="row">
		<div class="col-sm-12">
			<div class="alert alert-success" role="alert">
		        Selected books: {{bookValue}}
		    </div>
		</div>
		<div class="col-sm-12">
			<div class="form-group row">
				<label for="book-category" class="col-sm-3 col-form-label">Book category</label>
				<div class="col-sm-9">
					<leo-dropdown-treeview id="book-category" [config]="bookConfig" [items]="bookItems" (selectedChange)="bookValue = $event"></leo-dropdown-treeview>
				</div>
			</div>
		</div>
	</div>
	<br />
	<h5>Example 2: Using pipe</h5>
	<div class="row">
		<div class="col-sm-12">
			<div class="alert alert-success" role="alert">
		        Selected cities: {{cityValue | json}}
		    </div>
		</div>
		<div class="col-sm-12">
			<div class="form-group row">
				<label for="city-category" class="col-sm-3 col-form-label">City category</label>
				<div class="col-sm-9">
					<leo-dropdown-treeview id="city-category" [items]="cities | leoTreeview:'name'" (selectedChange)="cityValue = $event"></leo-dropdown-treeview>
				</div>
			</div>
		</div>
	</div>
	<br />
	<h5>Example 3: Customize text & 1000 items</h5>
	<div class="row">
		<div class="col-sm-12">
			<div class="alert alert-success" role="alert">
		        Selected items: {{itemValue}}
		    </div>
		</div>
		<div class="col-sm-12">
			<div class="form-group row">
				<label for="item-category" class="col-sm-3 col-form-label">Item category</label>
				<div class="col-sm-9">
					<leo-dropdown-treeview id="item-category" [config]="itemConfig" [items]="items" (selectedChange)="itemValue = $event"></leo-dropdown-treeview>
				</div>
			</div>
		</div>
	</div>
	<br />
	<h5>Example 4: Tree-view without drop-down</h5>
	<div class="row">
		<div class="col-sm-12">
			<div class="alert alert-success" role="alert">
		        Selected items: {{bookValue2}}
		    </div>
		</div>
		<div class="col-sm-12">
			<div class="form-group">
                <div class="treeview-container">
                    <div *ngFor="let item of bookItems2">
                        <leo-treeview [item]="item" (checkedChange)="onItemCheckedChange()"></leo-treeview>
                    </div>
                </div>
            </div>
		</div>
	</div>
</div>
  `,
})
export class AppComponent {
    bookItems: TreeItem[];
    bookValue: number[];
    bookConfig: DropdownTreeviewConfig = {
        isShowFilter: true,
        isShowCollapseExpand: true,
        noSelectText: 'Select categories',
        moreSelectText: 'categories selected'
    };

    cities: City[];
    cityValue: City[];

    items: TreeItem[];
    itemValue: any[];
    itemConfig: DropdownTreeviewConfig = {
        isShowFilter: true,
        isShowAllCheckBox: true,
        noSelectText: 'Select items',
        moreSelectText: 'items selected',
        allText: 'All selected',
        headerText: 'All items',
    };

    bookItems2: TreeItem[];
    bookValue2: number[];

    ngOnInit() {
        this.initBooks();
        this.initCities();
        this.initItems();
        this.initBooks2();
    }

    onItemCheckedChange() {
        this.buildBookValue2();
    }

    private initBooks() {
        let childrenCategory = new TreeItem('Children', 1);
        childrenCategory.children = [
            new TreeItem('Baby 3-5', 11),
            new TreeItem('Baby 6-8', 12),
            new TreeItem('Baby 9-12', 13)
        ];
        let teenCategory = new TreeItem('Teen', 2);
        let cultureCategory = new TreeItem('Culture', 22);
        teenCategory.children = [
            new TreeItem('Adventure', 21),
            cultureCategory,
            new TreeItem('Science', 23)
        ];
        cultureCategory.children = [
            new TreeItem('Vietnam', 221),
            new TreeItem('USA', 222),
        ];
        let magazineCategory = new TreeItem('Magazine', 3);
        magazineCategory.disabled = true;
        let otherCategory = new TreeItem('Others', 9);
        otherCategory.children = [
            new TreeItem('ABC', 91),
            new TreeItem('XYZ', 92),
        ];
        otherCategory.disabled = true;
        this.bookItems = [childrenCategory, teenCategory, magazineCategory, otherCategory];
    }

    private initCities() {
        this.cities = [
            {
                id: 1,
                name: 'Ho Chi Minh',
                postCode: 700000
            },
            {
                id: 2,
                name: 'Ha Noi',
                postCode: 100000
            }
        ];
    }

    private initItems() {
        let items: TreeItem[] = [];
        for (let i = 0; i < 1000; i++) {
            let value: any = i === 0 ? { name: `${i}` } : i;
            let checked = i % 100 == 0;
            let treeItem = new TreeItem(`Item ${i}`, value);
            treeItem.checked = checked;
            items.push(treeItem);
        };
        this.items = items;
    }

    private initBooks2() {
        this.bookItems2 = _.cloneDeep(this.bookItems);
        this.buildBookValue2();
    }

    private buildBookValue2() {
        let checkedItems: TreeItem[] = [];
        for (let i = 0; i < this.bookItems2.length; i++) {
            checkedItems = _.concat(checkedItems, this.bookItems2[i].getCheckedItems());
        }
        this.bookValue2 = checkedItems.map(item => item.value);
    }
}
