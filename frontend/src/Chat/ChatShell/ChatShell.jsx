import React, { useEffect } from 'react';

import ConversationSearch from '../components/conversation/conversation-search/ConversationSearch';
import NoConversations from '../components/conversation/no-conversations/NoConversations';
import ConversationList from '../components/conversation/conversation-list/ConversationList';
import NewConversation from '../components/conversation/new-conversation/NewConversation';
import ChatTitle from '../components/chat-title/ChatTitle';
import MessageList from '../message/MessageList';
import ChatForm from '../components/chat-form/ChatForm';

import './ChatShell.scss';

const ChatShell = () => {
    const conversations = [];
    const selectedConversation = [{
        id:0
    }];
    const conversationChanged = () => {

    }
    const onDeleteConversation = () => {

    }

    const onMessageSubmitted = () => {

    }

    let conversationContent = (
        <>
            <NoConversations></NoConversations>
        </>
    );
    if (conversations.length > 0) {
        conversationContent = (
            <>
                <MessageList conversationId={selectedConversation.id} />
            </>
        );
    }

    return (
        <div id="chat-container">
            <ConversationSearch conversations={conversations} />
            <ConversationList
                onConversationItemSelected={conversationChanged}
                conversations={conversations}
                selectedConversation={selectedConversation} />
            <NewConversation />
            <ChatTitle 
                selectedConversation={selectedConversation}
                onDeleteConversation={onDeleteConversation} />
            {conversationContent}
            <ChatForm 
                selectedConversation={selectedConversation}
                onMessageSubmitted={onMessageSubmitted} />
        </div>
    );
}

export default ChatShell;