import { ButtonExtension } from '@atlassian/clientside-extensions';

/**
 * @clientside-extension
 * @extension-point bitbucket.ui.pullrequest.overview.summary
 */
export default ButtonExtension.factory((pluginApi, context) => {
    return {
        hidden: false,
        label: 'My overview extension',
        onAction: () => {
            console.log('My overview extension', context);
        },
    };
});
