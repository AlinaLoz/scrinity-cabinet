import React from 'react';

const IndexPage: React.FC = () => <div />;
export function getStaticProps() {
  return {
    notFound: true,
  };
}

export default IndexPage;
