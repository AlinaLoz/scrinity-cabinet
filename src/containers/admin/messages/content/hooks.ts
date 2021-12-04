import { useCallback, useState } from 'react';
import { isMobile } from 'mobile-device-detect';
import { useRouter } from 'next/router';
import { COMPANY_CHAT_ROUTE } from '@constants/routes.contstants';
import { useMe } from '@hooks/use-me.hooks';
import { isNumber } from '@helpers/validators';

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

type TUseOpenChatReturn = [
  (chatId: number) => void,
];

export const useOpenChat = (): TUseOpenChatReturn => {
  const router = useRouter();
  const [, user] = useMe();
  
  const onOpenChat = useCallback((chatId: number) => {
    if (isMobile && user) {
      router.push(COMPANY_CHAT_ROUTE(user.institutionId.toString(), chatId));
    } else {
      const queryChatId = +(router.query['chatId'] || 0);
      if (queryChatId === chatId) {
        delete router.query['chatId'];
      } else {
        router.query['chatId'] = chatId.toString();
      }
      router.push({
        pathname: router.pathname,
        query: router.query,
      });
    }
  }, [user, router]);
  
  return [onOpenChat];
};


export const useChatIdFromRoute = (): [number | null, (chatId: number) => void] => {
  const router = useRouter();
  const chatId = router.query['chatId'] as string;
  
  const [onChangeChatId] = useOpenChat()
  
  return [isNumber(chatId) ? +chatId : null, onChangeChatId];
};


