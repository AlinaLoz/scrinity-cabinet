import React, {
  useCallback, useContext, useEffect,
} from 'react';
import { useRouter } from 'next/router';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import cn from 'classnames';
import { format } from 'date-fns';

import { UserContext } from '@contexts/user.context';
import { COMPANY_ROUTE, ROUTES } from '@constants/routes.contstants';
import ChatWidget from '@components/chat-widget';
import styles from './styles.module.scss';

interface IChatProps {
  feedbackId?: number | null;
}

const CustomTimeStampFragment = ({ date, isResponse }: { date: string, isResponse: boolean }) => (
  <div className={cn('rcw-timestamp', isResponse ? 'rcw-response' : 'rcw-client')}>
    {format(new Date(date), 'HH:mm')}
  </div>
);

export const Chat: React.FC<IChatProps> = () => {
  const router = useRouter();
  const { company } = useContext(UserContext);
  // const prepareFeedbackId = feedbackId || router.query.feedbackId;
  const companyMessagesRoute = COMPANY_ROUTE(company, ROUTES.MESSAGES);

  const handleNewUserMessage = (newMessage: string) => {
    (async () => {
      // Now send the message throught the backend API
      const widget = await import('react-chat-widget');
      widget.renderCustomComponent(CustomTimeStampFragment, { date: Date.now(), isResponse: false });
    })();
  };

  useEffect(() => {
    (async () => {
      const widget = await import('react-chat-widget');
      if (!widget.isWidgetOpened()) {
        widget.toggleWidget();
      }
      widget.dropMessages();
      widget.addUserMessage('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid'
        + 'unt ut labore et dolore magna aliqua. Nibh mauris cursus mattis molestie. Ligula ullamcorper malesuada proi'
        + 'n libero nunc consequat interdum. A lacus vestibulum sed arcu non odio euismod lacinia. Aliquet eget sit a'
        + 'met tellus cras adipiscing enim.');
      widget.renderCustomComponent(CustomTimeStampFragment, { date: '2021-11-20T16:16:55.881Z', isResponse: false });
      widget.addResponseMessage('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in'
        + 'cididunt ut labore et dolore magna aliqua. Id aliquet lectus proin nibh nisl. Suspendisse faucib'
        + 'us interdum posuere lorem ipsum dolor sit amet consecteturg.');
      widget.renderCustomComponent(CustomTimeStampFragment, { date: '2021-11-15T16:16:55.881Z', isResponse: true });
    })();
  }, []);

  const onClickWrapper = useCallback((event: React.MouseEvent) => {
    if ((event.target as HTMLButtonElement).classList.contains('rcw-close-button')) {
      router.push(companyMessagesRoute);
    }
  }, [company]);

  return (
    <div className={cn(styles.wrapper)} onClick={(event) => onClickWrapper(event)}>
      <ChatWidget
        showTimeStamp={false}
        showCloseButton
        senderPlaceHolder="Напишите сообщение"
        title={formatPhoneNumberIntl('+375298265917')}
        launcher={() => <div />}
        handleNewUserMessage={handleNewUserMessage}
      />
    </div>
  );
};
