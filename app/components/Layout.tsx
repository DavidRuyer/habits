const Layout: React.FC = (props) => (
  <div className="flex flex-col h-full mx-8">
    <div className="flex-grow"></div>

    {props.children}

    <div className="flex-grow"></div>
  </div>
);

export default Layout;
