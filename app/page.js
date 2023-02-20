"use client";
// import { Inter } from '@next/font/google'
import styles from "./page.module.css";
import style from "./custom.module.css";
import { Sidebar } from "@/components/Sidebar";
import { Mapcontainer } from "@/components/Mapcontainer";
import { useEffect, useState } from "react";

export default function Home() {
  const [checkboxvalue, setcheckboxvalue] = useState();
  const [checkboxstatus, setcheckboxstatus] = useState();
  const [storezoomlevel,setstorezoomlevel] = useState()

  const getCheckboxvalue = (value,bounds) => {
    setcheckboxvalue({value,bounds});
  };
  const getcheckboxStatus = (value) => {
    setcheckboxstatus(value);
  };
  
  const getmapZoom = (zoom)=>{
    setstorezoomlevel(zoom)
  }

  return (
    <main className={styles.main}>
      <div className={style.insightscontainer}>
        <Mapcontainer
          checkboxvalue={checkboxvalue}
          checkboxstatus={checkboxstatus}
          getmapZoom={getmapZoom}
        />
        <Sidebar
          getCheckboxvalue={getCheckboxvalue}
          getcheckboxStatus={getcheckboxStatus}
        />
      </div>
    </main>
  );
}
