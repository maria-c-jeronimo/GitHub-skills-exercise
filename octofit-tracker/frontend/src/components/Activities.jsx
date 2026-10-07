import { API_BASE_URL, fetchCollection } from '../api.js'
import { useCollection } from '../hooks/useCollection.js'
import ResourceTable from './ResourceTable.jsx'

const requestActivities = () =>
  fetchCollection(fetch(`${API_BASE_URL}/api/activities/`))

const columns = [
  {
    label: 'Member',
    value: (activity) =>
      activity.user?.displayName || activity.user?.username || 'Unknown member',
  },
  { label: 'Activity', value: (activity) => activity.activityType },
  { label: 'Duration', value: (activity) => `${activity.durationMinutes} min` },
  {
    label: 'Distance',
    value: (activity) =>
      activity.distanceKm == null ? '—' : `${activity.distanceKm} km`,
  },
  { label: 'Points', value: (activity) => activity.points },
  {
    label: 'Completed',
    value: (activity) =>
      activity.completedAt
        ? new Date(activity.completedAt).toLocaleDateString()
        : '—',
  },
]

function Activities() {
  const { records, loading, error } = useCollection(requestActivities)
  return (
    <ResourceTable
      columns={columns}
      description="A shared record of the effort that keeps your team moving."
      error={error}
      loading={loading}
      records={records}
      title="Activities"
    />
  )
}

export default Activities
