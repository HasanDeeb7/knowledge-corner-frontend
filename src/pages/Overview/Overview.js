import React from 'react'
import AdminBarchart from '../../components/Charts/AdminBarchart'
import BookCurve from '../../components/Charts/BookCurve'
import style from './Overview.module.css'
export const Overview = () => {
  return (
    <div style={{}} className={style.overviewContainer}>
        <section >
        <AdminBarchart/>

        </section>
        <section>
        <BookCurve/>

        </section>


    </div>
  )
}
