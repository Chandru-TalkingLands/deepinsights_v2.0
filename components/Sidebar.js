"use client";
import React, { useEffect, useState } from "react";
import style from "app/custom.module.css";
import axios from "axios";

export const Sidebar = (props) => {
  const [checkedwmslayers, setcheckedwmslayers] = useState([]);
  // const [deepinsightsdata, setdeepinsightsdata] = useState([]);
  const [checkedstate, setcheckedstate] = useState(new Array(4).fill(false));

  const handleCheckbox = (e, position) => {
    let layername;
    axios.get("http://localhost:4000")
      .then((res) => {
        layername = res.data.data[0].name ;
      })
      .catch((err) => console.log(err));
    const updatedcheckbox = checkedstate.map((item, index) =>
      index === position ? !item : item
    );
    setcheckedstate(updatedcheckbox);
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
  };

  useEffect(() => {
    props.getCheckboxvalue(checkedwmslayers);
  }, [checkedwmslayers]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://devapi.talkinglands.com/dev/geo/contains?lng=77.53430960253098&lat=12.452717690170857&projectId=HC-DHN"
  //     )
  //     .then((res) => {
  //       setdeepinsightsdata(res.data.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div className={style.sidebarcontainer}>
      <section className={style.insightsheader}>
        <button disabled={true}>Filters</button>
        <button>Insights</button>
      </section>

      <div className={style.insightdetails}>
        <p>Regional Insights</p>
        <section className={style.checkboxContainer}>
          {dummychiru.data &&
            dummychiru.data.length > 0 &&
            dummychiru.data.map((layobject) => {
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
                              checked={checkedstate[index]}
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
