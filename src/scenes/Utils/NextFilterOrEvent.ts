import { Component } from '../Component';
import { Enter as EnterSelectDate } from '../SelectDate/Enter';
import { Enter as EnterSelectSphere } from '../SelectSphere/Enter';
// import { Enter as EnterSelectFree } from '../SelectFree/Enter';
import { Enter as EnterOfferEvent } from '../OfferEvent/Enter';

// Переход на следующий фиьтр или выдачу результата.
export class NextFilterOrEvent extends Component {
  reply() {
    if (!this.ctx.filter.data.spheres?.length && this.ctx.filter.data.forChildren === undefined) {
      this.nextComponent = EnterSelectSphere;
    } else if (!this.ctx.filter.data.dateRange) {
      this.nextComponent = EnterSelectDate;
    // пока убираем выбор бесплатности
    // } else if (this.ctx.filter.data.free === undefined) {
    //   this.nextComponent = EnterSelectFree;
    } else {
      this.nextComponent = EnterOfferEvent;
    }
  }
}
