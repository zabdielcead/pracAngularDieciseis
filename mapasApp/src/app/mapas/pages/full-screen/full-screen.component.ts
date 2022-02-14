import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
      #mapa{
        height:100%;
        width:100%;
      }
    `
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    console.log('fullsecren');

   
    var map = new mapboxgl.Map({
      container: 'mapa', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });
  }

  

}
