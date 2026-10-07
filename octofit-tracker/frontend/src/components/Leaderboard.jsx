import { API_BASE_URL, fetchCollection } from '../api.js'
import { useCollection } from '../hooks/useCollection.js'
import ResourceTable from './ResourceTable.jsx'

const requestLeaderboard = () =>
  fetchCollection(fetch(`${API_BASE_URL}/api/leaderboard/`))

const columns = [
  { label: 'Rank', value: (entry) => `#${entry.rank}` },
  { label: 'Period', value: (entry) => entry.period },
  {
    label: 'Competitor',
    value: (entry) =>
      entry.user?.displayName ||
      entry.user?.username ||
      entry.team?.name ||
      'Unknown competitor',
  },
  { label: 'Points', value: (entry) => entry.points },
]

function Leaderboard() {
  const { records, loading, error } = useCollection(requestLeaderboard)
  return (
    <ResourceTable
      columns={columns}
      description="Celebrate the people and teams earning points this week."
      error={error}
      loading={loading}
      records={records}
      title="Leaderboard"
    />
  )
}

export default Leaderboard
