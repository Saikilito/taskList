import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import {
  DeleteForever,
  Edit,
  CheckCircle,
  Warning,
  Dangerous,
  HourglassBottom,
} from '@mui/icons-material';

import { StatusObjectIconType } from './CardInfo.type';

// To code
const objectIcon = {
  Pending: () => <HourglassBottom style={{ margin: 'auto' }} color="primary" />,
  Urgently: () => <Warning style={{ margin: 'auto' }} color="warning" />,
  TimeOver: () => <Dangerous style={{ margin: 'auto' }} color="error" />,
  Finished: () => <CheckCircle style={{ margin: 'auto' }} color="success" />,
} as StatusObjectIconType;

const columns = [
  {
    field: 'id',
    hide: true,
  },
  {
    field: 'expiration',
    headerName: 'Expiration',
    disableColumnMenu: true,
    headerAlign: 'center',
    width: 200,
    type: 'date',
    sortable: false,
    description: 'This has a value of expiration date about the task.',
  },
  {
    field: 'task',
    headerName: 'Task',
    disableColumnMenu: true,
    headerAlign: 'center',
    flex: true,
    width: 420,
    sortable: false,
    description: 'This has a description about task.',
  },
  {
    field: 'status',
    headerName: 'Status',
    headerAlign: 'center',
    disableColumnMenu: true,
    width: 70,
    sortable: false,
    description: 'This has a status value about task.',
    renderCell: (params: GridValueGetterParams) =>
      objectIcon[params.row.status](),
  },
  {
    field: 'edit',
    headerName: 'Edit',
    disableColumnMenu: true,
    headerAlign: 'center',
    width: 70,
    sortable: false,
    description: 'Click for edit task.',
    renderCell: () => <Edit style={{ margin: 'auto', cursor: 'pointer' }} />,
  },
  {
    field: 'delete',
    headerName: 'Delete',
    disableColumnMenu: true,
    headerAlign: 'center',
    width: 70,
    sortable: false,
    description: 'This has a status value about task.',
    renderCell: () => (
      <DeleteForever style={{ margin: 'auto', cursor: 'pointer' }} />
    ),
  },
] as GridColDef[];

export const dataGridProps = {
  columns,
  autoHeight: true,
  rowsPerPageOptions: [5],
  checkboxSelection: true,
  getRowId: (row: any) => row.id,
  getRowClassName: (params: any) => `row-${params.row.status}`,
};
