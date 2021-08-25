// #/src/my-app/extensions/first-extension.js
import { ModalExtension } from '@atlassian/clientside-extensions';

/**
 * @clientside-extension
 * @extension-point bitbucket.ui.pullrequest.diff.toolbar
 */
export default ModalExtension.factory((extensionAPI, context) => {
    return {
        label: 'Click to open a modal',
        onAction: (modalAPI) => {
            let count = 0;

            const getContent = () => `
                <p>The primary button has been clicked ${count} times.</p>
            `;

            modalAPI.setTitle('Look, a Modal!');

            modalAPI.onMount((container) => {
                container.innerHTML = getContent();

                // setting the actions of the modal
                modalAPI.setActions([
                    {
                        text: 'Primary',
                        onClick: () => {
                            count++;
                            container.innerHTML = getContent();
                        },
                    },
                    {
                        text: 'Close',
                        onClick: () => modalAPI.closeModal(),
                    },
                ]);
            });

            modalAPI.onUnmount((container) => {
                container.innerHTML = '';
            });
        },
    };
});