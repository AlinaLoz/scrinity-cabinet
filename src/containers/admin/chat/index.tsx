import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import cn from 'classnames';

import { PageLoader } from '@components/page-loader';
import { useMe } from '@hooks/use-me.hooks';

import { sendFeedbackImagesAPI, sendMessageAPI } from '@api/chats.service';

import { COMPANY_ROUTE, ROUTES } from '@constants/routes.contstants';
import { useRouter } from 'next/router';
import { useChatIdFromRoute } from '../messages/content/hooks';
import { useChat, useToggleDisabledChat } from './hooks';

// @ts-ignore
const ChatWidget = dynamic(() => import('scrinity-chat')
  .then((mod) => mod.CustomWidget), {
  loading: () => <PageLoader />,
  ssr: false,
});

interface IChatProps {
  className?: string;
}

export const Chat: React.FC<IChatProps> = ({ className }) => {
  const router = useRouter();
  const [chatId] = useChatIdFromRoute();
  const [, manager] = useMe();

  const [isLoadingChat, messages, messagesById] = useChat(chatId || 0);
  const isAnonymous = !messages[0]?.sender;

  const formatSender = formatPhoneNumberIntl(messages[0]?.sender?.phoneNumber || '')
    || messages[0]?.sender?.email || 'Аноним';

  useToggleDisabledChat(messages);

  const goBack = useCallback(() => {
    if (!manager) { return; }
    const companyMessagesRoute = COMPANY_ROUTE(manager.institutionId.toString(), ROUTES.MESSAGES);
    router.push(companyMessagesRoute);
  }, [manager]);

  if (!manager?.id || isLoadingChat) {
    return <PageLoader />;
  }

  return (
    <ChatWidget
      className={cn(isAnonymous ? 'anonymous' : '')}
      userId={manager.userId}
      chatId={chatId || undefined}
      sendMessageAPI={sendMessageAPI}
      uploadImagesAPI={sendFeedbackImagesAPI}
      title={formatSender}
      messagesById={messagesById}
      institution={{ id: manager.institutionId }}
      messages={messages}
      goBack={goBack}
    />
  );
};
