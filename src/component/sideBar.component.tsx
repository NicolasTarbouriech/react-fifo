import * as React from 'react';
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
import LogoutIcon from '@mui/icons-material/Logout';
import { isUserLogged } from "../service/jwt.service";
import { useContext } from "react";
import { AuthContext, ContextValue } from "../context/auth.context";

export default function SideBarComponent() {
  const auth: ContextValue | null = useContext(AuthContext);

  const userLogged = isUserLogged();

  const menuItems = [
    {
      label: 'Home',
      icon: <HomeIcon fontSize="small" />,
      path: '/'
    },
    {
      label: 'Sign up',
      icon: <PeopleAltIcon fontSize="small" />,
      path: '/sign-up'
    },
    ...(userLogged
      ? [
        {
          label: 'Queue',
          icon: <CreateIcon fontSize="small" />,
          path: '/action'
        },
        {
          label: 'Logout',
          icon: <LogoutIcon fontSize="small" />,
          path: '/',
          onClick: auth.onLogout
        }
      ]
      : [
        {
          label: 'Login',
          icon: <LoginIcon fontSize="small" />,
          path: '/login',
        }
      ])
  ];

  return (
    <Paper sx={{ width: '100%', height: '100%', margin: 0, padding: 0 }}>
      <MenuList sx={{ height: '100%', margin: 0, padding: 0 }}>
        {menuItems.map((item, index) => {
          const { label, icon, path, onClick } = item;
          return (
            <Link
              key={index}
              style={{ textDecoration: 'unset', color: 'unset' }}
              to={path}
              onClick={onClick}
            >
              <MenuItem>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{label}</ListItemText>
              </MenuItem>
            </Link>
          );
        })}
      </MenuList>
    </Paper>
  );
}
