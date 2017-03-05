import { Component, Injectable } from '@angular/core';
import { TreeviewI18n, TreeviewItem } from 'ng2-dropdown-treeview';
import { I18n } from './i18n';
import { DefaultTreeviewI18n } from './default-treeview-i18n';

interface City {
    id: number;
    name: string;
    postCode: number;
}

@Injectable()
class CityTreeviewI18n extends DefaultTreeviewI18n {
    constructor(
        protected i18n: I18n
    ) {
        super(i18n);
    }

    getText(checkededItems: TreeviewItem[], isAll: boolean): string {
        if (isAll) {
            return this.i18n.language === 'en' ? 'All cities' : 'Tất cả thành phố';
        }

        switch (checkededItems.length) {
            case 0:
                return this.i18n.language === 'en' ? 'Select cities' : 'Chọn thành phố';
            case 1:
                return checkededItems[0].text;
            default:
                return this.i18n.language === 'en'
                    ? `${checkededItems.length} cities selected`
                    : `${checkededItems.length} thành phố đã được chọn`;
        }
    }

    allCheckboxText(): string {
        return super.allCheckboxText();
    }

    filterPlaceholder(): string {
        return super.filterPlaceholder();
    }

    filterNoItemsFoundText(): string {
        if (this.i18n.language === 'en') {
            return 'No cities found';
        } else {
            return 'Không có thành phố nào được tìm thấy';
        }
    }

    tooltipCollapseExpand(isCollapse: boolean): string {
        return super.tooltipCollapseExpand(isCollapse);
    }
}

@Component({
    selector: 'leo-city',
    template: `
<div class="row">
		<div class="col-12">
			<div class="alert alert-success" role="alert">
		        Selected cities: {{cityValue | json}}
		    </div>
		</div>
		<div class="col-12">
			<div class="form-group row">
				<label for="city-category" class="col-3 col-form-label">City category</label>
				<div class="col-9">
					<leo-dropdown-treeview [items]="cities | leoTreeview:'name'"
                        (selectedChange)="cityValue = $event">
                    </leo-dropdown-treeview>
				</div>
			</div>
		</div>
	</div>
`, providers: [
        { provide: TreeviewI18n, useClass: CityTreeviewI18n }
    ]
})
export class CityComponent {
    cities = this.createCities();
    cityValue: City[];

    private createCities(): City[] {
        return [
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
}
