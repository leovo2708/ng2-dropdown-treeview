import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DropdownTreeviewModule } from 'ng2-dropdown-treeview';
import { AppComponent } from './app.component';
import { CityComponent } from './city.component';
import { I18n } from './i18n';
import { DisabledOnSelectorDirective } from './disabled-on-selector.directive';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        DropdownTreeviewModule.forRoot()
    ],
    declarations: [
        CityComponent,
        AppComponent,
        DisabledOnSelectorDirective
    ],
    providers: [
        I18n
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
