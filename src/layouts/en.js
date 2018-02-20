import React from 'react';
import { addLocaleData } from 'react-intl';
import localeData from 'react-intl/locale-data/en';

import Layout from './index';
import messages from '../translations/en.json';

addLocaleData(localeData);

export default (props) => <Layout {...props} locale="en" messages={messages} />;
