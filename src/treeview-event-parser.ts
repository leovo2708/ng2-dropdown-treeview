import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { TreeviewComponent } from './treeview.component';
import { TreeviewItem } from './treeview-item';

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

export interface DownlineTreeviewItem {
    item: TreeviewItem;
    parent: DownlineTreeviewItem;
}

@Injectable()
export class DownlineTreeviewEventParser extends TreeviewEventParser {
    getSelectedChange(component: TreeviewComponent): any[] {
        const items = component.filterItems;
        if (!_.isNil(items)) {
            let result: DownlineTreeviewItem[] = [];
            items.forEach(item => {
                const links = this.getLinks(item, null);
                if (!_.isNil(links)) {
                    result = result.concat(links);
                }
            });

            return result;
        }

        return [];
    }

    getLinks(item: TreeviewItem, parent: DownlineTreeviewItem): DownlineTreeviewItem[] {
        if (!_.isNil(item.children)) {
            const link = {
                item: item,
                parent: parent
            };
            let result: DownlineTreeviewItem[] = [];
            item.children.forEach(child => {
                const links = this.getLinks(child, link);
                if (!_.isNil(links)) {
                    result = result.concat(links);
                }
            });

            return result;
        }

        if (item.checked) {
            return [{
                item: item,
                parent: parent
            }];
        }

        return null;
    }
}
