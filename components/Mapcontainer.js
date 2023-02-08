"use client";
import React, { useEffect, useState } from "react";
import style from "app/custom.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Layers } from "./Layers";

export const Mapcontainer = ({checkboxvalue,checkboxstatus,getmapZoom}) => {
 
  return (
    <div className={style.mapcontainer}>
      <MapContainer
        center={[12.9716, 77.5946]}
        zoom={14}
        minZoom={8}
        style={{ height: "95vh", width: "100%"}}
        className={style.mapview}
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />
        <Layers checkboxvalue={checkboxvalue} checkboxstatus={checkboxstatus} getmapZoom={getmapZoom}/>
      </MapContainer>
    </div>
  );
};
