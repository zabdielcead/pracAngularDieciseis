import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [

    `
      .mapa-container{
        height:100%;
        width:100%;
      }

      .row{
        background-color: white;
        z-index:999;
        position:fixed;
        bottom:50px;
        padding:10px;
        border-radius:5px;
        width: 400px;
      }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit,OnDestroy {
  
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;

  zoomlevel: number = 10;
  center: [number, number] = [74.5, 40]

  constructor() { }
  ngOnDestroy(): void {
    this.mapa.off('zoom',() => {});
    this.mapa.off('zoomend',() => {});
    this.mapa.off('move',() => {});
  }

  ngAfterViewInit(): void {
      
 

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomlevel // starting zoom
    });

    this.mapa.on('zoom',(ev)=>{
      this.zoomlevel = this.mapa.getZoom();
    });
    this.mapa.on('zoomend',(ev)=>{
      if(this.mapa.getZoom() > 18){
        this.mapa.zoomTo(18);
      }
    });
    this.mapa.on('move',(ev)=>{
      const target = ev.target;
      const {lng, lat} = target.getCenter();
      this.center = [lng, lat]
    });
    
  }
  
  zoomOut(){
      this.mapa.zoomOut();
      //this.zoomlevel = this.mapa.getZoom();
  }

  zoomIn(){
    this.mapa.zoomIn();
    //this.zoomlevel = this.mapa.getZoom();
  }

  zoomCambio(valor: string){
    this.mapa.zoomTo(Number(valor));
  }

}
