import React from 'react';
import { render } from 'react-dom';
import { PageExtension } from '@atlassian/clientside-extensions';

import PageContainer from '../components/page-container';
import { useExtensions } from './extension-points.cse.graphql';

const MyPage = () => {
    const extensions = useExtensions();

    console.log(extensions);

    return (
        <PageContainer>
            <h2>tutorial.extension.points</h2>
        </PageContainer>
    );
};

/**
 * @clientside-extension
 * @extension-point header.global.primary
 * @label my.extension.extensions.label
 * @page-url /extension-points
 * @page-title "Extension points"
 */
export default PageExtension.factory(container => {
    render(<MyPage />, container);
});
