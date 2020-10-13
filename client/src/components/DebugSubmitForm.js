import React, { useState } from 'react';
import { Card, Dimmer, Form, Grid, Header, Icon, Loader } from 'semantic-ui-react';

import Platform from './Platform';
import { useSubmitAPI } from '../useAPI';

import style from './SearchForm.module.css';

function SubmitForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [summary, setSummary] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());

  const [makeRequest, { data: results, loading }] = useSubmitAPI('/debugsubmit');

  function handleSearch(e) {
    e.preventDefault();

    makeRequest({
      title,
      year,
      author,
      category,
      summary,
    });
  }

  function clearForm() {
    setTitle('');
    setYear(new Date().getFullYear());
    setAuthor('');
    setCategory('');
    setSummary('');
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
              <Form.Field>
                <Form.Input
                  fluid
                  placeholder="Year"
                  onChange={(e) => setYear(e.target.value)}
                  value={year}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  fluid
                  placeholder="Author"
                  onChange={(e) => setAuthor(e.target.value)}
                  value={author}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  fluid
                  placeholder="Category"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                />
              </Form.Field>
              <Form.Field>
                <Form.TextArea
                  fluid
                  placeholder="Summary"
                  onChange={(e) => setSummary(e.target.value)}
                  value={summary}
                />
              </Form.Field>
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
