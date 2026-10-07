const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

if (codespaceName && !/^[a-z0-9-]+$/i.test(codespaceName)) {
  throw new Error(
    'VITE_CODESPACE_NAME may contain only letters, numbers, and hyphens.',
  )
}

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export async function fetchCollection(responsePromise) {
  const response = await responsePromise
  const body = await response.text()
  let payload

  try {
    payload = body ? JSON.parse(body) : null
  } catch {
    throw new Error(`The API returned an invalid response (HTTP ${response.status}).`)
  }

  if (!response.ok) {
    const detail =
      payload && typeof payload === 'object'
        ? payload.message || payload.error
        : null
    throw new Error(detail || `The API request failed (HTTP ${response.status}).`)
  }

  return getCollection(payload)
}

function getCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    throw new Error('The API response did not contain a collection.')
  }

  for (const key of ['results', 'items', 'data']) {
    if (Array.isArray(payload[key])) {
      return payload[key]
    }
  }

  if (payload.data && typeof payload.data === 'object') {
    return getCollection(payload.data)
  }

  throw new Error('The API response did not contain an array or paginated results.')
}
