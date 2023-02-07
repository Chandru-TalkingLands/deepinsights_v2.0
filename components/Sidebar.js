"use client";
import React, { useEffect, useState } from "react";
import style from "app/custom.module.css";
import { dummylayers } from "./demolayers";
import axios from "axios";

export const Sidebar = (props) => {
  const [checkedwmslayers, setcheckedwmslayers] = useState([]);
  const [checkedstate, setcheckedstate] = useState(
    new Array(dummylayers.length).fill(false)
  );
  const handleCheckbox = (e, position) => {
    let layername = e.target.name ;
    const updatedcheckbox = checkedstate.map((item, index) =>
      index === position ? !item : item
    );
    setcheckedstate(updatedcheckbox);
    props.getcheckboxStatus(e.target.checked)
    if (e.target.checked && checkedwmslayers.includes(layername) == false) {
      setcheckedwmslayers(prev =>{
        return([...prev,layername])
    })
      return;
    }
    let layerindex = checkedwmslayers.indexOf(layername)
    if(layerindex > -1){
      checkedwmslayers.splice(layerindex,1)
    }
    setcheckedwmslayers(prev =>(
      [...prev]
  ))
  };

  useEffect(() => {
    props.getCheckboxvalue(checkedwmslayers)
  }, [checkedwmslayers])

  useEffect(()=>{
    axios.get('https://devapi.talkinglands.com/dev/geo/contains?lng=77.53430960253098&lat=12.452717690170857&projectId=HC-DHN')
    .then((res)=>{
      console.log(res)
    })
    .catch(()=>console.log(err))
  },[])
  
  return (
    <div className={style.sidebarcontainer}>
      <section className={style.insightsheader}>
        <button disabled={true}>Filters</button>
        <button>Insights</button>
      </section>

      <div className={style.insightdetails}>
        <p>Regional Insights</p>
        <section className={style.checkboxContainer}>
          {/* <div className={style.checkboxheadContainer}>
            <input
              type="checkbox"
              checked={checkedstate[0]}
              onChange={(e) => handleCheckbox(e, 0)}
            />
            <label>Point of Intrest</label>
          </div> */}
          <div className={style.checkboxsubContainer}>
            {dummylayers.map((lay, index) => {
              return (
                <div className={style.checkboxheadContainer} key={index}>
                  <input
                    type="checkbox"
                    checked={checkedstate[index]}
                    name={lay.value}
                    onChange={(e) => handleCheckbox(e, index)}
                  />
                  <label>{lay.name}</label>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
