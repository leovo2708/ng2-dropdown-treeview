import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as _ from 'lodash';
import { TreeviewItem } from './treeview-item';

@Component({
    selector: 'leo-treeview-item',
    template: `
<div class="treeview-item" [class.treeview-parent]="item.children">
    <i *ngIf="item.children" (click)="toggleCollapseExpand()" aria-hidden="true"
        class="fa" [class.fa-caret-right]="item.collapsed" [class.fa-caret-down]="!item.collapsed"></i>
    <label class="form-check-label">
        <input type="checkbox" class="form-check-input"
            [(ngModel)]="item.checked" (ngModelChange)="onCheckedChange($event)" [disabled]="item.disabled" />
        {{item.text}}
    </label>
    <div *ngIf="!item.collapsed">
        <leo-treeview-item *ngFor="let child of item.children" [item]="child" (checkedChange)="onChildCheckedChange(child, $event)">
        </leo-treeview-item>
    </div>
</div>
    `,
    styles: [`
.treeview-item {
    padding-left: 1rem;
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
export class TreeviewItemComponent {
    @Input() item: TreeviewItem;
    @Output() checkedChange = new EventEmitter<boolean>();

    toggleCollapseExpand() {
        this.item.collapsed = !this.item.collapsed;
    }

    onCheckedChange(checked: boolean) {
        if (!_.isNil(this.item.children)) {
            this.item.children.forEach(child => child.setCheckedRecursive(checked));
        }

        this.checkedChange.emit(checked);
    }

    onChildCheckedChange(child: TreeviewItem, checked: boolean) {
        if (this.item.checked !== checked) {
            let itemChecked = true;
            for (let i = 0; i < this.item.children.length; i++) {
                if (!this.item.children[i].checked) {
                    itemChecked = false;
                    break;
                }
            }

            if (this.item.checked !== itemChecked) {
                this.item.checked = itemChecked;
                this.checkedChange.emit(checked);
            }
        }
    }
}
