import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { TreeviewComponent } from './treeview.component';

@Injectable()
export abstract class TreeviewEventParser {
    abstract getSelectedChange(component: TreeviewComponent): any[];
}

@Injectable()
export class DefaultTreeviewEventParser extends TreeviewEventParser {
    getSelectedChange(component: TreeviewComponent): any[] {
        const checkedItems = component.checkedItems;
        if (!_.isNil(checkedItems)) {
            return checkedItems.map(item => item.value);
        }

        return [];
    }
}
