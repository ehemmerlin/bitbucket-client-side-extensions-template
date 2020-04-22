import { PanelExtension } from '@atlassian/clientside-extensions';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import MyApp from './my-app';

/**
 * @clientside-extension
 * @extension-point bitbucket.ui.pullrequest.comment.extra
 */
export default PanelExtension.factory((pluginApi, context) => {
    return {
        hidden: false,
        onAction: panelApi => {
            const { pullRequest } = context;

            panelApi
                .onMount(element => {
                    console.log('My comment panel extension', context);

                    render(<MyApp pullRequest={pullRequest} />, element);
                })
                .onUnmount(element => {
                    unmountComponentAtNode(element);
                });
        },
    };
});
