import { store } from 'react-easy-state';
import moment from 'moment';

export default store({
  ticks: 0,
  start() {
    this.intervalId = setInterval(() => this.ticks++, 10);
  },
  stop() {
    this.intervalId = clearInterval(this.intervalId);
  },
  get time() {
    const time = moment(0).millisecond(this.ticks * 10);

    return {
      seconds: time.format('mm:ss'),
      fraction: time.format('SS'),
    };
  },
  get isTicking() {
    return this.intervalId !== undefined;
  },
  toggle() {
    this.isTicking ? this.stop() : this.start();
  },
  reset() {
    this.ticks = 0;
    this.stop();
  },
});
