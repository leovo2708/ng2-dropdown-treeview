import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownTreeviewComponent } from './dropdown-treeview.component';
import { TreeviewComponent } from './treeview.component';
import { TreeviewPipe } from './treeview.pipe';

@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [
        DropdownTreeviewComponent,
        TreeviewComponent,
        TreeviewPipe
    ], exports: [
        DropdownTreeviewComponent,
        TreeviewPipe
    ]
})
export class DropdownTreeviewModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DropdownTreeviewModule
        };
    }
}
