import { ButtonExtension } from '@atlassian/clientside-extensions';

/**
 * @clientside-extension
 * @extension-point bitbucket.ui.pullrequest.comment.action
 */
export default ButtonExtension.factory((pluginApi, context) => {
    return {
        hidden: false,
        label: 'My comment action extension',
        onAction: () => {
            console.log('My comment action extension', context);
        },
    };
});
