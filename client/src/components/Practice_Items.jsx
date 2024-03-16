import React from "react";
import './Practice_Items.css';

function Practice_Items() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/test")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="Practice_Items">
      <header className="Practice_Items-header">
        <p>{!data ? "Database????": data}</p>
      </header>
    </div>
  );
}

export default Practice_Items;
