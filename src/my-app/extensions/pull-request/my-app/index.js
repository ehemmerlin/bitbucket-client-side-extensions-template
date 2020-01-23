import React from 'react';
import { object } from 'prop-types';
import Button from '@atlaskit/button';
import * as formatter from 'wrm/i18n';
import * as navbuilder from 'bitbucket/util/navbuilder';

export default function MyApp({ pullRequest }) {
    const pullRequestUrl = navbuilder.pullRequest(pullRequest).build();

    return (
        <div>
            <Button>{formatter.I18n.getText('my.extension.button.label')}</Button>
            <p>{formatter.I18n.getText('my.extension.comment.label')}</p>
            <pre>Pull Request URL: {pullRequestUrl}</pre>
        </div>
    );
}

MyApp.propTypes = {
    pullRequest: object.isRequired,
};
