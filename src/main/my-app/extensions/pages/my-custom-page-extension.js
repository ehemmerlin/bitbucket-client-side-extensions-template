import React from 'react';
import { render } from 'react-dom';
import { PageExtension } from '@atlassian/clientside-extensions';

const MyPage = () => {
    return (
        <div className="aui-page-focused aui-page-size-large">
            <div className="aui-page-panel">
                <div className="aui-page-panel-inner">
                    <section className="aui-page-panel-content">
                        <h2>My custom page</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </section>
                </div>
            </div>
        </div>
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
