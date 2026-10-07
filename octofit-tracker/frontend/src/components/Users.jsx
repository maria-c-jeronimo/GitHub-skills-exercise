import { API_BASE_URL, fetchCollection } from '../api.js'
import { useCollection } from '../hooks/useCollection.js'
import ResourceTable from './ResourceTable.jsx'

const requestUsers = () =>
  fetchCollection(fetch(`${API_BASE_URL}/api/users/`))

const columns = [
  {
    label: 'Member',
    value: (user) => user.displayName || user.username,
  },
  { label: 'Username', value: (user) => user.username },
  { label: 'Email', value: (user) => user.email },
  { label: 'Team', value: (user) => user.team?.name || 'Not on a team' },
  { label: 'Points', value: (user) => user.totalPoints },
]

function Users() {
  const { records, loading, error } = useCollection(requestUsers)
  return (
    <ResourceTable
      columns={columns}
      description="Meet the community and see how everyone is progressing."
      error={error}
      loading={loading}
      records={records}
      title="Users"
    />
  )
}

export default Users
