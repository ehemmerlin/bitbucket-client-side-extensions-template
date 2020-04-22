import extension from './action-extension';

describe('action extension', () => {
    it('should register  extension', () => {
        const attributes = extension();

        expect(attributes).toMatchInlineSnapshot(`
            Object {
              "hidden": false,
              "label": "My pull request action extension",
              "onAction": [Function],
              "type": "button",
            }
        `);
    });
});
