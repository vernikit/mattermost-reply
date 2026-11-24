/** @jest-environment jsdom */

import {readSelectionOverlay} from 'components/selection_reply_button';

test('shows Quote for selected message text in the current Mattermost markup', () => {
    const postId = 'abcdefghijklmnopqrstuvwxyz';
    const post = document.createElement('div');
    post.id = `post_${postId}`;
    post.innerHTML = '<div data-testid="post-message-text">Selected message</div>';
    document.body.appendChild(post);

    const range = document.createRange();
    range.selectNodeContents(post.firstElementChild!);
    range.getBoundingClientRect = () => ({
        bottom: 30,
        height: 20,
        left: 10,
        width: 100,
    } as DOMRect);
    window.getSelection()!.removeAllRanges();
    window.getSelection()!.addRange(range);

    expect(readSelectionOverlay()).toEqual(expect.objectContaining({
        postId,
        selectedText: 'Selected message',
    }));

    window.getSelection()!.removeAllRanges();
    post.remove();
});
