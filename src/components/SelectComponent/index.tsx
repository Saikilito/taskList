import * as React from 'react';
import { Box, InputLabel, MenuItem, FormControl } from '@mui/material/';

import Select from '@mui/material/Select';

import { SelectComponentType } from './SelectComponent.type';

export function SelectComponent({
  name,
  externalValue,
  options,
  selectTitle,
  externalHandleChange,
}: SelectComponentType) {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{selectTitle}</InputLabel>
        <Select
          name={name}
          labelId="demo-simple-select-label"
          value={externalValue}
          label="name"
          onChange={externalHandleChange}
        >
          {options.length &&
            options.map(({ value, name }) => (
              <MenuItem key={value} value={value}>
                {name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
