import { Directive, Input, OnChanges, ElementRef, Renderer } from '@angular/core';

@Directive({
    selector: '[leoDisabledOnSelector]'
})
export class DisabledOnSelectorDirective implements OnChanges {
    @Input('leoDisabledOnSelector') leoDisabledOnSelector: string;
    @Input() disabled: boolean;
    private readonly nativeElement: HTMLElement;

    constructor(
        private el: ElementRef,
        private renderer: Renderer) {
        this.nativeElement = el.nativeElement;
    }

    ngOnChanges() {
        const elements = this.nativeElement.querySelectorAll(this.leoDisabledOnSelector);
        for (let i = 0; i < elements.length; i++) {
            this.renderer.setElementProperty(elements[i], 'disabled', this.disabled);
        }
    }
}
