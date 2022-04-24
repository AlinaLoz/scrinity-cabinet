import React from 'react';
import { format } from 'date-fns';
import cn from 'classnames';

import { IFeedback } from '@interfaces/feedbacks.interfaces';
import { UrlHelper } from '@helpers/url.helper';
import { getRandomInt } from '@helpers/number.helpers';
import { StarIcon } from '@components/icons/star';
import styles from './feedback.module.scss';

interface IProps {
  feedback: IFeedback;
}

const Rating: React.FC<{ rating: number }> = ({ rating }) => (
  <>
    {[...Array(5).keys()].map((_, idx) => (
      <StarIcon key={`star${idx}`} currentColor={idx + 1 <= rating ? '#FF9500' : '#D1D1D6'} />
    ))}
  </>
);

export const Feedback: React.FC<IProps> = ({ feedback }) => (
  <div className={styles.feedback} key={`feedback${ feedback.id }${feedback.author}`}>
    <div className={styles.header}>
      <div className={styles.avatar}>
        <img src={UrlHelper.getImageSrc(`monkeys/${getRandomInt(40, 1)}.svg`)} alt={`${feedback.author}'s avatar`} />
      </div>
      <div className={styles.description}>
        <p className={styles.author}>{feedback.author}</p>
        <p className={styles.profession}>{feedback.profession}</p>
        <p className={styles.date}>{format(new Date(feedback.date), 'yyyy.MM.dd HH:MM')}</p>
      </div>
      <div className={cn(styles.ratings)}>
        <Rating rating={feedback.rating} />
      </div>
    </div>
    <div className={styles.body}>{feedback.text}</div>
  </div>
);
