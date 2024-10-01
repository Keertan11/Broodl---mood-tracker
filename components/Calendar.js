'use client'
import React, { useState } from 'react'
import { gradients, baseRating } from '@/utils'
import { Fugaz_One } from 'next/font/google'
const Fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' }
const monthsArr = Object.keys(months)
const dayList = ['Sun', 'Mon', 'Tues', 'Wed', 'Thrus', 'Fri', 'Sat']

const Calendar = (props) => {
  const { demo, completeData, handleSetMood } = props

  const now = new Date()
  const currMonth = now.getMonth()
  const [selectedMonth, setSelectedMonth] = useState(Object.keys(months)[currMonth])
  const [selectedYear, setSelectedYear] = useState(now.getFullYear())

  const monthNow = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth), 1)
  const firstDayOfMonth = monthNow.getDay()
  const daysInMonth = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth) + 1, 0).getDate()

  const numericMonth = monthsArr.indexOf(selectedMonth)
  const data = completeData?.[selectedYear]?.[numericMonth] || {}

  function handleIncreamentMonth(val) {
    if (numericMonth + val < 0) {
      setSelectedYear(curr => curr - 1)
      setSelectedMonth(monthsArr[monthsArr.length - 1])

    } else if (numericMonth + val > 11) {
      setSelectedYear(curr => curr + 1)
      setSelectedMonth(monthsArr[0])

    } else {
      setSelectedMonth(monthsArr[numericMonth + val])
    }
  }

  const daysToDisplay = firstDayOfMonth + daysInMonth
  const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0)

  return (
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-5 gap-4'>
        <button onClick={()=>{
          handleIncreamentMonth(-1)}} className='mr-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60'><i className="fa-solid fa-circle-chevron-left"></i></button>
        <p className={'text-center col-span-3 capitalize whitespace-nowrap textGradient ' + Fugaz.className }>{selectedMonth}, {selectedYear}</p>
        <button onClick={()=>{handleIncreamentMonth(1)}} className='ml-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60'><i className="fa-solid fa-circle-chevron-right"></i></button>
      </div>
      <div className='flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10'>
        {[...Array(numRows + 1).keys()].map((row, rowIndex) => {
          return (
            <div key={rowIndex} className='grid grid-cols-7 gap-1 '>
              {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                if (row === 0) {
                  return (
                    <div key={dayOfWeekIndex} className='text-indigo-400 truncate mx-auto'>{dayOfWeek}</div>
                  )
                }

                let dayIndex = ((rowIndex - 1) * 7) + dayOfWeekIndex - (firstDayOfMonth - 1)
                let dayDisplay = dayIndex > daysInMonth ? false : (row === 1 && dayOfWeekIndex < firstDayOfMonth) ? false : true
                let isToday = dayIndex === now.getDate()

                if (!dayDisplay) {
                  return (
                    <div key={dayOfWeekIndex} className='bg-white ' />
                  )
                }

                let color = demo ? gradients.indigo[baseRating[dayIndex]] : dayIndex in data ? gradients.indigo[data[dayIndex]] : 'white'
                return (
                  <div style={{ background: color }} className={'text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-center rounded-lg ' + (isToday ? ' text-indigo-400' : ' text-indigo-100') + (color === 'white' ? ' text-indigo-400' : ' text-white')} key={dayOfWeekIndex}>
                    <p>{dayIndex}</p>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar
