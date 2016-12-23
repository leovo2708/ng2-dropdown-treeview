import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DropdownTreeviewModule } from 'ng2-dropdown-treeview';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        DropdownTreeviewModule.forRoot()
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
