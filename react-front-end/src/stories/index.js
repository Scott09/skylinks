import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import NavBar from '../frontcomponents/NavBar';
import FlightList from '../frontcomponents/FlightList';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SearchForm from '../frontcomponents/SearchForm';



const flights = [
  {
    airline: "American Airlines",
    departure: "Vancouver",
    arrival: "Toronto"
  },
  {
    airline: "Westjet",
    departure: "Beijing",
    arrival: "London"
  },
  {
    airline: "Air Canada",
    departure: "Seoul",
    arrival: "Sidney"
  },
  {
    airline: "Asiana Airlines",
    departure: "Seattle",
    arrival: "New York"
  },
  {
    airline: "Alaska Airlines",
    departure: "Orlando",
    arrival: "Maui"
  }, 
  {
    airline: "Alaska Airlines",
    departure: "Orlando",
    arrival: "Maui"
  },
   {
    airline: "Alaska Airlines",
    departure: "Orlando",
    arrival: "Maui"
  }
];


storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

  storiesOf('Navbar', module)
    .add('standard', () => {
      return <NavBar />
    });


  storiesOf('FlightList', module)
    .add('list', () => {
      return <FlightList flights={flights}/>
    })


  storiesOf('SearchForm', module)
    .add('normal', () => {
      return <SearchForm />
    })

