import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import newsStore from '../src/stores/NewsStore';
import NewsActionTypes from '../src/constants/NewsActionTypes';
import NewsDispatcher from '../src/dispatcher/NewsDispatcher';


describe('NewsStore', () => {
  const news =  [{
    title: 'General Election 2017: Labour to rip up Tory Brexit plan',
    description: 'The party says it would prioritise jobs and workers\' rights, and guarantee the status of EU citizens.',
  }, {
    title: 'US submarine arrives in South Korea as tensions rise',
    description: 'It comes amid worries of a North Korean missile test as Pyongyang marks its army\'s anniversary.'
  }] 
  NewsDispatcher.dispatch({
    eventName: NewsActionTypes.GET_NEWS,
    news: news 
  });  
  it('Should match the expected news', () => {
    const expected = newsStore.getAll();
    expect(expected).toEqual(news);
  });
});
