import { Component, OnInit } from '@angular/core';
import { DropdownTreeviewConfig, TreeItem } from 'ng2-dropdown-treeview';

@Component({
    selector: 'leo-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    value: string;
    items: TreeItem[];
    config: DropdownTreeviewConfig = {
        isShowFilter: true,
        isShowCollapseExpand: true,
        noSelectText: 'Select categories',
        moreSelectText: 'categories selected'
    };

    ngOnInit() {
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
        this.items = [childrenCategory, teenCategory, magazineCategory, otherCategory];
    }

    onSelectedChange(values: number[]) {
        this.value = values.join(',');
    }
}
