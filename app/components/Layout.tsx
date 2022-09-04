import { Link } from "@remix-run/react";

interface LayoutProps {
  backUrl: string;
  nextUrl?: string;
  nextTitle?: string;
}

const Layout: React.FC<LayoutProps> = (props) => (
  <div className="flex flex-col h-full mx-8">
    <div className="flex-grow"></div>

    {props.children}

    <div className="flex-grow"></div>

    <div className="flex flex-row justify-between mb-2 p-4 text-lg text-clear">
      <Link to={props.backUrl}>Back</Link>
      {props.nextUrl && props.nextTitle && (
        <Link to={props.nextUrl}>{props.nextTitle}</Link>
      )}
    </div>
  </div>
);

export default Layout;
