/// <reference path="../typings/custom-jasmine.d.ts" />
import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import * as _ from 'lodash';
import { DropdownTreeviewModule, DropdownTreeviewComponent, DropdownTreeviewConfig, TreeItem } from '../index';

@Component({
    selector: 'leo-test',
    template: '<leo-dropdown-treeview [items]="items" [config]="config"></leo-dropdown-treeview>',
})
class TestComponent {
    config: DropdownTreeviewConfig;
    items: TreeItem[];
}

class EventHelper<T> {
    constructor(
        private fixture: ComponentFixture<T>
    ) { }

    raiseInputEvent(inputElement: HTMLInputElement, text: string): Promise<any> {
        inputElement.value = text;
        inputElement.dispatchEvent(new Event('input'));
        this.fixture.detectChanges();
        return this.fixture.whenStable();
    }

    raiseClickEvent(element: HTMLElement): Promise<any> {
        element.click();
        this.fixture.detectChanges();
        return this.fixture.whenStable();
    }
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

    let fixture: ComponentFixture<TestComponent>;
    let componentInstance: TestComponent;
    let debugElement: DebugElement;
    let eventHelper: EventHelper<TestComponent>;

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
        eventHelper = new EventHelper(fixture);
    });

    it('should create component', async(() => expect(componentInstance).toBeDefined()));

    describe('config', () => {
        beforeEach(() => {
            componentInstance.items = [_.cloneDeep(childrenCategory)];
        });

        it('should show checkbox "All", hide "Filter", hide "Collapse/Expand" default', async(() => {
            fixture.detectChanges();
            const allCheckbox = debugElement.query(By.css('.dropdown-item-all > input'));
            expect(allCheckbox).not.toBeNull('checkbox "All" exists');
            const filterTextBox = debugElement.query(By.css('input[type=text]'));
            expect(filterTextBox).toBeNull('textbox "Filter" does not exist');
            const collapseExpandIcon = debugElement.query(By.css('.dropdown-item-collapse-expand > i'));
            expect(collapseExpandIcon).toBeNull('icon Collapse/Expand does not exist');
        }));

        it('should hide All checkbox when config value of isShowAllCheckBox is false', async(() => {
            componentInstance.config = {
                isShowAllCheckBox: false
            };
            fixture.detectChanges();
            const allCheckBox = debugElement.query(By.css('.dropdown-item-all > input'));
            expect(allCheckBox).toBeNull('checkbox "All" does not exist');
        }));

        it('should show filter when config value of isShowFilter is true', async(() => {
            componentInstance.config = {
                isShowFilter: true
            };
            fixture.detectChanges();
            const filterTextBox = debugElement.query(By.css('input[type=text]'));
            expect(filterTextBox).not.toBeNull('textbox "Filter" exists');
        }));

        it('should show collapse/expand when config value of isShowCollapseExpand is true', async(() => {
            componentInstance.config = {
                isShowCollapseExpand: true
            };
            fixture.detectChanges();
            const collapseExpandIcon = debugElement.query(By.css('.dropdown-item-collapse-expand > i'));
            expect(collapseExpandIcon).not.toBeNull('icon Collapse/Expand exists');
        }));
    });

    describe('items', () => {
        it('should show "No items" if no binding any items', async(() => {
            fixture.detectChanges();
            const item = debugElement.query(By.css('.dropdown-item'));
            expect(item.nativeElement.textContent.trim()).toBe('No items', 'text must be No items');
        }));

        it('should unable to uncheck on disabled items', async(() => {
            componentInstance.items = [_.cloneDeep(otherCategory)];
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let itemCheckBoxes = debugElement.queryAll(By.css('.treeview-container input'));
                expect(itemCheckBoxes[0].nativeElement.checked).toBeTruthy();
                eventHelper.raiseClickEvent(itemCheckBoxes[0].nativeElement).then(() => {
                    expect(itemCheckBoxes[0].nativeElement.checked).toBeTruthy();
                });
            });
        }));

        it('should hide children when collapse', async(() => {
            componentInstance.config = {
                isShowCollapseExpand: true
            };
            componentInstance.items = [_.cloneDeep(otherCategory)];
            fixture.detectChanges();
            let treeItems = debugElement.queryAll(By.css('.treeview-container .treeview-item'));
            expect(treeItems.length === 3).toBeTruthy();
            const collapseExpandIcon = treeItems[0].query(By.css('.fa'));
            expect(collapseExpandIcon.nativeElement).toHaveCssClass('fa-caret-down');
            const firstChild = treeItems[1].parent.parent.nativeElement;
            expect(firstChild.hidden).toBeFalsy();
            eventHelper.raiseClickEvent(collapseExpandIcon.nativeElement).then(() => {
                expect(firstChild.hidden).toBeTruthy();
                expect(collapseExpandIcon.nativeElement).toHaveCssClass('fa-caret-right');
            });
        }));

        it('should uncheck all items when click checkbox "All"', async(() => {
            componentInstance.items = [_.cloneDeep(childrenCategory), _.cloneDeep(teenCategory)];
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                const dropdownButton = debugElement.query(By.css('.dropdown-toggle'));
                expect(dropdownButton.nativeElement).toHaveTextContent('All');
                let itemCheckBoxes = debugElement.queryAll(By.css('.treeview-container input'));
                expect(itemCheckBoxes.filter(item => item.nativeElement.checked).length > 0).toBeTruthy('All checkboxes are checked');
                const allCheckbox = debugElement.query(By.css('.dropdown-item-all > input'));
                eventHelper.raiseClickEvent(allCheckbox.nativeElement).then(() => {
                    itemCheckBoxes = debugElement.queryAll(By.css('.treeview-container input'));
                    expect(itemCheckBoxes.filter(item => item.nativeElement.checked).length === 0).toBeTruthy('No checkboxes are checked');
                    expect(dropdownButton.nativeElement).toHaveTextContent('Select options');
                });
            });
        }));
    });

    describe('special cases', () => {
        beforeEach(() => {
            componentInstance.config = {
                isShowFilter: true,
                isShowCollapseExpand: true,
                noSelectText: 'Select categories',
                moreSelectText: 'categories selected'
            };
            componentInstance.items = [
                _.cloneDeep(childrenCategory),
                _.cloneDeep(teenCategory),
                _.cloneDeep(magazineCategory),
                _.cloneDeep(otherCategory)];
            fixture.detectChanges();
        });

        it('search "b" -> uncheck "Baby 3-5" -> clear search -> Expect: item "Children" & "All" must be unchecked', async(() => {
            fixture.whenStable().then(() => {
                const filterInput = debugElement.query(By.css('input[type="text"]'));
                eventHelper.raiseInputEvent(filterInput.nativeElement, 'b').then(() => {
                    const allCheckbox = debugElement.query(By.css('.dropdown-item-all > input'));
                    const itemCheckBoxes = debugElement.queryAll(By.css('.treeview-container input'));
                    const childrenCheckBox = itemCheckBoxes[0];
                    const baby35CheckBox = itemCheckBoxes[1];
                    expect(baby35CheckBox.nativeElement.checked).toBeTruthy();
                    eventHelper.raiseClickEvent(baby35CheckBox.nativeElement).then(() => {
                        eventHelper.raiseInputEvent(filterInput.nativeElement, '').then(() => {
                            expect(allCheckbox.nativeElement.checked).toBeFalsy();
                            expect(childrenCheckBox.nativeElement.checked).toBeFalsy();
                        });
                    });
                });
            });
        }));

        it('uncheck "Baby 3-5" -> search "b" -> check "Baby 3-5" -> Expect: item "Children" & "All" must be checked', async(() => {
            fixture.whenStable().then(() => {
                const filterInput = debugElement.query(By.css('input[type="text"]'));
                const allCheckbox = debugElement.query(By.css('.dropdown-item-all > input'));
                let itemCheckBoxes = debugElement.queryAll(By.css('.treeview-container input'));
                let childrenCheckBox = itemCheckBoxes[0];
                let baby35CheckBox = itemCheckBoxes[1];
                eventHelper.raiseClickEvent(baby35CheckBox.nativeElement).then(() => {
                    expect(allCheckbox.nativeElement.checked).toBeFalsy();
                    expect(childrenCheckBox.nativeElement.checked).toBeFalsy();
                    eventHelper.raiseInputEvent(filterInput.nativeElement, 'b').then(() => {
                        itemCheckBoxes = debugElement.queryAll(By.css('.treeview-container input'));
                        childrenCheckBox = itemCheckBoxes[0];
                        baby35CheckBox = itemCheckBoxes[1];
                        eventHelper.raiseClickEvent(baby35CheckBox.nativeElement).then(() => {
                            expect(allCheckbox.nativeElement.checked).toBeTruthy();
                            expect(childrenCheckBox.nativeElement.checked).toBeTruthy();
                        });
                    });
                });
            });
        }));

        it('search "us" -> uncheck "USA" -> clear search -> Expect: item "Culture" must be unchecked', async(() => {
            fixture.whenStable().then(() => {
                const filterInput = debugElement.query(By.css('input[type="text"]'));
                eventHelper.raiseInputEvent(filterInput.nativeElement, 'us').then(() => {
                    const allCheckbox = debugElement.query(By.css('.dropdown-item-all > input'));
                    let itemCheckBoxes = debugElement.queryAll(By.css('.treeview-container input'));
                    const usaCheckBox = itemCheckBoxes[itemCheckBoxes.length - 1];
                    eventHelper.raiseClickEvent(usaCheckBox.nativeElement).then(() => {
                        eventHelper.raiseInputEvent(filterInput.nativeElement, '').then(() => {
                            itemCheckBoxes = debugElement.queryAll(By.css('.treeview-container input'));
                            let cultureCheckBox = itemCheckBoxes.filter(item =>
                                _.trim(item.parent.nativeElement.textContent) === 'Culture')[0];
                            expect(cultureCheckBox.nativeElement.checked).toBeFalsy();
                        });
                    });
                });
            });
        }));

        it('search "ad" -> uncheck "All" -> Expect: text is not "All"', async(() => {
            fixture.whenStable().then(() => {
                const dropdownButton = debugElement.query(By.css('.dropdown-toggle'));
                const filterInput = debugElement.query(By.css('input[type="text"]'));
                eventHelper.raiseInputEvent(filterInput.nativeElement, 'ad').then(() => {
                    const allCheckbox = debugElement.query(By.css('.dropdown-item-all > input'));
                    eventHelper.raiseClickEvent(allCheckbox.nativeElement).then(() => {
                        expect(dropdownButton.nativeElement).not.toHaveTextContent('All1');
                    });
                });
            });
        }));
    });
});
