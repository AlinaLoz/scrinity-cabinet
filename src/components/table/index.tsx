import React, { useCallback } from 'react';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import cn from 'classnames';

import { BackIcon } from '@components/icons/back';
import { useRouter } from 'next/router';
import styles from './table.module.scss';

interface ITableProps {
  className?: string;
  total: number;
  pageSize: number;
  thead: React.ReactElement;
  tbody: React.ReactElement[];
}

export const CustomTable: React.FC<ITableProps> = ({
  className = '', total, pageSize, thead, tbody,
}) => {
  const router = useRouter();
  const skip = +(router.query.skip || 0);
  const pageCount = Math.round(total / pageSize);
  const initialPage = Math.round(skip / pageSize);

  const onChangePage = useCallback((data: { selected: number }) => {
    if (!Object.keys(router.query).length) {
      return;
    }
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        skip: pageSize * data.selected,
      },
    });
  }, [router]);

  return (
    <div className={className}>
      <Table responsive="sm" className={styles.table}>
        <thead>
          {thead}
        </thead>
        <tbody>
          {tbody}
        </tbody>
      </Table>
      <div className={styles.rawSeparator} />
      {pageCount > 1 && (
        <ReactPaginate
          forcePage={initialPage}
          previousLabel={<BackIcon className={styles.arrow} />}
          nextLabel={<BackIcon className={cn(styles.nextBtn, styles.arrow)} />}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={1}
          onPageChange={onChangePage}
          containerClassName="pagination"
          activeClassName="active"
        />
      )}
    </div>
  );
};
