// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useState, useEffect } from 'react';
// import { useDate } from '../contexts/DateProvider';
// import { supabase } from "../supabaseAuth/supabaseClient"
// import { useAuth } from '../contexts/AuthProvider';
// import { ConstructionOutlined, LocalConvenienceStoreOutlined } from '@mui/icons-material';

import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: null,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

class ChartWeightLine extends PureComponent {
  render() {

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line connectNulls={true} type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

//   const { date } = useDate()
//   const { user } = useAuth()
//   const [weightData, setWeightData] = useState([])

//   useEffect(() => {
//     if (date) {
//       let endDate = date
//       let dateArray = []

//       for (let i = 0; i < 7; i++) {
//         dateArray.push({
//           name: endDate.toDateString(),
//           date: endDate.toISOString().split('T')[0]
//         })
//         endDate = new Date(endDate.getTime() - 86400000)
//       }

//       setWeightData([...dateArray])
//       console.log(dateArray)
//     }
//   }, [date])

//   useEffect(() => {
//     const getWeightData = async () => {
//       try {
//         if (date && user && weightData) {
//           const { data, error } = await supabase
//             .from('weight')
//             .select('created_at, kg')
//             .eq('user_id', user)
//             .lte('created_at', date.toISOString())
//             .gte(
//               'created_at',
//               new Date(date.getTime() - 604800000).toISOString()
//             )
//             .order('created_at', { ascending: true })

//           if (error) {
//             console.log(error)
//           } else if (data) {
//             console.log(data)
//             const updatedWeightData = []
//             for (let item of weightData) {
//               // console.log(item)
//               const match = data.filter(
//                 entry => entry.created_at === item.date
//               )
//               // console.log(match)
//               updatedWeightData.push(
//                 match.length > 0 ? { ...item, kg: match[0].kg } : {...item, kg: null }
//               )
//             }
//             setWeightData(updatedWeightData)
//             console.log(updatedWeightData)
//           } else {
//             const emptyWeightData = weightData.map(item => ({...item, kg: null}))
//             setWeightData(emptyWeightData)
//             console.log(emptyWeightData)
//           }
//         }
//       } catch (err) {
//         console.log(err)
//       }
//     }
//     getWeightData()
//   }, [date, user])

//   return (
//     <>
//     <ResponsiveContainer>
//       <LineChart width={730} height={250} data={weightData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line connectNulls={true} type="monotone" dataKey="weight" stroke="#8884d8" />
//       </LineChart>
//     </ResponsiveContainer>
//     </>
//   )
// }

export default ChartWeightLine