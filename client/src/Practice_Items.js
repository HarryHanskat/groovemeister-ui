import React from "react";
import './Practice_Items.css';

function Practice_Items() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/test');
      const data = await response.json();
      console.log(data);
    }
    fetchData();
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
