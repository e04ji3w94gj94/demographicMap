import React from 'react';

function NoMatch() {
  return (
    <div id="no-match" role="document">
      <h3>
        No match for
        <code>{window.location.pathname}</code>
      </h3>
    </div>
  );
}

export default NoMatch;
