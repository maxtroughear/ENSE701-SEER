import React, { useState } from 'react';
import { Card, Dimmer, Form, Grid, Header, Icon, Loader } from 'semantic-ui-react';

import Platform from './Platform';
import { useSubmitAPI } from '../useAPI';

function SubmitForm() {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [journal, setJournal] = useState('');
  const [year, setYear] = useState('');
  const [volume, setVolume] = useState('');
  const [number, setNumber] = useState('');
  const [pages, setPages] = useState('');
  const [month, setMonth] = useState('');
  const [doi, setDoi] = useState('');
  const [article, setArticle] = useState('');
  const [makeRequest, { data: results, loading }] = useSubmitAPI('/submit');

  function handleSubmit(e) {
    e.preventDefault();

    makeRequest({
      author,
      title,
      journal,
      year,
      volume,
      number,
      pages,
      month,
      doi,
      article
    });
    
    clearSubmit();
  }

  function clearSubmit() {
    setAuthor('');
    setTitle('');
    setJournal('');
    setYear('');
    setVolume('');
    setNumber('');
    setPages('');
    setMonth('');
    setDoi('');
    setArticle('');
  }
  return (
    <>
      <Platform>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1" textAlign="center">Submission</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
              <Form.Input fluid icon="author" placeholder="author..." onChange={(e) => setAuthor(e.target.value)} value={author} required/>
              <Form.Input fluid icon="title" placeholder="title..." onChange={(e) => setTitle(e.target.value)} value={title} required/>
              <Form.Input fluid icon="journal" placeholder="journal..." onChange={(e) => setJournal(e.target.value)} value={journal} required/>
              <Form.Input fluid icon="year" placeholder="year..." onChange={(e) => setYear(e.target.value)} value={year} required/>
              <Form.Input fluid icon="volume" placeholder="volume..." onChange={(e) => setVolume(e.target.value)} value={volume} required/>
              <Form.Input fluid icon="number" placeholder="number..." onChange={(e) => setNumber(e.target.value)} value={number} required/>
              <Form.Input fluid icon="pages" placeholder="pages..." onChange={(e) => setPages(e.target.value)} value={pages} required/>
              <Form.Input fluid icon="month" placeholder="month..." onChange={(e) => setMonth(e.target.value)} value={month} required/>
              <Form.Input fluid icon="doi" placeholder="doi..." onChange={(e) => setDoi(e.target.value)} value={doi} required/>
              <Form.Input fluid icon="article" placeholder="article..." onChange={(e) => setArticle(e.target.value)} value={article} required />
              </Form.Field>
              {results && (
                <p>Submitted!</p>
              )}
              <Form.Group>
                <Form.Button type="submit" >Submit</Form.Button>
                <Form.Button type="button" onClick={clearSubmit}>Clear</Form.Button>
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
     </Platform>      {/* results */}
    </>
  );
}

export default SubmitForm;
