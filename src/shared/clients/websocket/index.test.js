import '@testing-library/jest-dom';
import {mockComments} from '../../../../__mocks__/comments';
import websocket from './index';

const sendMock = jest.fn();

describe('Websocket', () => {
    const originalWebSocket = WebSocket;
    let onMessage;
    const webSocketMock = class {
        send = sendMock;
        constructor() {}
        set onmessage(onmessageFunction) {
            onMessage = onmessageFunction;
        }
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        window.WebSocket = webSocketMock;
    });

    afterAll(() => {
        window.WebSocket = originalWebSocket;
    });

    it('should return sendMessage', () => {
        const sendMessage = websocket();
        sendMessage({test: 'data'});
        expect(sendMock).toHaveBeenCalledWith(JSON.stringify({test: 'data'}));
    });

    it('should run onMessage function', () => {
        const onMessageReceive = jest.fn();
        websocket(onMessageReceive);

        onMessage({data: JSON.stringify({
            event: 'comment:upvote',
            comment: mockComments[0]
        })});

        expect(onMessageReceive).toHaveBeenCalledWith({
            event: 'comment:upvote',
            comment: mockComments[0]
        });
    });
});
