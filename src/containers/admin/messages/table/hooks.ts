import { useCallback, useState } from 'react';
import { isMobile } from 'mobile-device-detect';
import Router from 'next/router';
import { COMPANY_CHAT_ROUTE } from '@constants/routes.contstants';
import { useMe } from '@hooks/use-me.hooks';

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
  const [user] = useMe();
  const [chat, setChat] = useState<number | null>(null);

  const onOpenChat = useCallback((feedbackId: number) => {
    if (isMobile && user) {
      Router.push(COMPANY_CHAT_ROUTE(user.institutionId.toString(), feedbackId));
    } else {
      setChat((chatId) => {
        if (chatId === feedbackId) {
          return null;
        }
        return feedbackId;
      });
    }
  }, [user]);

  return [chat, onOpenChat];
};
