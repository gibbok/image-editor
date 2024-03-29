import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import React from 'react';

type LayoutProps = React.PropsWithChildren<{ title: string }>;

export const Layout = ({ title, children }: LayoutProps) => (
  <Grid container>
    <Grid item xs={12}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Grid>
    <Grid item xs={12} mt={8} pl={3} pt={1.5} pr={3}>
      {children}
    </Grid>
  </Grid>
);
