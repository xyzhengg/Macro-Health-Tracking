import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { useDate } from '../contexts/DateProvider';
import { supabase } from "../supabaseAuth/supabaseClient"
import { useAuth } from '../contexts/AuthProvider';
import { Typography } from "@mui/material"


export default function ChartWeightLine() {

  const { date, setDate } = useDate()
  const { user } = useAuth()
  const [weightData, setWeightData] = useState([])

  useEffect(() => {
    if (date) {
      let endDate = date
      let dateArray = []

      for (let i = 0; i < 7; i++) {
        dateArray.unshift({
          name: endDate.toDateString(),
          date: endDate.toISOString().split('T')[0]
        })
        endDate = new Date(endDate.getTime() - 86400000)
      }

      setWeightData([...dateArray])
      // console.log(dateArray)
    }
  }, [date])

  useEffect(() => {
    const getWeightData = async () => {
      try {
        if (date && user && weightData.length > 0) {
          const { data, error } = await supabase
            .from('weight')
            .select('created_at, kg')
            .eq('user_id', user)
            .lte('created_at', date.toISOString())
            .gte('created_at', new Date(date.getSeconds() - 604800000).toISOString()
            )
            .order('created_at', { ascending: true })

          if (error) {
            console.log(error)
          } else if (data) {
            // console.log(data)
            const updatedWeightData = []
            for (let item of weightData) {
              // console.log(item)
              const match = data.filter(
                entry => entry.created_at === item.date
              )
              // console.log(match)
              updatedWeightData.push(
                match.length > 0 ? { ...item, kg: match[0].kg } : {...item, kg: null }
              )
            }
            setWeightData(updatedWeightData)
            // console.log(updatedWeightData)
          } 
          // else {
          //   const emptyWeightData = weightData.map(item => ({...item, kg: null}))
          //   setWeightData(emptyWeightData)
          //   console.log(emptyWeightData)
          // }
        }
      } catch (err) {
        console.log(err)
      }
    }
    getWeightData()
  }, [user, date])

  return (
    <>
    {weightData.length > 0 && (
      <div style={{margin: "20px auto"}}>
        <Typography variant="h5" style={{ textAlign: "center" }}>Weekly Weight Trend</Typography>
        <div style={{ width: "100%", padding: "30px", maxWidth: "1000px", margin: "20px auto" }}>
          <ResponsiveContainer height={300}>
            <LineChart data={weightData}>
              <CartesianGrid />
              <Line connectNulls={true} type="monotone" dataKey="kg" />
              <XAxis axisLine={false} tickLine={false} dataKey="name" />
              <YAxis axisLine={false} tickLine={false} dataKey="kg" />
              <Tooltip />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      )}
    </>
  )
}

//https://codesandbox.io/s/dank-sun-5kqkri?file=/src/App.tsx