import {EventEmitter, ElementRef, OnInit, Directive, Input, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {NgModel} from '@angular/forms';

@Directive({ selector: '[debounce]' })
export class Debounce implements OnInit {
    @Input() delay: number = 700;
    @Output() onKeyupEmit: EventEmitter<any> = new EventEmitter();

    private subscription: Subscription;

    constructor(private elementRef: ElementRef, private model: NgModel) {
    }

    ngOnInit(): void {
        const eventSubscription = Observable.fromEvent(this.elementRef.nativeElement, 'keyup')
            .map(() => this.model.value)
            .debounceTime(this.delay);

       this.subscription = eventSubscription.subscribe(input => this.onKeyupEmit.emit(input));
    }
    ngOnDestroy() {
        // Prevent memory leaks by unsubscribing
        this.subscription.unsubscribe();
      }
}