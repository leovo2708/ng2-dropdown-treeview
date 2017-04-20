# ng2-dropdown-treeview [![Build Status](https://travis-ci.org/leovo2708/ng2-dropdown-treeview.svg?branch=master)](https://travis-ci.org/leovo2708/ng2-dropdown-treeview) [![npm version](https://img.shields.io/npm/v/ng2-dropdown-treeview.svg)](https://www.npmjs.com/package/ng2-dropdown-treeview)

An Angular 2 tree component with checkbox and multiple level.

> This component is discontinued anymore. It's compatible with both Angular 2 & 4.  
> **But if you are using Angular 4, should switch to my new component [ngx-treeview](https://www.npmjs.com/package/ngx-treeview)**

<br/>

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
* Template

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

#### Treeview dropdown:
```html
<leo-dropdown-treeview
    [config]="config"
    [items]="items"
    (selectedChange)="onSelectedChange($event)">
</leo-dropdown-treeview>
```

#### Treeview without dropdown:
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

#### Pipe `leoTreeview`:
To map your JSON objects to TreeItem objects.
```html
<leo-dropdown-treeview
    [config]="config"
    [items]="items | leoTreeview:'textField'"
    (selectedChange)="onSelectedChange($event)">
</leo-dropdown-treeview>
```

#### Create a TreeviewItem:
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

You can pass the second paramater 'autoCorrectChecked' with value=true (default is false) in constructor of TreeviewItem to correct checked value of it and all of its descendants. In some cases, you need to push or pop children flexibly, checked of parent may be not correct. Then you need to call function correctChecked() to help to correct from root to its descendants.
 ```js
const vegetableCategory = new TreeviewItem({
    text: 'Vegetable', value: 2, children: [
        { text: 'Salad', value: 21 },
        { text: 'Potato', value: 22 }
    ]
});
vegetableCategory.children.push(new TreeviewItem({ text: 'Mushroom', value: 23, checked: false }));
vegetableCategory.correctChecked(); // need this to make 'Vegetable' node to change checked value from true to false
 ```

#### TreeviewEventParser:
Extract data from list of checked TreeviewItem and send it in parameter of event selectedChange. Some built-in TreeviewEventParser:
* DefaultTreeviewEventParser: return values of checked items.
* DownlineTreeviewEventParser: return list of checked items in orginal order with their ancestors.
* OrderDownlineTreeviewEventParser: return list of checked items in checked order with their ancestors. Note that: value of a leaf must be different from value of other leaves.

#### TreeviewItem Template:
See example 4.

## Contributing

I am very appreciate for your ideas, proposals and found bugs which you can leave in github issues. Thanks in advance!