"use client";
import React, { useEffect, useState } from "react";
import style from "app/custom.module.css";
import axios from "axios";

export const Sidebar = (props) => {
  const [checkedwmslayers, setcheckedwmslayers] = useState([]);
  const [deepinsightsdata, setdeepinsightsdata] = useState([]);
  // const [checkedstate, setcheckedstate] = useState(new Array(4).fill(false));
  const [tempcheckvalue, settempcheckvalue] = useState(false);

  const handleCheckbox = (e, position) => {
    settempcheckvalue(e.target.checked);
    axios
      .post("http://localhost:4001/geo", { category: e.target.name })
      .then((res) => {
        let layername = res.data.data[0].name;
        // const updatedcheckbox = checkedstate.map((item, index) =>
        //   index === position ? !item : item
        // );
        // setcheckedstate(updatedcheckbox);
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
  console.log(checkedwmslayers);

  useEffect(() => {
    props.getCheckboxvalue(checkedwmslayers);
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
                        // checked={checkedstate[0]}
                        // onChange={(e) => handleCheckbox(e, 0)}
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
                              checked={
                                checkedwmslayers &&
                                checkedwmslayers.length > 0 &&
                                checkedwmslayers.map((z) => {
                                  if (z == categorylayer) {
                                    return true;
                                  } else {
                                    return false;
                                  }
                                })
                              }
                              // checked={tempcheckvalue}
                              name={categorylayer}
                              onChange={(e) => handleCheckbox(e, index)}
                            />
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
