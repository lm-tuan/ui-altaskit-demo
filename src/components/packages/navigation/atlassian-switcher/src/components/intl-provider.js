import { injectIntl,IntlProvider } from 'react-intl';
import React, { Component }  from 'react';
import * as untypedI18n from '../i18n';
const i18n = untypedI18n;
const getCodesFromLocale = (locale) => {
    const [, language, country] = /([a-z]*)[_-]?([A-Z]*)/i.exec(locale || '');
    return [language.toLowerCase(), country.toUpperCase()];
};
const SwitcherIntlProdiver = ({ children, intl, }) => {
    const [language, country] = getCodesFromLocale(intl.locale.toString());
    const messages = i18n[`${language}_${country}`] || i18n[language] || i18n.en;
    return <IntlProvider messages={messages}>{children}</IntlProvider>
};
export default injectIntl(SwitcherIntlProdiver);