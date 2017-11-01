import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import FeaturedRest from './components/FeaturedRest';
import FreshOnSite from './components/FreshOnSite';
import Special from './components/Special';

const data = [
  {
    image:
      'http://www.telegraph.co.uk/content/dam/Travel/hotels/europe/spain/canary-islands/tenerife/h10-timanfaya-palace-lanzarote-restaurant-small.jpg',
    title: 'Muncher - Title4',
    subtitle: 'Muncher - Subtitle4',
    text:
      'Muncher - Text4: It is a long established fact that a reader will be distracted.',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/samihah/128.jpg',
    action: 'Muncher - action'
  },
  {
    image:
      'http://www.telegraph.co.uk/content/dam/Travel/hotels/europe/spain/canary-islands/tenerife/h10-timanfaya-palace-lanzarote-restaurant-small.jpg',
    title: 'Muncher - Title5',
    subtitle: 'Muncher - Subtitle5',
    text:
      'Muncher - Text5: It is a long established fact that a reader will be distracted.',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/samihah/128.jpg',
    action: 'Muncher - action'
  },
  {
    image:
      'http://www.telegraph.co.uk/content/dam/Travel/hotels/europe/spain/canary-islands/tenerife/h10-timanfaya-palace-lanzarote-restaurant-small.jpg',
    title: 'Muncher - Title6',
    subtitle: 'Muncher - Subtitle6',
    text:
      'Muncher - Text6: It is a long established fact that a reader will be distracted.',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/samihah/128.jpg',
    action: 'Muncher - action'
  }
];

const dataForWidget = [
  {
    label: 'Featured list',
    name: 'fa fa-star',
    component: <FeaturedRest data={data} />
  },
  {
    label: 'Fresh on site',
    name: 'fa fa-bolt',
    component: <FreshOnSite data={data} />
  },
  {
    label: 'Todays special',
    name: 'fa fa-money',
    component: <Special data={data[0]} />
  }
];

const FeaturedCard = () => (
  <Tabs>
    {dataForWidget.map(item => (
      <Tab
        key={item.label}
        icon={<FontIcon className={item.name} />}
        label={item.label}
      >
        {item.component}
      </Tab>
    ))}
  </Tabs>
);

export default FeaturedCard;
