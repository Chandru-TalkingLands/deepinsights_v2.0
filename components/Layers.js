"use client";
import React, { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import axios from "axios";

export const Layers = ({ checkboxvalue }) => {
  const map = useMap();

  async function getwfsLayerData() {
    const wfslayerdata = await axios.get(
      "http://43.205.20.114:8080/geoserver/exampleworkspace/ows",
      {
        params: {
          service: "WFS",
          version: "1.0.0",
          request: "GetFeature",
          typename: "Madhugiri Taluk",
          outputFormat: "application/json",
        },
      }
    );
    const data = await wfslayerdata.data;
    const geojson = L.geoJSON(data);
    const bounds = geojson.getBounds();
    map.fitBounds(bounds);
  }

  useEffect(() => {
    let wmslayer;
    // if(wmslayer)console.log(wmslayer.options.layers) 
    if (checkboxvalue) {
      getwfsLayerData();
      wmslayer = L.tileLayer
        .wms("http://43.205.20.114:8080/geoserver/exampleworkspace/wms", {
          layers: "Madhugiri Taluk",
          transparent: true,
          format: "image/png",
          tiled: true,
        }).addTo(map);
    } else if (!checkboxvalue) {
      console.log(wmslayer);
      map.eachLayer((layer) => {
        if (layer.options.layers) map.removeLayer(layer);
      });
    }
   
  }, [checkboxvalue]);

  return <div></div>;
};
