/// <reference types="@types/googlemaps" />‏
import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
// import { } from '@types/googlemaps';

@Component({
    selector: 'AutocompleteComponent',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
    // adressType: string="geocode";
    // @Output() setAddress: EventEmitter<any> = new EventEmitter();
    // ngAfterViewInit() {
    //     this.getPlaceAutocomplete();
    // }
    @ViewChild('addresstext') addresstext: any;

    autocompleteInput?: string;
    queryWait?: boolean;

    constructor(public zone: NgZone) {
    }

    ngOnInit() {
    }

    getPlaceAutocomplete() {
        debugger
        const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
            {
                componentRestrictions: { country: 'US' },
                types: ["geocode"]
            });
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            const place = autocomplete.getPlace();
            // this.invokeEvent(place);
            this.getAddress(place)
        });
    }

    formattedAddress: string;
    getAddress(place: any) {
        this.zone.run(() => this.formattedAddress = place['formatted_address']);
    }
}
