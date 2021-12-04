import React, {useCallback, useState} from 'react';
import cn from 'classnames';
import { useChats } from '@containers/admin/messages/hooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Touchable} from "@components/touchable";
import { Spinner } from 'react-bootstrap';
import styles from './style.module.scss';
import {useChatIdFromRoute} from "@containers/admin/messages/content/hooks";
import { Page } from './page';
import {PageLoader} from "@components/page-loader";
import PerfectScrollbar from 'react-perfect-scrollbar'
import useSWRInfinite from 'swr/infinite'

interface IListMessagesProps {
  className?: string;
}

export const ListMessages: React.FC<IListMessagesProps> = ({
  className,
}) => {
  const [cnt, setCnt] = useState(1);
  const [, total, items] = useChats(0, 15);
  
  const fetchMoreData = useCallback(() => {
    setCnt((prev) => prev + 1);
  }, []);
  const countPage = Math.round(total / 15);
  const pages = []
  for (let i = 0; i < cnt; i++) {
    pages.push(<Page index={i} key={i} />)
  }
  
  return (
    <div id="scrollableDiv" className={cn(className, styles.scrollableDiv)} >
      <InfiniteScroll
        dataLength={total}
        next={fetchMoreData}
        hasMore={pages.length < countPage}
        loader={<Spinner animation="border"/>}
        scrollableTarget="scrollableDiv"
      >
        {pages}
      </InfiniteScroll>
    </div>
  );
};
