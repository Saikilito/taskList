import * as React from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

// Helpers
import { CONSTANT } from '../../common';

// My Types
import { DateAndTimePickerType } from './DataPicker.type';

// To Code
const { dateFormatComplete } = CONSTANT.general.dates;

function DateAndTimePicker({
  label,
  initValue,
  onChangeFunction,
}: DateAndTimePickerType) {
  const [value, setValue] = React.useState<Date | string>(initValue);
  const [changes, setChanges] = React.useState<number>(0);

  const handleChange = (newValue: Date | string) => {
    const selectedValue = moment(newValue);
    const now = moment();

    const selectedValueFormat = selectedValue.format(dateFormatComplete);

    if (now.isAfter(selectedValue) && changes === 2) {
      const errorMessage =
        ' No es una fecha valida, por favor, intente nuevamente';

      setChanges(0);
      return toast.error(selectedValueFormat + errorMessage);
    }

    setValue(newValue);
    setChanges((val) => val + 1);
    onChangeFunction('expiration', selectedValueFormat);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateMoment}>
      <Stack spacing={3}>
        <DateTimePicker
          label={label}
          inputFormat={dateFormatComplete}
          value={value}
          onChange={(val) => handleChange(val)}
          // minTime={value}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}

export { DateAndTimePicker };
