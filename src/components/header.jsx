import React from 'react';
import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const StyledSettingsOutlinedIcon = styled(SettingsOutlinedIcon)`
  border: 1px solid;
  border-radius: 0.25rem;
  padding: 0.1rem;
`;

function Header() {
  return (
    <AppBar position="static">
      <StyledToolbar>
        <Typography variant="h6">LOGO</Typography>
        <StyledSettingsOutlinedIcon />
      </StyledToolbar>
    </AppBar>
  );
}

export default Header;
