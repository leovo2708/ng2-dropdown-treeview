import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DropdownTreeviewModule, DropdownTreeviewComponent, DropdownTreeviewConfig, TreeItem } from './shared';

@Component({
    selector: 'nap-test',
    template: '<nap-dropdown-treeview [items]="items" [config]="config"></nap-dropdown-treeview>',
})
class TestComponent {
    config: DropdownTreeviewConfig;
    items: TreeItem[];
}

describe('DropdownTreeviewComponent', () => {
    let fixture: ComponentFixture<TestComponent>;
    const item1 = new TreeItem('item1', 'item1');
    const item2 = new TreeItem('item2', 'item2');
    const item3 = new TreeItem('item3', 'item3');
    const item4 = new TreeItem('item4', 'item4');

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                BrowserModule,
                DropdownTreeviewModule.forRoot()
            ],
            declarations: [
                TestComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
    });

    it('should show No items', () => {
        const items = fixture.debugElement.queryAll(By.css('.dropdown-item'));
        expect(items.length).toBe(1, 'only one item');
        expect(items[0].nativeElement.textContent.trim()).toBe('No items', 'text must be No items');
    });

    it('check default config', () => {
        fixture.componentInstance.items = [item1];
        fixture.detectChanges();
        const allCheckbox = fixture.debugElement.query(By.css('.dropdown-item-all > input'));
        expect(allCheckbox).not.toBeNull('checkbox "All" exists');
        const filterTextBox = fixture.debugElement.query(By.css('input[type=text]'));
        expect(filterTextBox).toBeNull('textbox "Filter" does not exist');
        const collapseExpandIcon = fixture.debugElement.query(By.css('.dropdown-item-collapse-expand > i'));
        expect(collapseExpandIcon).toBeNull('icon Collapse/Expand does not exist');
    });

    it('should hide All checkbox when config value of isShowAllCheckBox is false', () => {
        fixture.componentInstance.items = [item1];
        fixture.componentInstance.config = {
            isShowAllCheckBox: false
        };
        fixture.detectChanges();
        const allCheckBox = fixture.debugElement.query(By.css('.dropdown-item-all > input'));
        expect(allCheckBox).toBeNull('checkbox "All" does not exist');
    });

    it('should show filter when config value of isShowFilter is true', () => {
        fixture.componentInstance.items = [item1];
        fixture.componentInstance.config = {
            isShowFilter: true
        };
        fixture.detectChanges();
        const filterTextBox = fixture.debugElement.query(By.css('input[type=text]'));
        expect(filterTextBox).not.toBeNull('textbox "Filter" exists');
    });

    it('should show collapse/expand when config value of isShowCollapseExpand is true', () => {
        fixture.componentInstance.items = [item1];
        fixture.componentInstance.config = {
            isShowCollapseExpand: true
        };
        fixture.detectChanges();
        const collapseExpandIcon = fixture.debugElement.query(By.css('.dropdown-item-collapse-expand > i'));
        expect(collapseExpandIcon).not.toBeNull('icon Collapse/Expand exists');
    });

    it('should uncheck all items when uncheck All checkbox', () => {
        item1.children = [item2, item3];
        fixture.componentInstance.items = [item1, item4];
        fixture.detectChanges();
        const itemCheckBoxes = fixture.debugElement.queryAll(By.css('.treeview-container input'));

        const allCheckbox = fixture.debugElement.query(By.css('.dropdown-item-all > input'));
        allCheckbox.triggerEventHandler('click', null);
        fixture.detectChanges();
        allCheckbox.triggerEventHandler('click', null);
        fixture.detectChanges();
    });
});
