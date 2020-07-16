import { ModalExtension } from '@atlassian/clientside-extensions';

/**
 * @clientside-extension
 * @extension-point bitbucket.ui.pullrequest.diff.toolbar
 */
export default ModalExtension.factory((pluginApi, context) => {
    // A glyph name from '@atlaskit/icon/glyph/jira/labs';
    // Check the AK docs for more icons https://atlaskit.atlassian.com/packages/core/icon
    const iconAfter = 'jira/labs';

    return {
        hidden: false,
        iconAfter,
        label: 'My diff toolbar extension',
        onAction: modalApi => {
            modalApi.onMount(container => {
                modalApi.setTitle('My diff toolbar extension!');

                modalApi.setActions([
                    {
                        text: 'Close',
                        onClick: () => {
                            modalApi.closeModal();
                        },
                    },
                ]);

                container.innerHTML = `
            		<div>
            			<h3>Hello there!</h3>
            			<p>Here is the context</p>
        				<pre style="white-space: pre-wrap; word-break: break-all;">
        					${JSON.stringify(context, null, '  ')}
    					</pre>
    				</div>
				`;
            });
        },
    };
});
