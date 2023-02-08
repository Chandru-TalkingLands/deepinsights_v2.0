import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet'

export const LayoutDetails = ({getmapZoom}) => {
    const map = useMap()

    useEffect(() => {
      map.on('zoom',()=>{
        getmapZoom(map.getZoom())
        console.log(map.getZoom())
      })
    }, [])

  return (
    <div />
  )
}
