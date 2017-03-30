# ng2-dropdown-treeview [![Build Status](https://travis-ci.org/leovo2708/ng2-dropdown-treeview.svg?branch=master)](https://travis-ci.org/leovo2708/ng2-dropdown-treeview) [![npm version](https://img.shields.io/npm/v/ng2-dropdown-treeview.svg)](https://www.npmjs.com/package/ng2-dropdown-treeview)

An Angular 2 tree component with checkbox and multiple level.

## Dependencies

* [Angular 2](https://angular.io)
* [Lodash](https://lodash.com)
* [Bootstrap 4 alpha 6](https://v4-alpha.getbootstrap.com)
* [Font Awesome 4](http://fontawesome.io)

You can customize CSS yourself to break down dependencies to Bootstrap & Font Awesome.

## Features

* Unlimited tree levels
* Item state: checked, disabled
* Collapse / Expand
* Text filtering
* Internationalization (i18n) support

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

Treeview dropdown:
```html
<leo-dropdown-treeview
    [config]="config"
    [items]="items"
    (selectedChange)="onSelectedChange($event)">
</leo-dropdown-treeview>
```

Treeview without dropdown:
```html
<leo-treeview
    [config]="config"
    [items]="items"
    (selectedChange)="onSelectedChange($event)">
</leo-treeview>
```

 `config` is optional. This is the default configuration:
 ```js
 {
    isShowAllCheckBox: true,
    isShowFilter: false,
    isShowCollapseExpand: false,
    maxHeight: 500
}
```
You can change default configuration easily because TreeviewConfig is injectable.

I also support a pipe `leoTreeview` to map your JSON objects to TreeItem objects.
```html
<leo-dropdown-treeview
    [config]="config"
    [items]="items | leoTreeview:'textField'"
    (selectedChange)="onSelectedChange($event)">
</leo-dropdown-treeview>
```

Create a TreeviewItem
 ```js
 const itCategory = new TreeviewItem({
    text: 'IT', value: 9, children: [
        {
            text: 'Programming', value: 91, children: [{
                text: 'Frontend', value: 911, children: [
                    { text: 'Angular 1', value: 9111 },
                    { text: 'Angular 2', value: 9112 },
                    { text: 'ReactJS', value: 9113 }
                ]
            }, {
                text: 'Backend', value: 912, children: [
                    { text: 'C#', value: 9121 },
                    { text: 'Java', value: 9122 },
                    { text: 'Python', value: 9123, checked: false }
                ]
            }]
        },
        {
            text: 'Networking', value: 92, children: [
                { text: 'Internet', value: 921 },
                { text: 'Security', value: 922 }
            ]
        }
    ]
});
```

You can pass the second paramater 'autoCorrectChecked' with value=true (default is false) in constructor of TreeviewItem to correct checked value of it and all of its descendants. In some cases, you need to add or remove children flexibly, checked of parent may be not correct. Then you need to call function correctChecked() to help to correct from root to its descendants.
 ```js
 itCategory.correctChecked();
 ```

Please checkout my demo for all of funtionality.

## Contributing

I am very appreciate for your ideas, proposals and found bugs which you can leave in github issues. Thanks in advance!