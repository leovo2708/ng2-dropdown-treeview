import { Component, OnInit } from '@angular/core';
import { TreeviewI18n } from 'ng2-dropdown-treeview';
import { City, CityService } from './city.service';
import { CityTreeviewI18n } from './city-treeview-i18n';

@Component({
    selector: 'leo-city',
    template: `
<div class="row">
    <div class="col-12">
        <div class="alert alert-success" role="alert">
            Selected cities: {{values | json}}
        </div>
    </div>
    <div class="col-12">
        <div class="form-group row">
            <label for="city-category" class="col-3 col-form-label">City category</label>
            <div class="col-9">
                <leo-dropdown-treeview [items]="cities | leoTreeview:'name'" (selectedChange)="values = $event">
                </leo-dropdown-treeview>
            </div>
        </div>
    </div>
</div>
`, providers: [
        CityService,
        { provide: TreeviewI18n, useClass: CityTreeviewI18n }
    ]
})
export class CityComponent implements OnInit {
    cities: City[];
    values: City[];

    constructor(
        private service: CityService
    ) { }

    ngOnInit() {
        this.cities = this.service.getCities();
    }
}
