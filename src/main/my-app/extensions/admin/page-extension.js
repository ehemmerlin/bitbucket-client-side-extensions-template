import { PageExtension } from '@atlassian/clientside-extensions';

console.log('Heeeeeey');

/**
 * @clientside-extension
 * @extension-point atl.admin/admin-settings-section
 * @label "My New Feature"
 * @page-url /my-custom-page
 * @page-title "My Custom Page"
 */
export default PageExtension.factory(container => {
    container.innerHTML = '<h2>Custom admin page</h2>';
});
