import { ButtonExtension } from '@atlassian/clientside-extensions';

/**
 * @clientside-extension
 * @extension-point bitbucket.ui.pullrequest.commits.table.column.after
 */
export default ButtonExtension.factory((pluginApi, context) => {
    return {
        hidden: false,
        header: 'My ext. header',
        label: 'My ext. cell',
        onAction: () => {
            console.log('My commits table extension', context);
        },
    };
});
