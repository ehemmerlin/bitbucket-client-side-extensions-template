import React from 'react';

const PageContainer = ({ children }) => (
    <div className="aui-page-focused aui-page-size-large">
        <div className="aui-page-panel">
            <div className="aui-page-panel-inner">
                <section className="aui-page-panel-content">{children}</section>
            </div>
        </div>
    </div>
);

export default PageContainer;
