import React from 'react';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import cn from 'classnames';

import { BackIcon } from '@components/icons/back';
import styles from './table.module.scss';

interface ITableProps {
  pageCount: number;
  thead: React.ReactElement;
  tbody: React.ReactElement[];
}

export const CustomTable: React.FC<ITableProps> = ({ pageCount, thead, tbody }) => (
  <div>
    <Table responsive="sm" className={styles.table}>
      <thead>
        {thead}
      </thead>
      <tbody>
        {tbody}
      </tbody>
    </Table>
    <div className={styles.rawSeparator} />
    <ReactPaginate
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
      // onPageChange={() => {}}
      containerClassName="pagination"
      activeClassName="active"
    />
  </div>

);
