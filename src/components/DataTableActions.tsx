import { useNavigate } from 'react-router-dom'
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi'

interface DataTableActionsProps {
  id: number
  editPath?: string
  viewPath?: string
  onDelete?: (id: number) => void
  showView?: boolean
  showEdit?: boolean
  showDelete?: boolean
}

export default function DataTableActions({
  id,
  editPath,
  viewPath,
  onDelete,
  showView = false,
  showEdit = true,
  showDelete = true,
}: DataTableActionsProps) {
  const navigate = useNavigate()

  return (
    <div className="action-buttons">
      {showView && viewPath && (
        <button
          onClick={() => navigate(viewPath)}
          className="btn-icon btn-view"
          title="View"
        >
          <FiEye />
        </button>
      )}
      {showEdit && editPath && (
        <button
          onClick={() => navigate(editPath)}
          className="btn-icon btn-edit"
          title="Edit"
        >
          <FiEdit2 />
        </button>
      )}
      {showDelete && onDelete && (
        <button
          onClick={() => onDelete(id)}
          className="btn-icon btn-delete"
          title="Delete"
        >
          <FiTrash2 />
        </button>
      )}
    </div>
  )
}
