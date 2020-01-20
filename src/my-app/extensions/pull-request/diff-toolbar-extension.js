import { ButtonExtension } from '@atlassian/clientside-extensions';

/**
 * @clientside-extension
 * @extension-point bitbucket.ui.pullrequest.diff.toolbar
 */
export default ButtonExtension.factory((pluginApi, context) => {
    return {
        hidden: false,
        label: 'My diff toolbar extension',
        onAction: () => {
            console.log('My diff toolbar extension', context);
        },
    };
});
