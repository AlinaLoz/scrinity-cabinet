import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from 'react-bootstrap';

import { useChats } from '@containers/admin/messages/hooks';
import { Page } from './page';
import styles from './style.module.scss';

interface IListMessagesProps {
  className?: string;
}

const ITEMS_PER_PAGE = 15;
export const ListMessages: React.FC<IListMessagesProps> = ({
  className,
}) => {
  const [cnt, setCnt] = useState(1);
  const [, total] = useChats(0, 15);

  const fetchMoreData = useCallback(() => {
    setCnt((prev) => prev + 1);
  }, []);
  const countPage = Math.round(total / ITEMS_PER_PAGE);
  const pages = [];
  for (let i = 0; i < cnt; i += 1) {
    pages.push(<Page index={i} key={i} />);
  }

  return (
    <div id="scrollableDiv" className={cn(className, styles.scrollableDiv)}>
      <InfiniteScroll
        dataLength={cnt * ITEMS_PER_PAGE}
        next={fetchMoreData}
        hasMore={pages.length < countPage}
        loader={<Spinner animation="border" />}
        scrollableTarget="scrollableDiv"
      >
        {pages}
      </InfiniteScroll>
    </div>
  );
};
