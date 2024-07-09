import { Component } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  options: google.maps.MapOptions = {
    center: { lat: 2.9273, lng: -75.28189 },
    zoom: 15,
  };
  map: google.maps.Map;

  constructor() {}
}
