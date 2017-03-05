/// <reference path="../typings/custom-jasmine.d.ts" />
import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import * as _ from 'lodash';
import { DropdownTreeviewModule } from '../index';
import { createGenericTestComponent, raiseInputEvent, raiseClickEvent } from './testing/common';
import { model } from './testing/model';
import { queryTextboxFilter, queryCheckboxAll } from './treeview.component.spec';

@Component({
    selector: 'leo-test',
    template: '',
})
class TestComponent {
    config = _.cloneDeep(model.config);
    items = _.cloneDeep(model.items);
}

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function queryDropdownButton(debugElement: DebugElement): DebugElement {
    return debugElement.query(By.css('.dropdown-toggle'));
}

describe('DropdownTreeviewComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                DropdownTreeviewModule.forRoot(),
                FormsModule,
                BrowserModule
            ],
            declarations: [
                TestComponent
            ]
        });
    });

    it('search "ad" -> uncheck "All" -> Expect: text is not "All"', async(() => {
        const fixture = createTestComponent('<leo-dropdown-treeview [items]="items" [config]="config"></leo-dropdown-treeview>');
        fixture.whenStable().then(() => {
            const dropdownButton = queryDropdownButton(fixture.debugElement);
            const textboxFilter = queryTextboxFilter(fixture.debugElement);
            raiseInputEvent(textboxFilter.nativeElement, 'ad');
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                const checkboxAll = queryCheckboxAll(fixture.debugElement);
                raiseClickEvent(checkboxAll.nativeElement);
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    expect(dropdownButton.nativeElement).not.toHaveTextContent('All');
                });
            });
        });
    }));
});
