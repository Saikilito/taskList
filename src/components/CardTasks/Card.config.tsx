import {
  CheckCircle,
  Warning,
  Dangerous,
  HourglassBottom,
} from '@mui/icons-material';

import { StatusObjectIconType } from './Card.type';

// To code
export const mappingObjectIcon = {
  Pending: <HourglassBottom style={{ margin: 'auto' }} color="primary" />,
  Urgently: <Warning style={{ margin: 'auto' }} color="warning" />,
  TimeOver: <Dangerous style={{ margin: 'auto' }} color="error" />,
  Finished: <CheckCircle style={{ margin: 'auto' }} color="success" />,
} as StatusObjectIconType;
