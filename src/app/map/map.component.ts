import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  //private map: L.Map;
  private centroid: L.LatLngExpression = [36.900, 10.1664];
  constructor() { }

  private initMap(): void {
    var map = L.map('map', {
      center: this.centroid,
      zoom: 2
    });
    const tiles = L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=57XMBquwc7haRCgQDYWX', {
      maxZoom: 24,
      minZoom: 10,
      attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    });

    tiles.addTo(map);
    var marker = L.marker([36.836893, 10.235563]).addTo(map);
    var marker2 = L.marker([36.899383, 10.190791]).addTo(map);
  }

  ngOnInit(): void {
    this.initMap();
  }

}
