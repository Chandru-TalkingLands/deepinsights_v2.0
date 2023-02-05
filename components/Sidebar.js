"use client"
import React, { useState } from 'react'
import style from 'app/custom.module.css'

export const Sidebar = (props) => {
    const [checkboxvalue,setcheckboxvalue] = useState(false)

    const handleCheckbox = (e)=>{
        setcheckboxvalue(!checkboxvalue)
        props.getCheckboxvalue(!checkboxvalue)
    }
  return (
    <div className={style.sidebarcontainer}>
            <section className={style.insightsheader}>
                <button disabled={true}>Filters</button>
                <button>Insights</button>
            </section>

            <div className={style.insightdetails}>
                <p>Regional Insights</p>
                <section className={style.checkboxContainer}>
                 <input type="checkbox" value={checkboxvalue} onChange={handleCheckbox}/>
                 <label>Madhugiri Taluk</label>
                </section>
            </div>
    </div>
  )
}
