import { API_BASE_URL, fetchCollection } from '../api.js'
import { useCollection } from '../hooks/useCollection.js'
import ResourceTable from './ResourceTable.jsx'

const requestWorkouts = () =>
  fetchCollection(fetch(`${API_BASE_URL}/api/workouts/`))

const columns = [
  { label: 'Workout', value: (workout) => workout.name },
  { label: 'Activity', value: (workout) => workout.activityType },
  { label: 'Difficulty', value: (workout) => workout.difficulty },
  { label: 'Duration', value: (workout) => `${workout.durationMinutes} min` },
  { label: 'Details', value: (workout) => workout.description },
]

function Workouts() {
  const { records, loading, error } = useCollection(requestWorkouts)
  return (
    <ResourceTable
      columns={columns}
      description="Choose a session that fits your goals and your day."
      error={error}
      loading={loading}
      records={records}
      title="Workouts"
    />
  )
}

export default Workouts
