import {
  AppBar,
  Badge,
  Button,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router';

import { forceLogout } from '../services/interceptors';
import { DetailIntervento } from './DetailIntervento';
import { ListInterventi } from './ListInterventi';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    drawer: {
      flexShrink: 0,
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
  }),
);

const regioni = [
  {
    descrizione: 'Piemonte',
    province: [
      {
        descrizione: 'Torino',
        unreadCount: Math.floor(Math.random() * (5 - 1)) + 1,
      },
      {
        descrizione: 'Cuneo',
        unreadCount: Math.floor(Math.random() * (5 - 1)) + 1,
      },
    ],
    unreadCount: Math.floor(Math.random() * (15 - 6)) + 6,
  },
  {
    descrizione: 'Lombardia',
    province: [
      {
        descrizione: 'Milano',
        unreadCount: Math.floor(Math.random() * (5 - 1)) + 1,
      },
      {
        descrizione: 'Como',
        unreadCount: Math.floor(Math.random() * (5 - 1)) + 1,
      },
    ],
    unreadCount: Math.floor(Math.random() * (15 - 6)) + 6,
  },
  {
    descrizione: 'Liguria',
    province: [
      {
        descrizione: 'Genova',
        unreadCount: Math.floor(Math.random() * (5 - 1)) + 1,
      },
      {
        descrizione: 'Savona',
        unreadCount: Math.floor(Math.random() * (5 - 1)) + 1,
      },
    ],
    unreadCount: Math.floor(Math.random() * (15 - 6)) + 6,
  },
];

interface Props extends RouteComponentProps<any> {
  /* Parent component's props*/
}

// tslint:disable-next-line: function-name
function HomeBase({ history }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap={true}>
            HOME
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        // tslint:disable-next-line: jsx-no-multiline-js
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        {getRegioniMenu()}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Switch>
          <Route path="/list" component={ListInterventi} />
          <Route path="/detail" component={DetailIntervento} />
        </Switch>
      </main>
    </div>
  );

  function handleLogout() {
    forceLogout();
  }

  function getRegioniMenu() {
    return regioni.map(regione => (
      <List key={regione.descrizione}>
        <ListItem button={true} onClick={handleRegionClick}>
          <Badge color="primary" badgeContent={regione.unreadCount}>
            <ListItemText>{regione.descrizione}</ListItemText>
          </Badge>
        </ListItem>
        {getProvinceMenu(regione.province)}
      </List>
    ));
  }

  function getProvinceMenu(province: any[]) {
    return province.map(provincia => (
      <ListItem
        button={true}
        key={provincia.descrizione}
        onClick={handleProvinceClick}
      >
        <Badge color="primary" badgeContent={provincia.unreadCount}>
          <ListItemText>- {provincia.descrizione}</ListItemText>
        </Badge>
      </ListItem>
    ));
  }

  function handleRegionClick() {
    history.push('/list');
  }
  function handleProvinceClick() {
    history.push('/list');
  }
}

// tslint:disable-next-line: variable-name
export const Home = withRouter(HomeBase);
