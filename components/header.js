import {
  Row,
  Card,
} from 'antd';
import { LogoutOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';

function BackButton() {
  const { back, pathname } = useRouter();

  return !['/', '/home'].includes(pathname) ? <ArrowLeftOutlined onClick={back} style={{ fontSize: 24 }} /> : <div />;
}

function LogoutButton({ isLoggedIn }) {
  return isLoggedIn ? <Link href="/logout" passHref><LogoutOutlined style={{ fontSize: 24 }} /></Link> : <div />;
}

function Header({ isLoggedIn }) {
  return (
    <Card>
      <Row justify="space-between" align="middle">
        <BackButton />
        <Link href="/" passHref>Sena</Link>
        <LogoutButton isLoggedIn={isLoggedIn} />
      </Row>
    </Card>
  );
}

export default Header;
