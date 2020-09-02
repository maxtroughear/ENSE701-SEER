import React from 'react';
import { Grid } from 'semantic-ui-react'

import style from './Platform.module.css';

function Platform(props) {
  const { columns, children } = props;

  return (
    <Grid columns={columns ? columns : null} className={style.platform} padded="horizontally">
      {children}
    </ Grid>
  );
}

export default Platform;
