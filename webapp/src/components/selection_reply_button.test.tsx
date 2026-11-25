/** @jest-environment jsdom */

import {readSelectionOverlay} from 'components/selection_reply_button';

test('shows Quote for selected message text in the current Mattermost markup', () => {
    const postId = 'abcdefghijklmnopqrstuvwxyz';
    const postList = document.createElement('div');
    postList.id = 'virtualizedPostListContent';
    postList.innerHTML = `<div id="post_${postId}" data-testid="postView"><div id="postMessageText_${postId}" data-testid="post-message-text">Selected message</div></div>`;
    document.body.appendChild(postList);

    const range = document.createRange();
    range.selectNodeContents(postList.querySelector('[data-testid="post-message-text"]')!);
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
    postList.remove();
});
