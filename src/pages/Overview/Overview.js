import React from 'react'
import AdminBarchart from '../../components/Charts/AdminBarchart'
import BookCurve from '../../components/Charts/BookCurve'
import style from './Overview.module.css'
import HiddenLegend from '../../components/Charts/ToChart'
import Recents from '../../components/Charts/Recents'
export const Overview = () => {
  return (
    <div style={{}} className={style.overviewContainer}>
      <div className={style.flexCont}>
      <section >
        <AdminBarchart/>

        </section>
        <section>
        <BookCurve/>

        </section>
      </div>
     
      <div className={style.flexCont}>
      <section>
        <HiddenLegend/>

        </section>
        <section>
<Recents/>
        </section>
      </div>
    


    </div>
  )
}
