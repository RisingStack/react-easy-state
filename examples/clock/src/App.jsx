import React, { useEffect } from 'react';
import moment from 'moment';
import { view, store } from '@frontity/react-easy-state';

function getFormattedTime() {
  return moment().utc().format('hh:mm:ss A');
}

// this is re-rendered whenever the relevant parts of the used data stores change
export default view(() => {
  // create a local store which is NOT shared between component instances
  const clock = store({
    time: getFormattedTime(),
  });

  useEffect(() => {
    const id = setInterval(
      () => (clock.time = getFormattedTime()),
      1000,
    );
    return () => clearInterval(id);
  }, []);

  return <div>{clock.time}</div>;
});
