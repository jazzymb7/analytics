import { redis } from "@/lib/redis";
import { getDate } from "@/utils";
import { parse } from "date-fns";

class Analytics {
  #retention = 60 * 60 * 24 * 7;

  get retention() {
    return this.#retention;
  }

  set retention(value) {
    this.#retention = value;
  }

  async track(namespace, event, opts) {
    let key = `analytics::${namespace}`;
    if (!opts || !opts.persist) {
      key += `::${getDate()}`;
    }
    await redis.hincrby(key, JSON.stringify(event), 1);
    if (!opts || !opts.persist) await redis.expire(key, this.retention);
  }

  async retrieveDays(namespace, nDays) {
    const promises = [];
    for (let i = 0; i < nDays; i++) {
      const formatteddate = getDate(i);
      const promise = analytics.retrieve(namespace, formatteddate);
      promises.push(promise);
    }

    const fetch = await Promise.all(promises);
    const data = fetch.sort((a, b) => {
      if (
        parse(a.date, "dd/MM/yyyy", new Date()) >
        parse(b.date, "dd/MM/yyyy", new Date())
      ) {
        return 1;
      } else {
        return -1;
      }
    });
    return data;
  }

  async retrieve(namespace, date) {
    const res = await redis.hgetall(`analytics::${namespace}::${date}`);
    return {
      date,
      events: Object.entries(res || []).map(([key, value]) => ({
        [key]: Number(value),
      })),
    };
  }
}

export const analytics = new Analytics();
