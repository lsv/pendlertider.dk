import { DateTime } from 'luxon'

export default class {
  public static fromRejseplanen(date: string, time: string): DateTime {
    return DateTime.fromFormat(`${date} ${time}`, 'dd.MM.yy HH:mm')
  }

  public static toRejseplanen(datetime: DateTime): string {
    return `${this.toRejseplanenDate(datetime)} ${this.toRejseplanenTime(
      datetime
    )}`
  }

  public static toRejseplanenDate(datetime: DateTime): string {
    return datetime.toFormat('dd.MM.yy')
  }

  public static toRejseplanenTime(datetime: DateTime): string {
    return datetime.toFormat('HH:mm')
  }
}
