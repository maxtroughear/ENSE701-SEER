import React, { useState } from 'react';
import { Card, Dimmer, Form, Grid, Header, Icon, Loader } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';

import Platform from './Platform';
import { useSubmitAPI } from '../useAPI';

import style from './SearchForm.module.css';

function DateField(props) {
  const { onDateChange, dateValue } = props;

  return (
    <Form.Group>
      <Form.Field>
        <label>Date</label>
        <DatePicker
          selected={dateValue}
          onChange={onDateChange}
          dateFormat="d/MM/yyyy"
        />
      </Form.Field>
    </Form.Group>
  );
}

function SubmitForm() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());

  const [makeRequest, { data: results, loading }] = useSubmitAPI('/debugsubmit');

  function handleSearch(e) {
    e.preventDefault();

    makeRequest({
      title,
      date
    });
  }

  function clearForm() {
    setTitle('');
    setDate(new Date());
  }

  function ResultsComponent() {
    if (loading) {
      return (
        <Dimmer active inverted>
          <Loader>Searching</Loader>
        </Dimmer>
      )
    }
    if (results == null) {
      return null;
    }
    return (
      <Card fluid key="submit-result">
        <Card.Content>
          <Card.Header>{results.title}</Card.Header>
          <Card.Meta><span className='date'>{results.date}</span></Card.Meta>
          <Card.Description>{<p>Result description</p>}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name='building' />
            Category: Programming
          </Card.Content>
        <Card.Content extra>
          <Icon name='user' />
            Author: Someone
          </Card.Content>
      </Card>
    );
  }

  return (
    <>
      <Platform>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1" textAlign="center">Debug Submit</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form onSubmit={handleSearch}>
              <Form.Field>
                <Form.Input
                  fluid
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </Form.Field>
              <DateField
                onDateChange={setDate}
                dateValue={date}
              />
              <Form.Group>
                <Form.Button type="submit">Submit</Form.Button>
                <Form.Button type="button" onClick={clearForm}>Clear</Form.Button>
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Platform>
      {/* results */}
      <Platform>
        <Grid.Row>
          <Grid.Column>
            <Header as="h3" textAlign="center">Data</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Card.Group centered className={style.results}>
              <ResultsComponent />
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Platform>
    </>
  );
}

export default SubmitForm;
