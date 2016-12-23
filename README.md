# ng2-dropdown-treeview [![Build Status](https://travis-ci.org/leovo2708/ng2-dropdown-treeview.svg?branch=master)](https://travis-ci.org/leovo2708/ng2-dropdown-treeview) [![npm version](https://img.shields.io/npm/v/ng2-dropdown-treeview.svg)](https://www.npmjs.com/package/ng2-dropdown-treeview)

An Angular 2 checkable dropdown treeview component with multiple selection.

## Dependencies

* [Angular 2](https://angular.io)
* [Lodash](https://lodash.com)
* [Bootstrap 4](https://v4-alpha.getbootstrap.com)
* [Font Awesome 4](http://fontawesome.io)

You can customize CSS yourself to break down dependencies to Bootstrap & Font Awesome.

## Features

* Unlimited tree levels
* Item can be checked / disabled by checkbox.
* Collapse / Expand
* Text filtering
* Customizable texts

## Demo

https://embed.plnkr.co/1kcbUvNze8HAJ0tN0wsX/

## Installation

After install the above dependencies, install `ng2-dropdown-treeview` via:
```shell
npm install --save ng2-dropdown-treeview
```
Once installed you need to import our main module in your application module:
```js
import {DropdownTreeviewModule} from 'ng2-dropdown-treeview';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [DropdownTreeviewModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

## Usage

Here is the example template:
```html
<leo-dropdown-treeview
    [config]="config"
    [items]="items"
    (selectedChange)="onSelectedChange($event)">
</leo-dropdown-treeview>
```

 `config` is optional. This is the default configuration:
 ```js
 {
    isShowAllCheckBox: true,
    isShowFilter: false,
    isShowCollapseExpand: false,
    headerText: 'All',
    allText: 'All',
    noSelectText: 'Select options',
    moreSelectText: ' selected'
}
```

I also support a pipe `leoTreeview` to map your JSON objects to TreeItem objects.
```html
<leo-dropdown-treeview
    [config]="config"
    [items]="items | leoTreeview:'textField'"
    (selectedChange)="onSelectedChange($event)">
</leo-dropdown-treeview>
```

Please checkout my demo examples.

## Contributing

I am very appreciate for your ideas, proposals and found bugs which you can leave in github issues. Thanks in advance!