"use client";
// import { Inter } from '@next/font/google'
import styles from "./page.module.css";
import style from "./custom.module.css";
import { Sidebar } from "@/components/Sidebar";
import { Mapcontainer } from "@/components/Mapcontainer";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Demo } from "@/components/Demo";
import { SingleLayout } from "@/components/SingleLayout";

export default function Home() {
  const [checkboxvalue, setcheckboxvalue] = useState();
  const [checkboxstatus, setcheckboxstatus] = useState();
  const [storezoomlevel,setstorezoomlevel] = useState()

  const getCheckboxvalue = (value) => {
    setcheckboxvalue(value);
  };
  const getcheckboxStatus = (value) => {
    setcheckboxstatus(value);
  };
  
  const getmapZoom = (zoom)=>{
    setstorezoomlevel(zoom)
  }

  // const [loadComponent, setloadComponent] = useState(
  //   <Mapcontainer
  //     checkboxvalue={checkboxvalue}
  //     checkboxstatus={checkboxstatus}
  //     getmapZoom={getmapZoom}
  //   />
  // );

  // useEffect(() => {
  //   if (storezoomlevel > 16) {
  //     setloadComponent(<SingleLayout getmapZoom={getmapZoom} />);
  //   }
  //   return () => {
  //     setloadComponent(
  //       <Mapcontainer
  //         checkboxvalue={checkboxvalue}
  //         checkboxstatus={checkboxstatus}
  //         getmapZoom={getmapZoom}
  //       />
  //     );
  //   };
  // }, [storezoomlevel]);

  return (
    <main className={styles.main}>
      <div className={style.insightscontainer}>
        {/* {loadComponent} */}
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
