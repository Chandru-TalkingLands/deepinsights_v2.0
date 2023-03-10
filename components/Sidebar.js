"use client";
import React, { useEffect, useState } from "react";
import style from "app/custom.module.css";
import axios from "axios";

export const Sidebar = (props) => {
  const [checkedwmslayers, setcheckedwmslayers] = useState([]);
  const [deepinsightsdata, setdeepinsightsdata] = useState([]);
  const [layerBounds, setlayerBounds] = useState();
  let [selectedLayers, setSelectedLayers] = useState([]);
  let [selectedMainLayers, setSelectedMainLayers] = useState([]);

  const mainCheckboxHandle = (e, selectedNestedLayers) => {
    if (e.target.checked) {
      setSelectedMainLayers((prev) => {
        return [...prev, e.target.name];
      });
      setSelectedLayers((prev) => {
        return [...prev, ...selectedNestedLayers];
      });
    } else {
      setSelectedMainLayers(
        selectedMainLayers.filter((sml) => sml != e.target.name)
      );
      setSelectedLayers(
        selectedLayers.filter((sl) => !selectedNestedLayers.includes(sl))
      );
    }
  };

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setSelectedLayers((prev) => {
        return [...prev, e.target.name];
      });
    } else {
      selectedLayers = selectedLayers.filter((sl) => sl !== e.target.name);
      setSelectedLayers(selectedLayers);
    }
    axios
      .post("http://localhost:4001/geo", { category: e.target.name })
      .then((res) => {
        setlayerBounds({
          _southWest: res.data.data[0].LowerCorner,
          _northEast: res.data.data[0].UpperCorner,
        });
        let layername = res.data.data[0].name;
        props.getcheckboxStatus(e.target.checked);
        if (e.target.checked && checkedwmslayers.includes(layername) == false) {
          setcheckedwmslayers((prev) => {
            return [...prev, layername];
          });
          return;
        }
        let layerindex = checkedwmslayers.indexOf(layername);
        if (layerindex > -1) {
          checkedwmslayers.splice(layerindex, 1);
        }
        setcheckedwmslayers((prev) => [...prev]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    props.getCheckboxvalue(checkedwmslayers, layerBounds);
  }, [checkedwmslayers]);

  useEffect(() => {
    axios
      .get("http://localhost:4002/list?list=summary")
      .then((res) => {
        setdeepinsightsdata(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={style.sidebarcontainer}>
      <section className={style.insightsheader}>
        <button disabled={true}>Filters</button>
        <button>Insights</button>
      </section>

      <div className={style.insightdetails}>
        <p>Regional Insights</p>
        <section className={style.checkboxContainer}>
          {deepinsightsdata &&
            deepinsightsdata.length > 0 &&
            deepinsightsdata.map((layobject) => {
              return Object.entries(layobject).map((layers) => {
                return (
                  <>
                    <div className={style.checkboxheadContainer}>
                      <input
                        type="checkbox"
                        checked={selectedMainLayers.includes(layers[0])}
                        name={layers[0]}
                        onChange={(e) => mainCheckboxHandle(e, layers[1])}
                      />
                      <label>{layers[0]}</label>
                    </div>
                    {layers[1].map((categorylayer, index) => {
                      return (
                        <div className={style.checkboxsubContainer}>
                          <div
                            className={style.checkboxheadContainer}
                            key={index}
                          >
                            <input
                              type="checkbox"
                              checked={selectedLayers.includes(categorylayer)}
                              name={categorylayer}
                              onChange={(e) => handleCheckbox(e)}
                            />
                            <>{checkedwmslayers.includes(categorylayer)}</>
                            <label>{categorylayer}</label>
                          </div>
                        </div>
                      );
                    })}
                  </>
                );
              });
            })}
        </section>
      </div>
    </div>
  );
};
