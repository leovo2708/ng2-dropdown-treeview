import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DropdownTreeviewModule, DropdownTreeviewComponent, DropdownTreeviewConfig, TreeItem } from '../index';

@Component({
    selector: 'leo-test',
    template: '<leo-dropdown-treeview [items]="items" [config]="config"></leo-dropdown-treeview>',
})
class TestComponent {
    config: DropdownTreeviewConfig;
    items: TreeItem[];
}

describe('DropdownTreeviewComponent', () => {
    const childrenCategory = new TreeItem('Children', 1);
    childrenCategory.children = [
        new TreeItem('Baby 3-5', 11),
        new TreeItem('Baby 6-8', 12),
        new TreeItem('Baby 9-12', 13)
    ];
    const teenCategory = new TreeItem('Teen', 2);
    const cultureCategory = new TreeItem('Culture', 22);
    teenCategory.children = [
        new TreeItem('Adventure', 21),
        cultureCategory,
        new TreeItem('Science', 23)
    ];
    cultureCategory.children = [
        new TreeItem('Vietnam', 221),
        new TreeItem('USA', 222),
    ];
    const magazineCategory = new TreeItem('Magazine', 3);
    magazineCategory.disabled = true;
    const otherCategory = new TreeItem('Others', 9);
    otherCategory.children = [
        new TreeItem('ABC', 91),
        new TreeItem('XYZ', 92),
    ];
    otherCategory.disabled = true;
    const items = [childrenCategory, teenCategory, magazineCategory, otherCategory];

    let fixture: ComponentFixture<TestComponent>;
    let componentInstance: TestComponent;
    let debugElement: DebugElement;

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
        componentInstance = fixture.componentInstance;
        debugElement = fixture.debugElement;
    });

    it('should create component', () => expect(componentInstance).toBeDefined());

    describe('config', () => {
        beforeEach(() => {
            componentInstance.items = [childrenCategory];
        });

        it('should show checkbox "All", hide "Filter", hide "Collapse/Expand" default', () => {
            fixture.detectChanges();
            const allCheckbox = debugElement.query(By.css('.dropdown-item-all > input'));
            expect(allCheckbox).not.toBeNull('checkbox "All" exists');
            const filterTextBox = debugElement.query(By.css('input[type=text]'));
            expect(filterTextBox).toBeNull('textbox "Filter" does not exist');
            const collapseExpandIcon = debugElement.query(By.css('.dropdown-item-collapse-expand > i'));
            expect(collapseExpandIcon).toBeNull('icon Collapse/Expand does not exist');
        });

        it('should hide All checkbox when config value of isShowAllCheckBox is false', () => {
            componentInstance.config = {
                isShowAllCheckBox: false
            };
            fixture.detectChanges();
            const allCheckBox = debugElement.query(By.css('.dropdown-item-all > input'));
            expect(allCheckBox).toBeNull('checkbox "All" does not exist');
        });

        it('should show filter when config value of isShowFilter is true', () => {
            componentInstance.config = {
                isShowFilter: true
            };
            fixture.detectChanges();
            const filterTextBox = debugElement.query(By.css('input[type=text]'));
            expect(filterTextBox).not.toBeNull('textbox "Filter" exists');
        });

        it('should show collapse/expand when config value of isShowCollapseExpand is true', () => {
            componentInstance.config = {
                isShowCollapseExpand: true
            };
            fixture.detectChanges();
            const collapseExpandIcon = debugElement.query(By.css('.dropdown-item-collapse-expand > i'));
            expect(collapseExpandIcon).not.toBeNull('icon Collapse/Expand exists');
        });
    });

    describe('items', () => {
        it('should show "No items" if no binding any items', () => {
            fixture.detectChanges();
            const item = debugElement.query(By.css('.dropdown-item'));
            expect(item.nativeElement.textContent.trim()).toBe('No items', 'text must be No items');
        });

        it('should uncheck all items when click checkbox "All"', () => {
            componentInstance.items = [childrenCategory, teenCategory];
            fixture.detectChanges();
            /*const itemCheckBoxes = debugElement.queryAll(By.css('.treeview-container input'));
            const allCheckbox = debugElement.query(By.css('.dropdown-item-all > input'));
            allCheckbox.triggerEventHandler('click', null);
            fixture.detectChanges();
            allCheckbox.triggerEventHandler('click', null);
            fixture.detectChanges();*/
        });

        /*it('should unable to uncheck on disabled items', () => {
            componentInstance.items = [magazineCategory, otherCategory];
            fixture.detectChanges();
            const itemCheckBoxes = debugElement.queryAll(By.css('.treeview-container input'));
            const allCheckbox = debugElement.query(By.css('.dropdown-item-all > input'));
            allCheckbox.triggerEventHandler('click', null);
            fixture.detectChanges();
            allCheckbox.triggerEventHandler('click', null);
            fixture.detectChanges();
        });*/
    });
});
