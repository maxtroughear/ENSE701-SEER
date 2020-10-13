import React, { useState } from 'react';
import { Card, Form, Grid, Header, Icon } from 'semantic-ui-react';

import Platform from './Platform';
import { useLazyAPI } from '../useAPI';

import style from './SearchForm.module.css';

const subjectOptions = [
  { key: 'title', text: 'Title', value: 'title' },
  { key: 'author', text: 'Author', value: 'author' },
  { key: 'year', text: 'Year', value: 'year' },
  { key: 'category', text: 'Category', value: 'category' },
];

const filterOptions = [
  { key: 'like', text: 'Like', value: '$regex' },
  { key: 'equal', text: '=', value: '$eq' },
  { key: 'gte', text: '>', value: '$gte' },
  { key: 'lte', text: '<', value: '$lte' },
];

const initialFields = [
  {
    value: '',
    filter: '$regex',
    subject: 'title'
  }
]

function SearchForm() {
  const [fields, setFields] = useState(initialFields);

  const [makeRequest, { data: results, loading }] = useLazyAPI();

  function handleSearch(e) {
    e.preventDefault();

    let query = {};

    fields.forEach((field) => {
      let tempField = query[field.subject] || {};

      tempField[field.filter] = field.value;

      // special case for regular expression, make the regular expression ignore case
      if (field.filter === '$regex') {
        tempField = {
          ...tempField,
          $options: 'i'
        }
      }

      query[field.subject] = tempField;
    });

    console.log(query);

    makeRequest(`/search?query=${JSON.stringify(query)}`);
  }

  function clearSearch() {
    setFields(initialFields);
  }

  function Fields() {
    return fields.map((field, index) => {
      return (
        <Form.Group key={`field - ${index} `} width="16">
          <Form.Dropdown
            key={`field - subject - ${index} `}
            label="Subject"
            width="4"
            search
            selection
            options={subjectOptions}
            onChange={(e, data) => handleSubjectChange(index, data)}
            value={field.subject}
            fluid
          />
          <Form.Dropdown
            key={`field - filter - ${index} `}
            label="Filter"
            width="2"
            search
            selection
            options={filterOptions}
            onChange={(e, data) => handleFilterChange(index, data)}
            value={field.filter}
            fluid
          />
          <Form.Input
            key={`field - value - ${index} `}
            label="Value"
            placeholder={field.name}
            width="8"
            onChange={(e, data) => handleValueChange(index, data)}
            value={field.value}
          />
          <Form.Button label="Remove" type="button" onClick={() => removeField(index)} width="2" fluid><Icon name="trash" /></Form.Button>
        </Form.Group>
      );
    });
  }

  function handleSubjectChange(index, { value }) {
    setFields((previousFields) => previousFields.map((field, fieldIndex) => {
      if (fieldIndex === index) {
        return {
          ...field,
          subject: value,
        }
      }
      return field;
    }))
  };

  function handleFilterChange(index, { value }) {
    setFields((previousFields) => previousFields.map((field, fieldIndex) => {
      if (fieldIndex === index) {
        return {
          ...field,
          filter: value,
        }
      }
      return field;
    }))
  };

  function handleValueChange(index, { value }) {
    setFields((previousFields) => previousFields.map((field, fieldIndex) => {
      if (fieldIndex === index) {
        return {
          ...field,
          value: value,
        }
      }
      return field;
    }))
  };

  function addField() {
    setFields((previousFields) => [
      ...previousFields,
      {
        value: '',
        filter: '',
        subject: '',
      }
    ]);
  }

  function removeField(index) {
    setFields((previousFields) => {
      return previousFields.filter((_, fieldIndex) => {
        return fieldIndex !== index;
      })
    });
  }

  function ResultsComponent() {
    // if (loading) {
    //   return (
    //     <Dimmer active inverted>
    //       <Loader>Searching</Loader>
    //     </Dimmer>
    //   )
    // }
    if (results == null) {
      return null;
    }
    return results.map((r, index) => {
      return (
        <Card fluid key={"search-results-" + index}>
          <Card.Content>
            <Card.Header>{r.title}</Card.Header>
            <Card.Meta><span className='date'>{r.year || 'Unknown'}</span></Card.Meta>
            <Card.Description>{<p>{r.summary}</p>}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name='building' />
            Category: {r.category || 'Unknown'}
          </Card.Content>
          <Card.Content extra>
            <Icon name='user' />
            Author: {r.author || 'Anonymous'}
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
            <Header as="h1" textAlign="center">Search</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form onSubmit={handleSearch} loading={loading}>
              {Fields()}
              <Form.Group key="buttons">
                <Form.Button type="submit">Search</Form.Button>
                <Form.Button type="button" onClick={addField}>Add Field</Form.Button>
                <Form.Button type="button" onClick={clearSearch}>Reset</Form.Button>
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Platform>
      {/* results */}
      <Platform>
        <Grid.Row>
          <Grid.Column>
            <Header as="h3" textAlign="center">Results</Header>
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

export default SearchForm;
