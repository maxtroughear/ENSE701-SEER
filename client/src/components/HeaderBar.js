import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Header } from 'semantic-ui-react'

import style from './HeaderBar.module.css';

function CustomFluidContainer(props) {
  const { children } = props;

  const style = {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '2rem',
    width: 'auto'
  }

  return (
    <div style={style}>{children}</div>
  )
}

function HeaderBar() {
  return (
    <CustomFluidContainer>
      <div className={style.navBar}>
        <Container>
          <Grid columns={4} >
            <Grid.Row>
              <Grid.Column>
                <Header textAlign="center" size="huge" className={style.headerLetter}>S</Header>
              </Grid.Column>
              <Grid.Column>
                <Header textAlign="center" size="huge" className={style.headerLetter}>E</Header>
              </Grid.Column>
              <Grid.Column>
                <Header textAlign="center" size="huge" className={style.headerLetter}>E</Header>
              </Grid.Column>
              <Grid.Column>
                <Header textAlign="center" size="huge" className={style.headerLetter}>R</Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header textAlign="center" size="small" className={style.headerText}>Software</Header>
              </Grid.Column>
              <Grid.Column>
                <Header textAlign="center" size="small" className={style.headerText}>Engineering</Header>
              </Grid.Column>
              <Grid.Column>
                <Header textAlign="center" size="small" className={style.headerText}>Evidence</Header>
              </Grid.Column>
              <Grid.Column>
                <Header textAlign="center" size="small" className={style.headerText}>Repository</Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Button as={Link} to="/" fluid>Search</Button>
              </Grid.Column>
              <Grid.Column>
                <Button as={Link} to="/submit" fluid>Submit</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    </CustomFluidContainer>
  )
}

export default HeaderBar;
