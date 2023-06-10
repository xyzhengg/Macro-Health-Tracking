const { user } = useAuth()
  const { date, setDate } = useDate()
  const [calorieData, setCalorieData] = useState([])

  useEffect(() => {
    let date = new Date()
    let dateArray = []
    for (let i = 0; i < 7; i++) {
      dateArray.unshift({
      name: date.toDateString(),
      date: date.toISOString().split('T')[0],
      calories: 0
    })
    date = new Date(date.getTime() - 86400000)
    }
    setCalorieData([...dateArray])
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
              .gte('created_at', `${new Date(date.getTime() - 604800000).toISOString().split('T')[0]} 00:00:00`)
              .order('created_at', { ascending: true }),
            supabase
              .from('calories_out')
              .select('created_at, calories')
              .eq('user_id', user)
              .lte('created_at', `${date.toISOString().split('T')[0]} 23:59:59`)
              .gte('created_at', `${new Date(date.getTime() - 604800000).toISOString().split('T')[0]} 00:00:00`)
              .order('created_at', { ascending: true })
          ])
  
          if (diaryData.error || caloriesOutData.error) {
            console.log(diaryData.error || caloriesOutData.error)
          } else {
            // console.log(diaryData.data)
            // console.log(caloriesOutData.data)
            const updatedCalorieData = []
            for (let item of calorieData) {
              const diaryMatches = diaryData.data.filter(entry => {
                const entryDate = new Date(entry.created_at).toISOString().split('T')[0]
                return entryDate === item.date
              })
              let totalCalories = Math.round(item.calories)
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
            // console.log(updatedCalorieData)
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
    getCalorieTotals()
  }, [user, date])