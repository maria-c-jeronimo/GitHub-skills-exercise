import { API_BASE_URL, fetchCollection } from '../api.js'
import { useCollection } from '../hooks/useCollection.js'
import ResourceTable from './ResourceTable.jsx'

const requestTeams = () =>
  fetchCollection(fetch(`${API_BASE_URL}/api/teams/`))

const columns = [
  { label: 'Team', value: (team) => team.name },
  { label: 'About', value: (team) => team.description },
  {
    label: 'Members',
    value: (team) =>
      Array.isArray(team.members) ? team.members.length : 0,
  },
  { label: 'Points', value: (team) => team.totalPoints },
]

function Teams() {
  const { records, loading, error } = useCollection(requestTeams)
  return (
    <ResourceTable
      columns={columns}
      description="Find your crew and make progress together."
      error={error}
      loading={loading}
      records={records}
      title="Teams"
    />
  )
}

export default Teams
