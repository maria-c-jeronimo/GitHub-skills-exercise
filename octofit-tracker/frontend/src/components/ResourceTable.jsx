function ResourceTable({ title, description, columns, records, loading, error }) {
  return (
    <section>
      <div className="mb-4">
        <p className="mb-2 text-uppercase fw-semibold small text-success">
          OctoFit Tracker
        </p>
        <h1 className="page-heading display-5 fw-bold mb-2">{title}</h1>
        <p className="page-description mb-0">{description}</p>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card resource-card overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                {columns.map((column) => (
                  <th key={column.label} scope="col">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="text-center text-secondary py-5" colSpan={columns.length}>
                    <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                    Loading {title.toLowerCase()}...
                  </td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td className="text-center text-secondary py-5" colSpan={columns.length}>
                    No {title.toLowerCase()} to show yet.
                  </td>
                </tr>
              ) : (
                records.map((record, index) => (
                  <tr key={record._id || record.id || `${title}-${index}`}>
                    {columns.map((column) => (
                      <td key={column.label}>{column.value(record)}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default ResourceTable
