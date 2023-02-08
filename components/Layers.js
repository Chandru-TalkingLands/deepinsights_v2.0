"use client";
import React, { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import axios from "axios";

export const Layers = ({ checkboxvalue, checkboxstatus }) => {
  const map = useMap();

  async function getwfsLayerData(wmscheckedlayers) {
    if (wmscheckedlayers) {
      const wfslayerdata = await axios.get(
        "https://devapi.talkinglands.com/dev/geo/tljson",
        {
          params: {
            service: "WFS",
            version: "1.0.0",
            request: "GetFeature",
            typename: wmscheckedlayers,
            outputFormat: "application/json",
          },
        }
      );
      const data = await wfslayerdata.data;
      const geojson = L.geoJSON(data);
      const bounds = geojson.getBounds();
      map.fitBounds(bounds);
    }
  }

  useEffect(() => {
    let wmslayer;
    let wmscheckedlayers;
    console.log(checkboxvalue);

    if (checkboxvalue && checkboxvalue.length > 0)
      wmscheckedlayers = checkboxvalue.toString();
    getwfsLayerData(wmscheckedlayers);
    wmslayer = L.tileLayer
      .wms("https://devapi.talkinglands.com/dev/geo/tlmap", {
        layers: checkboxvalue,
        transparent: true,
        format: "image/png",
        tiled: true,
      })
      .addTo(map);
    let mappedlayers = [];
    map.eachLayer((layer) => {
      if (layer.options.layers) {
        mappedlayers.push(layer);
        if (checkboxstatus == false) {
          if (mappedlayers && mappedlayers.length > 0) {
            mappedlayers.map((obj) => {
              map.removeLayer(obj);
            });
          }
        }
      }
    });

    wmslayer = L.tileLayer
      .wms("https://devapi.talkinglands.com/dev/geo/tlmap", {
        layers: wmscheckedlayers,
        transparent: true,
        format: "image/png",
        tiled: true,
      })
      .addTo(map);
  }, [checkboxvalue]);

  return <div></div>;
};
