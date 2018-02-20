import React from 'react';
import { addLocaleData } from 'react-intl';
import localeData from 'react-intl/locale-data/pl';

import Layout from './index';
import messages from '../translations/pl.json';

addLocaleData(localeData);

export default (props) => <Layout {...props} locale="pl" messages={messages} />;
