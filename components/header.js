import { Row } from 'antd';
import { LogoutOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';

function BackButton() {
  const { back, pathname } = useRouter();

  return !['/', '/home'].includes(pathname) ? <ArrowLeftOutlined onClick={back} style={{ fontSize: 24, color: 'white' }} /> : <div />;
}

function LogoutButton({ isLoggedIn }) {
  return isLoggedIn ? <Link href="/logout" passHref><LogoutOutlined style={{ fontSize: 24, color: 'white' }} /></Link> : <div />;
}

function Header({ isLoggedIn }) {
  return (
    <Row justify="space-between" align="middle">
      <BackButton />
      <h1 style={{ color: 'white' }}>Nextjs Web</h1>
      <LogoutButton isLoggedIn={isLoggedIn} />
    </Row>
  );
}

export default Header;
