import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as _ from 'lodash';

export class TreeItem {
    private internalDisabled = false;
    private internalChecked = true;
    text: string;
    value: any;
    collapsed = false;
    children?: TreeItem[];

    constructor(text: string, value: any = undefined) {
        this.text = text;
        this.value = value;
    }

    get checked(): boolean {
        return this.internalChecked;
    }

    set checked(checked: boolean) {
        if (!this.disabled) {
            this.internalChecked = checked;
        }
    }

    get disabled(): boolean {
        return this.internalDisabled;
    }

    set disabled(disabled: boolean) {
        this.internalDisabled = disabled;
        if (!_.isNil(this.children)) {
            this.children.forEach(child => child.disabled = disabled);
        }
    }

    updateCollapsedRecursive(collapsed: boolean) {
        this.collapsed = collapsed;
        if (!_.isNil(this.children)) {
            this.children.forEach(child => {
                child.updateCollapsedRecursive(collapsed);
            });
        }
    }

    updateCheckedRecursive(checked: boolean) {
        if (this.disabled) {
            return;
        }

        this.checked = checked;
        if (!_.isNil(this.children)) {
            this.children.forEach(child => {
                child.updateCheckedRecursive(checked);
            });
        }
    }

    getCheckedItems(): TreeItem[] {
        let checkedItems: TreeItem[] = [];
        if (_.isNil(this.children)) {
            if (this.checked) {
                checkedItems.push(this);
            }
        } else {
            for (let i = 0; i < this.children.length; i++) {
                checkedItems = _.concat(checkedItems, this.children[i].getCheckedItems());
            }
        }

        return checkedItems;
    }
}

@Component({
    selector: 'leo-treeview',
    template: `
<div class="treeview-item" [class.treeview-parent]="item.children">
    <i *ngIf="item.children" (click)="toggleCollapseExpand()" aria-hidden="true"
    class="fa" [class.fa-caret-right]="item.collapsed" [class.fa-caret-down]="!item.collapsed"></i>
    <label class="form-check-label">
        <input type="checkbox" class="form-check-input"
        [(ngModel)]="item.checked" (ngModelChange)="onCheckedChange($event)" [disabled]="item.disabled" />
        {{item.text}}
    </label>
    <div [hidden]="item.collapsed" *ngFor="let child of item.children">
        <leo-treeview [item]="child" (checkedChange)="onChildCheckedChange($event)"></leo-treeview>
    </div>
</div>
    `,
    styles: [`
.treeview-item {
    padding-left: 20px;
    white-space: nowrap;
}

.treeview-item .form-check-label {
    padding-top: 2px;
    padding-bottom: 2px;
}

.treeview-item .fa {
    margin-left: -1.0rem;
    width: 10px;
    cursor: pointer;
}
    `]
})
export class TreeviewComponent {
    @Input() item: TreeItem;
    @Output() checkedChange = new EventEmitter<boolean>();

    toggleCollapseExpand() {
        this.item.collapsed = !this.item.collapsed;
    }

    onCheckedChange(checked: boolean) {
        if (!_.isNil(this.item.children)) {
            this.item.children.forEach(child => {
                child.updateCheckedRecursive(checked);
            });
        }

        this.checkedChange.emit(checked);
    }

    onChildCheckedChange(checked: boolean) {
        if (this.item.checked !== checked) {
            let tempChecked = true;
            for (let i = 0; i < this.item.children.length; i++) {
                if (!this.item.children[i].checked) {
                    tempChecked = false;
                    break;
                }
            }

            if (this.item.checked !== tempChecked) {
                this.item.checked = tempChecked;
            }
        }

        this.checkedChange.emit(checked);
    }
}
