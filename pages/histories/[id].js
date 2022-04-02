import Head from 'next/head';
import { withIronSessionSsr } from 'iron-session/next';
import { Layout } from 'antd';

import sessionOptions from '../../lib/session';
import Header from '../../components/header';
import History from '../../components/history';
import constants from '../../lib/constants';
import fetcher from '../../lib/fetcher';

export default function HistoryDetail({
  user, winner, histories, date,
}) {
  return (
    <Layout className="layout">
      <Head>
        <title>Home - I Komang Sena</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout.Header>
        <Header isLoggedIn={user.isLoggedIn} />
      </Layout.Header>
      <Layout.Content style={{ padding: '0 50px', marginTop: 16 }}>
        <div className="site-layout-content">
          <History winner={winner} date={date} histories={histories} />
        </div>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        Copyright (c) 2022
        {' '}
        <a
          href="http://sena.omg.lol"
          target="_blank"
          rel="noreferrer"
        >
          I Komang Sena Aji Buwana
        </a>
      </Layout.Footer>
    </Layout>
  );
}

export const getServerSideProps = withIronSessionSsr(async ({ req, query }) => {
  const { user } = req.session;

  if (!user?.isLoggedIn) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const { winner = {}, histories = [], modifiedAt = new Date() } = await fetcher(`${constants.BASE_URL}/histories/${query.id}`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });

  return {
    props: {
      user,
      winner,
      histories,
      date: modifiedAt,
    },
  };
}, sessionOptions);