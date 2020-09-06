import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Game from '../pages/Game';

import '../globalStyles.css';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Game} />
  </Switch>
);

export default Routes;
