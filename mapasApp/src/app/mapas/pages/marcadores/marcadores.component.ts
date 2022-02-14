import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?:  [number, number]; 
}


@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
      .mapa-container{
        height:100%;
        width:100%;
      }

      .list-group {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index:99;
      }
      
      li{
        cursor:pointer;
      }
   
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;

  zoomlevel: number = 10;
  center: [number, number] = [74.5, 40];

  //Arreglo de marcadores
  marcadores: MarcadorColor[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomlevel // starting zoom
    });


    this.leerLocalStorage();




    // const makerHtml: HTMLElement =  document.createElement('div');makerHtml
    // makerHtml.innerHTML = 'Hola mundo Ánimo zabdiel';


    // new mapboxgl.Marker({
    //   element:makerHtml
    // })
    //                   .setLngLat(this.center)
    //                   .addTo(this.mapa);
  }


  irMarcador(marker:MarcadorColor ){
    this.mapa.flyTo({
      center: marker.marker?.getLngLat()
    })
  }

  agregarMarcador(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador =new  mapboxgl.Marker({
      draggable: true,
      color
    })
                    .setLngLat(this.center)
                    .addTo(this.mapa);

      this.marcadores.push({
        color,
        marker: nuevoMarcador
      });

      this.guardarMarcadoresLocalStorage();
      
      nuevoMarcador.on('dragend', ()=> {
        console.log('drag');
        this.guardarMarcadoresLocalStorage();
      })

  }


  guardarMarcadoresLocalStorage(){

      const lnglatArr:MarcadorColor[] = [];

      this.marcadores.forEach(  m => {
        const color = m.color;
        const { lng, lat} = m.marker!.getLngLat();

        lnglatArr.push({
          color: color,
          centro: [ lng, lat ]
        })
      } );
    
      localStorage.setItem('marcadores', JSON.stringify(lnglatArr));
      
  }

  leerLocalStorage(){
    if(!localStorage.getItem('marcadores')){
      return;
    }
    const lnglatArr: MarcadorColor[] =  JSON.parse( localStorage.getItem('marcadores')! ) ;

    lnglatArr.forEach( m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      }).setLngLat(m.centro!)
        .addTo(this.mapa)


        this.marcadores.push({
          marker: newMarker,
          color: m.color
        })


        newMarker.on('dragend', ()=> {
          console.log('drag');
          this.guardarMarcadoresLocalStorage();
        })

    });

    


  }


  borrarMarcador(i: number){
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i,1);
    this.guardarMarcadoresLocalStorage();
  }




}
