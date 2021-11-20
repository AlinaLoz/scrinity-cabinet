import { useCallback, useContext, useState } from 'react';
import { isMobile } from 'mobile-device-detect';
import Router from 'next/router';
import { COMPANY_CHAT_ROUTE } from '@constants/routes.contstants';
import { UserContext } from '@contexts/user.context';

type TUseCheckboxesReturn = [
  number[],
  (id: number, isAll?: boolean) => void,
  () => void,
]
export const useCheckboxes = (ids: number[]): TUseCheckboxesReturn => {
  const [checkedOptions, setCheckedOptions] = useState<number[]>([]);

  const onCheckboxChange = useCallback((feedbackId: number, isAll = false) => {
    setCheckedOptions((selected) => {
      if (isAll) {
        return !selected.length ? ids : [];
      }
      if (selected.includes(feedbackId)) {
        return selected.filter((id) => id !== feedbackId);
      }
      selected.push(feedbackId);
      return [...selected];
    });
  }, [ids]);

  const onSelectAllCheckboxes = useCallback(() => {
    onCheckboxChange(-1, true);
  }, []);

  return [checkedOptions, onCheckboxChange, onSelectAllCheckboxes];
};

type TUseChatReturn = [
  number | null,
  (feedbackId: number) => void,
];
export const useChat = (): TUseChatReturn => {
  const { company } = useContext(UserContext);
  const [chat, setChat] = useState<number | null>(null);

  const onOpenChat = useCallback((feedbackId: number) => {
    if (isMobile) {
      Router.push(COMPANY_CHAT_ROUTE(company, feedbackId));
    } else {
      setChat((chatId) => {
        if (chatId === feedbackId) {
          return null;
        }
        return feedbackId;
      });
    }
  }, [company]);

  return [chat, onOpenChat];
};
