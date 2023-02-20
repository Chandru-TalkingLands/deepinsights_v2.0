"use client";
import React, { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import axios from "axios";

export const Layers = ({ checkboxvalue, checkboxstatus, getmapZoom }) => {
  const map = useMap();
console.log(checkboxvalue);
  async function getwfsLayerData(wmscheckedlayers) {
    if (wmscheckedlayers) {
      const wfslayerdata = await axios.get(
        "https://georchestra-127-0-1-1.traefik.me/geoserver/psc/ows",
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

    if (checkboxvalue && checkboxvalue.length > 0)
      wmscheckedlayers = checkboxvalue.toString();
    getwfsLayerData(wmscheckedlayers);
    wmslayer = L.tileLayer
      .wms("https://georchestra-127-0-1-1.traefik.me/geoserver/psc/wms", {
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
      .wms("https://georchestra-127-0-1-1.traefik.me/geoserver/psc/wms", {
        layers: wmscheckedlayers,
        transparent: true,
        format: "image/png",
        tiled: true,
      })
      .addTo(map);
  }, [checkboxvalue]);

  useEffect(() => {
    map.on("zoom", () => {
      getmapZoom(map.getZoom());
    });
  }, []);
  return <div></div>;
};
