import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[str-trim]'
})
export class StrTrimDirective {

  // @Input() name: String;

  _elementRef:ElementRef;

  constructor(_elementRef: ElementRef) {
    this._elementRef = _elementRef;
  }

  @HostListener('blur') displayMessage(): void {
    const value = this._elementRef.nativeElement.value;
    this._elementRef.nativeElement.value = value.trim();
  }
}
