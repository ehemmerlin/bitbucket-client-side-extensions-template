import { ButtonExtension } from '@atlassian/clientside-extensions';

/**
 * @clientside-extension
 * @extension-point bitbucket.ui.pullrequest.action
 */
export default ButtonExtension.factory((pluginApi, context) => {
    return {
        hidden: false,
        label: 'My pull request action extension',
        onAction: () => {
            console.log('My pull request action extension', context);
        },
    };
});
