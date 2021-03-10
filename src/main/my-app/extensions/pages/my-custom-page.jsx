import React from 'react';
import { render } from 'react-dom';
import { PageExtension } from '@atlassian/clientside-extensions';

import PageContainer from '../components/page-container';

const MyPage = () => {
    return (
        <PageContainer>
            <h2>My custom page</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </PageContainer>
    );
};

/**
 * @clientside-extension
 * @extension-point header.global.primary
 * @label my.extension.admin.label
 * @page-url /my-custom-page
 * @page-title "My Custom Page"
 */
export default PageExtension.factory(container => {
    render(<MyPage />, container);
});
