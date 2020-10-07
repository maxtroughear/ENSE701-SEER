import React, { useState } from 'react';
import { Accordion, Card, Dimmer, Form, Grid, Header, Icon, Loader } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';

import Platform from './Platform';
import { useLazyAPI } from '../useAPI';

import style from './SearchForm.module.css';

function DateFields(props) {
  const { onFromDateChange, onToDateChange, fromDateValue, toDateValue } = props;

  function handleChangeFrom(date) {
    onFromDateChange(date)
  }

  function handleChangeTo(date) {
    onToDateChange(date);
    return (
      <Form.Group>
        <Form.Field>
          <label>From</label>
          <DatePicker
            selected={fromDateValue}
            onChange={handleChangeFrom}
            dateFormat="d/MM/yyyy"
          />
        </Form.Field>
        <Form.Field>
          <label>To</label>
          <DatePicker
            selected={toDateValue}
            onChange={handleChangeTo}
            dateFormat="d/MM/yyyy"
          />
        </Form.Field>
      </Form.Group>
    );
  }
}

function SubmitForm() {
  const [activeIndex, setActiveIndex] = useState(-1);

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
  const [makeRequest, { data: results, loading }] = useLazyAPI();

  function handleClick(e, titleProps) {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index

    setActiveIndex(newIndex);
  }

  function handleSearch(e) {
    e.preventDefault();
    let query = `title=${title}&date=${JSON.stringify(

    )}`;

    makeRequest(`/search?${query}`);
  }

  function clearSearch() {
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
    return results.map((r, index) => {
      return (
        <Card fluid key={"search-results-" + index}>
          <Card.Content header={r.title} />
          <Card.Content description={<p>Result description</p>} />
          <Card.Content extra>
            <Icon name='user' />
            Author: 'Someone'
          </Card.Content>
        </Card>
      );
    });
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
            <Form onSubmit={handleSearch}>
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
              <p>{author}</p>
              <p>{title}</p>
              <p>{journal}</p>
              <p>{year}</p>
              <p>{volume}</p>
              <p>{number}</p>
              <p>{pages}</p>
              <p>{month}</p>
              <p>{doi}</p>
              <p>{article}</p>
              <Form.Group>
                <Form.Button type="submit">Search</Form.Button>
                <Form.Button type="button" onClick={clearSearch}>Clear</Form.Button>
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
     </Platform>      {/* results */}
    </>
  );
}

export default SubmitForm;
