import React from 'react';
import Select  from '@mui/material/Select';
import MenuItem  from '@mui/material/MenuItem';
import FormControl  from '@mui/material/FormControl';
import InputLabel  from '@mui/material/InputLabel';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import NativeSelect from '@mui/material/NativeSelect';


const PaymasterSelect = ({selectedValue, setSelectedValue, handleSelectChange}: any) => {
    
      const dropdownMenuItemStyle = {
        '&:hover': {
          backgroundColor: '#2a2a2a', // Set the hover color
        },
      };
    
      return (
        <FormControl>
          <Select size='small'
            value={selectedValue}
            onChange={handleSelectChange}
            sx={{width:'130px', color:'white', flexDirection: 'row-reverse',}}
            inputProps={{
                MenuProps: {
                    MenuListProps: {
                        sx: {
                            backgroundColor: '#2a2a2a',
                            '&:hover': '#fefdf9',
                            borderRadius:'1px',
                            color:'white',
                            fontSize:'12px',
                            borderColor: 'white',
                        }
                    }
                }
            }}
        
          >
            <MenuItem sx={dropdownMenuItemStyle} value="gastank">
              Gas Tank
            </MenuItem>
            <MenuItem sx={dropdownMenuItemStyle} value="matic">
              MATIC
            </MenuItem>
          </Select>
        </FormControl>
      );
    };
    

export default PaymasterSelect;
