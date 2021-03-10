import { ButtonExtension } from '@atlassian/clientside-extensions';

/**
 * @clientside-extension
 * @extension-point tutorial.extension.points
 */
export default ButtonExtension.factory((pluginApi, context) => {
    return {
        label: 'Tutorial: button extension',
        onAction: () => {
            alert(
                'Tutorial: your extension point is rendering buttons correctly 🎉. This is the context received: ',
                context
            );
        },
    };
});
