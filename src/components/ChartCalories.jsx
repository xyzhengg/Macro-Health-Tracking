import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography } from "@mui/material"
import { useAuth } from '../contexts/AuthProvider'
import { useState, useEffect } from 'react';
import { supabase } from "../supabaseAuth/supabaseClient"
import { useDate } from '../contexts/DateProvider';

export default function ChartCalories () {

  const { user } = useAuth()
  const { date, setDate } = useDate()
  const [calorieData, setCalorieData] = useState([])

  useEffect(() => {
    document.body.style.zoom = "80%";
  }, [])

  useEffect(() => {
    let date = new Date()
    let dateArray = []
    for (let i = 0; i < 7; i++) {
      dateArray.unshift({
      name: date.toDateString(),
      date: date.toISOString().split('T')[0],
      caloriesIn: 0
    })
    date = new Date(date.getTime() - 86400000)
    }
    setCalorieData([...dateArray])
    // console.log([...dateArray])
    // console.log(dateArray)
  }, [])

  useEffect(() => {
    const getCalorieTotals = async () => {
      let date = new Date()
      try {
        if (user && calorieData.length > 0) {
          const [diaryData, caloriesOutData] = await Promise.all([
            supabase
              .from('diary')
              .select('created_at, calories')
              .eq('user_id', user)
              .lte('created_at', `${date.toISOString().split('T')[0]} 23:59:59`)
              .gte('created_at', `${new Date(date.getTime() - 518400000).toISOString().split('T')[0]} 00:00:00`)
              .order('created_at', { ascending: true }),
            supabase
              .from('calories_out')
              .select('created_at, calories')
              .eq('user_id', user)
              .lte('created_at', `${date.toISOString().split('T')[0]} 23:59:59`)
              .gte('created_at', `${new Date(date.getTime() - 518400000).toISOString().split('T')[0]} 00:00:00`)
              .order('created_at', { ascending: true })
          ])
          // console.log(`${date.toISOString().split('T')[0]} 23:59:59`)
          // console.log(`${new Date(date.getTime() - 518400000).toISOString().split('T')[0]} 00:00:00`)
          if (diaryData.error || caloriesOutData.error) {
            console.log(diaryData.error || caloriesOutData.error)
          } else {
            // console.log(caloriesOutData.data)
            console.log(diaryData.data)
            const updatedCalorieData = []
            for (let item of calorieData) {
              const diaryMatches = diaryData.data.filter(entry => {
                const entryDate = entry.created_at.split('T')[0]
                return entryDate === item.date
              })
              let totalCalories = Math.round(item.caloriesIn)
              for (let i = 0; i < diaryMatches.length; i++) {
                totalCalories += diaryMatches[i].calories
              }
              const caloriesOutMatch = caloriesOutData.data.find(entry => entry.created_at === item.date)
              updatedCalorieData.push({...item,
                caloriesIn: Math.round(totalCalories),
                caloriesOut: caloriesOutMatch ? caloriesOutMatch.calories : null
              })
            }
  
            setCalorieData(updatedCalorieData)
            console.log(updatedCalorieData)
          }
        }
      } catch (err) {
        console.log(err)
      }
    };
  
    getCalorieTotals()
  }, [user, date])
  
  return (
    <>
      <div style={{margin: "20px auto"}}>
        <Typography variant="h5" style={{ textAlign: "center" }}>Calories Comparison</Typography>
        <div style={{ width: "100%", padding: "30px", maxWidth: "1000px", margin: "20px auto"}}>
          <ResponsiveContainer height={300}>
            <BarChart data={calorieData}>
              <CartesianGrid />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="caloriesIn" fill="#9b658d" />
                <Bar dataKey="caloriesOut" fill="#7e88ab" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </> 
  )
}


//https://www.javascripttutorial.net/es6/javascript-promise-all/
