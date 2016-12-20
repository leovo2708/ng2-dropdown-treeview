import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { TreeItem } from './treeview.component';

@Pipe({
    name: 'leoTreeview'
})
export class TreeviewPipe implements PipeTransform {
    transform(objects: any[], textField: string): TreeItem[] {
        if (_.isNil(objects)) {
            return undefined;
        }

        return objects.map(object => new TreeItem(object[textField], object));
    }
}
