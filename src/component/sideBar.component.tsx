import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LoginIcon from '@mui/icons-material/Login';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CreateIcon from '@mui/icons-material/Create';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

export default function IconMenu() {
  return (
    <Paper sx={ {width: '100%', height: '100%', margin: 0, padding: 0} }>
      <MenuList sx={ {height: '100%', margin: 0, padding: 0} }>
        <Link style={ {textDecoration: 'unset', color: 'unset'} } to={ '/' }>
          <MenuItem>
            <ListItemIcon>
              <HomeIcon fontSize="small"/>
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </MenuItem>
        </Link>
        <Link style={ {textDecoration: 'unset', color: 'unset'} } to={ '/create-user' }>
          <MenuItem>
            <ListItemIcon>
              <PeopleAltIcon fontSize="small"/>
            </ListItemIcon>
            <ListItemText>Create user</ListItemText>
          </MenuItem>
        </Link>
        <MenuItem>
          <ListItemIcon>
            <CreateIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Queue</ListItemText>
        </MenuItem>
        <Divider/>
        <Link style={ {textDecoration: 'unset', color: 'unset'} } to={ '/login' }>
          <MenuItem>
            <ListItemIcon>
              <LoginIcon fontSize="small"/>
            </ListItemIcon>
            <ListItemText>Login</ListItemText>
          </MenuItem>
        </Link>
      </MenuList>
    </Paper>
  );
}
