"use client"
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import style from './custom.module.css'
import { Sidebar } from '@/components/Sidebar'
import { Mapcontainer } from '@/components/Mapcontainer'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [checkboxvalue,setcheckboxvalue] = useState()

  const getCheckboxvalue = (value)=>{
    setcheckboxvalue(value)
  }

  return (
    <main className={styles.main}>
      <div className={style.insightscontainer} >
        <Sidebar getCheckboxvalue={getCheckboxvalue}/>
        <Mapcontainer checkboxvalue={checkboxvalue}/>
      </div>
    </main>
  )
}
