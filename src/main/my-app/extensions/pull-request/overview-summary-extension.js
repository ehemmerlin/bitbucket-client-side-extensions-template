import { ButtonExtension } from '@atlassian/clientside-extensions';

/**
 * @clientside-extension
 * @extension-point bitbucket.ui.pullrequest.overview.summary
 */
export default ButtonExtension.factory((pluginApi, context) => {
    // A glyph name from '@atlaskit/icon/glyph/add-circle';
    // Check the AK docs for more icons https://atlaskit.atlassian.com/packages/core/icon
    const iconBefore = 'add-circle';

    return {
        hidden: false,
        iconBefore,
        label: 'My overview extension',
        className: 'demo-overview-extension',
        onAction: () => {
            console.log('My overview extension', context);
        },
    };
});
