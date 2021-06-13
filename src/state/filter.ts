import { Ctx } from '../ctx';
import { Sphere } from '../events/v4';

export class FilterData {
  dateRange?: DateRange;
  free?: boolean;
  forChildren?: boolean;
  spheres: Sphere[] = [];
}

export interface DateRange {
  dateFrom: number;
  dateTo: number;
}

export class Filter {
  constructor(private ctx: Ctx) {
    this.data = Object.assign(new FilterData(), this.data);
    if (this.ctx.session.isNew) {
      this.init();
    }
  }

  get data() {
    return this.ctx.user.data.filter!;
  }

  set data(value: FilterData) {
    this.ctx.user.data.filter = value;
  }

  init() {
    this.data = new FilterData();
  }
}

