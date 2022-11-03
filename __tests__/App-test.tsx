/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const screen = renderer.create(<App />);
  const tree = screen.toJSON()
  expect(tree).toMatchSnapshot()
});
