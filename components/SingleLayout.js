import React, { useState } from 'react'
import { LayoutDetails } from './LayoutDetails'
import style from "app/custom.module.css";
import { MapContainer, TileLayer } from 'react-leaflet';


export const SingleLayout = ({getmapZoom,zoomConfig}) => {
    // const [zoomconfig,setzoomconfig] = useState({zoom:17})
  return (
    <div className={style.mapcontainer}>
      <MapContainer
        center={[12.9716, 77.5946]}
        zoom={17}
        minZoom={8}
        style={{ height: "95vh", width: "100%",border:'1px solid red'}}
        className={style.mapview}
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />
        <LayoutDetails getmapZoom={getmapZoom}/>
      </MapContainer>
    </div>
  )
}
